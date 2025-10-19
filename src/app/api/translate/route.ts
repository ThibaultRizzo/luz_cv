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


// Batch translate multiple texts at once
async function translateBatch(texts: string[], sourceLang: string, targetLang: string, retries = 5): Promise<string[]> {
  if (texts.length === 0) return [];

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      // Add increasing delay between attempts to avoid rate limiting
      if (attempt > 0) {
        const delayMs = 3000 * attempt; // 3s, 6s, 9s, 12s
        console.log(`Rate limited, waiting ${delayMs/1000}s before retry ${attempt + 1}/${retries}...`);
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }

      // Join texts with a unique separator that's unlikely to appear in content
      const separator = ' ||| ';
      const combinedText = texts.join(separator);

      const response = await fetch('https://libretranslate.com/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: combinedText,
          source: sourceLang,
          target: targetLang,
          format: 'text',
        }),
      });

      if (response.status === 429) {
        // Rate limited, retry after delay
        if (attempt < retries - 1) {
          console.log(`Rate limited (429), will retry with backoff...`);
          continue;
        }
        console.warn('Rate limit exceeded after all retries, returning original texts');
        return texts; // Return original texts instead of throwing
      }

      if (!response.ok) {
        throw new Error(`Translation failed: ${response.statusText}`);
      }

      const data = await response.json();
      const translatedText = data.translatedText || combinedText;
      
      // Split the translated text back into individual strings
      const translatedTexts = translatedText.split(separator);
      
      // Ensure we have the same number of translations as inputs
      if (translatedTexts.length !== texts.length) {
        console.warn('Translation count mismatch, falling back to original texts');
        return texts;
      }
      
      return translatedTexts;
    } catch (error) {
      if (attempt === retries - 1) {
        console.error('Translation error after retries:', error);
        // Return original texts if all retries fail
        return texts;
      }
    }
  }
  return texts;
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

    // Step 2: Batch translate in groups of 100 to minimize API calls
    const batchSize = 100;
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
      
      // Longer delay between batches to respect rate limits
      if (i + batchSize < stringsToTranslate.length) {
        console.log('Waiting 3 seconds before next batch to respect rate limits...');
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
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

