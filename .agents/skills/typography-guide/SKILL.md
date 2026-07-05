---
name: typography-guide
description: Guide on modern web typography, curated open-source font collections, and fast-loading native CSS font stacks. Use this skill when designing interfaces, selecting web fonts, defining CSS font families, or reviewing a project's visual hierarchy and styling rules.
---

# Web Typography & Modern Fonts Guide

A comprehensive guide to selecting fonts, building responsive typographic scales, implementing modern native font stacks, and optimizing web font performance.

---

## 1. CSS Typographic Scale & Hierarchy

Use mathematical scales to establish clear visual hierarchy. The **Minor Third (1.200)** or **Major Second (1.125)** scales are recommended for mobile and desktop screens respectively.

### Standard Typography Scale (Desktop - 1.200 Ratio)
| Level | Font Size (rem) | Font Size (px) | Line Height | Recommended Weight / Use |
| :--- | :--- | :--- | :--- | :--- |
| **h1** | `2.488rem` | `~40px` | `1.1 - 1.2` | Bold (`700`) - Main page headers |
| **h2** | `2.074rem` | `~33px` | `1.2` | Semibold (`600`) - Section headings |
| **h3** | `1.728rem` | `~28px` | `1.2 - 1.3` | Medium (`500`) - Sub-sections |
| **h4** | `1.44rem` | `~23px` | `1.3` | Medium (`500`) - Minor headings |
| **h5** | `1.2rem` | `~19px` | `1.3` | Semibold (`600`) - Large body / Card title |
| **body** | `1.0rem` | `16px` | `1.5 - 1.6` | Regular (`400`) - Paragraphs / Main content |
| **small** | `0.833rem` | `~13px` | `1.4` | Regular (`400`) - Caption / Subtext |

### Best Practices for Readability
- **Line Length (Measure)**: Keep line length between **45 to 75 characters** (including spaces) per line for optimal readability (~`30rem` to `40rem` max-width).
- **Line Height (Leading)**:
  - Headers (`h1` to `h3`): `1.1` to `1.3` (tighter leading prevents wrapped lines from splitting visually).
  - Body Text: `1.5` to `1.65` (gives text breathing room).
  - Monospace/Code: `1.4` to `1.5`.

---

## 2. Modern System CSS Font Stacks

To build blazing-fast interfaces that load instantly without downloading font files, use native system font stacks:

```css
/* 1. System Neo-Grotesque (Clean, modern, neutral) */
font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";

/* 2. System Humanist (Friendly, readable, slightly organic) */
font-family: Seravek, "Gill Sans Nova", Ubuntu, Calibri, "DejaVu Sans", source-sans-pro, sans-serif;

/* 3. System Geometric (Round, structured, architectural) */
font-family: Avenir, "Avenir Next", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;

/* 4. System Serif (Editorial, classic, legible) */
font-family: Georgia, Cambria, "Times New Roman", Times, serif;

/* 5. System Monospace (Code, tabular data, terminal interfaces) */
font-family: ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, monospace;
```

---

## 3. Curated Modern Open-Source Fonts

When system fonts are not enough, utilize these highly polished open-source fonts:

### A. Neo-Grotesque & Geometric (Great for UI & Body)
1. **[Inter](https://github.com/rsms/inter)**: The gold standard for UI text. Exceptionally legible at small sizes, with a large variable font weight axis.
2. **[Mona Sans](https://github.com/github/mona-sans)**: GitHub's open-source variable typeface. Industrial, slightly geometric, excellent for bold headlines.
3. **[Geist Sans](https://github.com/vercel/geist-font)**: Vercel's bespoke font designed for developers. Modern, technical, and geometric.
4. **[Outfit](https://github.com/Outfitio/Outfit-Fonts)**: Sleek, highly geometric, clean, and elegant for headers and modern UIs.

### B. Serif & Editorial (Great for Narrative, Content, and Accents)
1. **[Lora](https://github.com/cyrealtype/Lora-Font)**: A contemporary serif with brushed curves, highly legible for long paragraphs.
2. **[Playfair Display](https://github.com/clausggr/Playfair)**: Elegant, high-contrast serif. Stunning for large headers, titles, and literary styles.
3. **[Fraunces](https://github.com/undercase/fraunces)**: An expressive, warm, variable serif font with visual optical sizes.

### C. Monospace (Great for Code & Technical Data)
1. **[JetBrains Mono](https://github.com/JetBrains/JetBrainsMono)**: Code font engineered for reading comfort. Tall x-height and clear ligatures.
2. **[Fira Code](https://github.com/tonsky/FiraCode)**: Classic developer font with rich programming ligatures.
3. **[Geist Mono](https://github.com/vercel/geist-font)**: The monospace companion to Geist Sans, highly structured.

---

## 4. Font Pairing Rules

Avoid using more than two font families on a single project.
- **Rule of Thumb**: Pair a distinct, high-personality font for Headings with a highly legible, neutral font for Body.

### Proven Pairs
- **Headline**: *Mona Sans* (Bold, geometric) + **Body**: *Inter* (Neutral, highly legible)
- **Headline**: *Playfair Display* (Editorial, elegant) + **Body**: *Lora* (Readable serif)
- **Headline**: *Outfit* (Minimal geometric) + **Body**: *System Neo-Grotesque* (Fast native)

---

## 5. Web Font Performance & Optimization

Implement these configurations in your projects for fast web page loads:

1. **`font-display: swap`**:
   Ensure text remains visible during font download.
   ```css
   @font-face {
     font-family: 'Inter';
     src: url('/fonts/Inter.woff2') format('woff2');
     font-display: swap;
   }
   ```
2. **Preloading**:
   Preload critical above-the-fold fonts in HTML `<head>`:
   ```html
   <link rel="preload" href="/fonts/inter-bold.woff2" as="font" type="font/woff2" crossorigin>
   ```
3. **Use WOFF2**:
   WOFF2 is the standard for modern web development, offering ~30% better compression than WOFF. Avoid legacy TTF or EOT formats.
