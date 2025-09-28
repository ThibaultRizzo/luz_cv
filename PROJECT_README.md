# Product Owner Portfolio – README

## Purpose
Build a **premium, bold, and fluid** personal website acting as a digital business card for a Product Owner / Manager with a background in luxury retail. The site should inspire trust, be attractive, and highlight career, achievements, and expertise.

---

## 1. Style & Design

- **Color palette:**  
  - Neutral base: off-white or deep black  
  - Premium accent: gold, navy blue, or emerald  
- **Typography:**  
  - Headlines: Bold serif (e.g., Playfair Display)  
  - Body text: Modern sans-serif (e.g., Inter, Helvetica)  
- **Animations:**  
  - Micro-interactions on hover (buttons, logos, projects)  
  - Scroll-trigger animations (subtle parallax, reveal sections)  
  - Smooth and elegant transitions  

- **Mood & tone:** bold, confident, premium, minimalist yet dynamic.

---

## 2. Site Structure

1. **Header / Hero**
   - Image or short looped video of Product Owner in action  
   - Impactful tagline: “I turn premium retail into unforgettable experiences.”  
   - CTA: “Let’s build something extraordinary.”

2. **About**
   - Short, leadership- and result-driven introduction  
   - Storytelling: career progression + business impact

3. **Experience**
   - Visual timeline or story-flow  
   - Premium brand logos  
   - Focus on metrics (revenue growth, customer engagement, projects delivered)

4. **Skills**
   - Cards or progress visuals  
   - Themes: Product Management, Retail Strategy, Digital Transformation, Leadership, Customer Experience

5. **Projects**
   - Interactive case cards (image + summary + results)  
   - Dynamic grid (asymmetrical or carousel)  
   - Scroll animations

6. **Contact**
   - Minimal form  
   - Links: LinkedIn / Email / Phone  
   - Optional: Download CV (PDF)

---

## 3. Tech Requirements

- Responsive design (desktop, tablet, mobile)  
- Smooth animations (CSS + Framer Motion, optional Lottie)  
- Fast performance and optimized assets  
- SEO-ready (title, meta, alt tags)  
- Optional: dark/light mode toggle  

---

## 4. Deliverables

- Complete codebase (Next.js + React + Tailwind CSS v4 + Framer Motion)  
- Optimized assets: images, logos, videos  
- Fully functional animations and interactions  
- Minimal documentation for integration & deployment  

---

## 5. File Structure

```
/app
  /layout.tsx
  /page.tsx
/components
  /Hero.tsx
  /Nav.tsx
  /About.tsx
  /Experience.tsx
  /Skills.tsx
  /Projects.tsx
  /ProjectCard.tsx
  /Contact.tsx
  /Footer.tsx
/public
  /images
  /animations
/styles
  /globals.css
  tailwind.config.js
```

---

## 6. API

**`/api/contact/route.ts`**  
- POST: validate fields and send email (e.g., SendGrid/SMTP).  
- Returns JSON `{ ok: true }` on success, `{ error: "..." }` on failure.

---

## 7. Tailwind Config Example

```js
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-gold': '#C7A17A',
        'brand-deep': '#0B132B',
        'brand-cream': '#FAF7F2'
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif']
      }
    }
  },
  plugins: []
};
```

---

## 8. Accessibility

- All images must include descriptive `alt` attributes  
- Semantic HTML (`<header>`, `<main>`, `<section>`, `<footer>`)  
- Full keyboard navigation support  
- High contrast ratio (≥ 4.5:1)  
- Skip link to main content  

---

## 9. SEO / Meta

- Title: `Firstname Lastname — Product Owner | Retail & Digital Transformation`  
- Meta description (≤ 155 chars)  
- Open Graph tags (title, description, image)  
- JSON-LD Person schema (jobTitle, sameAs LinkedIn)

---

## 10. Example Code Snippets

### Hero Section

```tsx
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center">
      <div className="container mx-auto px-6">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="font-serif text-5xl md:text-7xl leading-tight"
        >
          I turn premium retail into unforgettable experiences.
        </motion.h1>
        <p className="mt-6 max-w-xl">
          Product Owner with 10+ years of leadership in luxury retail — I design product & experience that scale revenue and loyalty.
        </p>
        <div className="mt-8 flex gap-4">
          <a href="#contact" className="btn-primary">Let’s build something extraordinary</a>
          <a href="/cv.pdf" download className="btn-outline">Download CV</a>
        </div>
      </div>
    </section>
  );
}
```

---

## 11. Deployment

- Preferred: **Vercel**  
- Build command: `npm run build`  
- Env vars: `SENDGRID_API_KEY`, `FROM_EMAIL`, `TO_EMAIL`  

---

## 12. QA Checklist

- [ ] Responsive: mobile, tablet, desktop, 4k  
- [ ] Lighthouse: Performance ≥ 85, Accessibility ≥ 90  
- [ ] Images optimized (`next/image`)  
- [ ] Contact form validation + success UI  
- [ ] CV download works  
- [ ] LinkedIn/contact links working  
- [ ] SEO meta + JSON-LD included  
