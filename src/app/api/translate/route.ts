import { NextRequest, NextResponse } from 'next/server';

// Language codes mapping
const SUPPORTED_LANGUAGES = {
  en: { code: 'en', name: 'English', flag: '🇬🇧' },
  fr: { code: 'fr', name: 'Français', flag: '🇫🇷' },
  es: { code: 'es', name: 'Español', flag: '🇪🇸' },
  de: { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  it: { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  pt: { code: 'pt', name: 'Português', flag: '🇵🇹' },
  nl: { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  ja: { code: 'ja', name: '日本語', flag: '🇯🇵' },
  zh: { code: 'zh', name: '中文', flag: '🇨🇳' },
  ko: { code: 'ko', name: '한국어', flag: '🇰🇷' },
  ar: { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  ru: { code: 'ru', name: 'Русский', flag: '🇷🇺' },
} as const;


// Batch translate multiple texts at once using MyMemory API
async function translateBatch(texts: string[], sourceLang: string, targetLang: string, retries = 3): Promise<string[]> {
  if (texts.length === 0) return [];

  const translations: string[] = [];

  for (let i = 0; i < texts.length; i++) {
    const text = texts[i];
    
    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        // Add delay between requests to avoid rate limiting (MyMemory allows 1 req/sec)
        if (i > 0 || attempt > 0) {
          const delayMs = attempt > 0 ? 2000 * attempt : 1000; // 1s between texts, 2s/4s/6s on retries
          await new Promise(resolve => setTimeout(resolve, delayMs));
        }

        // MyMemory API - Free tier: 1000 words/day per IP
        // https://mymemory.translated.net/doc/spec.php
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`;
        
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });

        if (response.status === 429 || response.status === 403) {
          // Rate limited
          if (attempt < retries - 1) {
            console.log(`Rate limited (${response.status}), will retry with backoff...`);
            continue;
          }
          console.warn(`Rate limit exceeded for text ${i + 1}/${texts.length}, using original`);
          translations.push(text);
          break;
        }

        if (!response.ok) {
          throw new Error(`Translation failed: ${response.statusText}`);
        }

        const data = await response.json();
        
        // Check response quality and use translation if available
        if (data.responseData?.translatedText) {
          translations.push(data.responseData.translatedText);
          console.log(`Translated ${i + 1}/${texts.length}`);
          break;
        } else {
          console.warn(`No translation for text ${i + 1}/${texts.length}, using original`);
          translations.push(text);
          break;
        }
      } catch (error) {
        if (attempt === retries - 1) {
          console.error(`Translation error for text ${i + 1}:`, error);
          translations.push(text); // Use original text if all retries fail
          break;
        }
      }
    }
  }
  
  return translations;
}

// Fields that should never be translated
const SKIP_FIELDS = [
  'id',
  'createdAt',
  'updatedAt',
  'version',
  'isActive',
  'lastModifiedBy',
  'headerFont',
  'heroImage',
  'contactCvPath',
  'contactEmail',
  'contactLinkedin',
  'contactPhone',
  'heroStats',
  'aboutImpactMetrics',
  'experienceBottomStats',
  'themeFont',
  'themeColors',
  'enabledLanguages',
  'defaultLanguage',
  'translations',
  'image',
  'link',
  'icon',
  'iconType',
  'width',
];

// Collect all strings to translate from an object
function collectStrings(
  obj: unknown,
  fieldName: string = '',
  strings: Array<{ path: string; text: string }> = []
): Array<{ path: string; text: string }> {
  // Skip fields that shouldn't be translated
  if (SKIP_FIELDS.includes(fieldName)) {
    return strings;
  }

  if (typeof obj === 'string') {
    // Don't translate empty strings, URLs, paths, emails, or very short strings
    if (!obj || 
        obj.length < 2 ||
        obj.startsWith('http://') || 
        obj.startsWith('https://') || 
        obj.startsWith('/') ||
        obj.includes('@') ||
        /^\d{4}-\d{2}-\d{2}/.test(obj) || // Date strings
        /^[0-9]+$/.test(obj) // Pure numbers as strings
    ) {
      return strings;
    }
    
    strings.push({ path: fieldName, text: obj });
    return strings;
  }

  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      collectStrings(obj[i] as unknown, `${fieldName}[${i}]`, strings);
    }
    return strings;
  }

  if (typeof obj === 'object' && obj !== null) {
    for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
      collectStrings(value, key, strings);
    }
    return strings;
  }

  return strings;
}

// Apply translated strings back to the object
function applyTranslations(
  obj: unknown,
  translations: Map<string, string>,
  fieldName: string = ''
): unknown {
  // Skip fields that shouldn't be translated
  if (SKIP_FIELDS.includes(fieldName)) {
    return obj;
  }

  if (typeof obj === 'string') {
    // Check if we have a translation for this string
    if (translations.has(obj)) {
      return translations.get(obj);
    }
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item, i) => applyTranslations(item, translations, `${fieldName}[${i}]`));
  }

  if (typeof obj === 'object' && obj !== null) {
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
      result[key] = applyTranslations(value, translations, key);
    }
    return result;
  }

  return obj;
}

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { content, sourceLang, targetLang } = body;

    if (!content || !sourceLang || !targetLang) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: content, sourceLang, targetLang' },
        { status: 400 }
      );
    }

    if (sourceLang === targetLang) {
      return NextResponse.json({ success: true, translatedContent: content });
    }

    console.log(`Starting translation from ${sourceLang} to ${targetLang}...`);

    // Step 1: Collect all strings to translate
    const stringsToTranslate = collectStrings(content);
    console.log(`Found ${stringsToTranslate.length} strings to translate`);

    if (stringsToTranslate.length === 0) {
      return NextResponse.json({ success: true, translatedContent: content });
    }

    // Step 2: Translate strings one by one (MyMemory API doesn't support batch)
    const batchSize = 20; // Process in smaller batches for progress feedback
    const translationMap = new Map<string, string>();
    
    for (let i = 0; i < stringsToTranslate.length; i += batchSize) {
      const batch = stringsToTranslate.slice(i, i + batchSize);
      const texts = batch.map(item => item.text);
      
      console.log(`Translating batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(stringsToTranslate.length / batchSize)} (${texts.length} strings)...`);
      
      const translatedTexts = await translateBatch(texts, sourceLang, targetLang);
      
      // Map original texts to translations
      batch.forEach((item, index) => {
        translationMap.set(item.text, translatedTexts[index]);
      });
    }

    // Step 3: Apply translations to the original content structure
    const translatedContent = applyTranslations(content, translationMap);

    console.log(`Translation completed for ${sourceLang} to ${targetLang} (${stringsToTranslate.length} strings)`);

    return NextResponse.json({
      success: true,
      translatedContent,
    });
  } catch (error) {
    console.error('Translation API error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Translation failed' },
      { status: 500 }
    );
  }
}

// GET endpoint to fetch supported languages
export async function GET() {
  return NextResponse.json({
    success: true,
    languages: SUPPORTED_LANGUAGES,
  });
}

