## TODO: Mobile UI Overhaul

### 1️⃣ Global Premium Button Design System
- [x] Primary Action Buttons: layered metallic linear gradient (deep antique gold → soft champagne gold) with a 1px semi-transparent top-border highlight for a luxury beveled edge.
- [x] Secondary / Outline Buttons: glassmorphic architecture — transparent fill, 1px solid border at 20% gold opacity, soft backdrop blur.
- [x] Typography & Asymmetry: uppercase text with 1.5px letter-spacing; pin header text left/center and force the right-facing arrow (→) to the absolute right margin edge via flex.
- [x] Active Tactile Press: on `:active`, scale container to `scale(0.97)` and deflate ambient box-shadow simultaneously with hardware-accelerated transitions.

### 2️⃣ Global Bottom Navigation Bar Architecture
- [x] Switch backdrop to translucent glassmorphic blur (`backdrop-filter: blur(20px)` with 92% opaque deep charcoal tint).
- [x] Active tab: fade in a tiny soft gold illuminated dot or thin line alongside the active icon/label.
- [x] Keep unselected navigation items subtly muted at 50% opacity.

### 3️⃣ Mobile Touch Responsiveness & Gestural Optimization (Global)
- [x] Enforce minimum 44×44px tappable target area on every interactive component, pill, accordion header, tab indicator, and bottom-nav item (transparent CSS padding expansions where necessary).
- [x] Apply `touch-action: manipulation` globally to all actionable nodes, anchors, buttons, and selection tags.
- [x] Use `scroll-snap-type: x mandatory` + `will-change: transform` for horizontal swipe tracks, image loops, and testimonial carousels (GPU rendering, 120Hz).
- [x] Wrap active-state styling in `webkit-tap-highlight-color: transparent` to replace native highlight boxes with custom micro-scaling feedback.

### 4️⃣ Global Interactive Block & Focus State Architecture
- [x] Cumulative Perks Framework (e.g., First Time Here): remove radio buttons; use pre-selected checkmark icons; on row click keep checked state but apply a high-contrast Focus State (gold border accent or light glassmorphic background tint) for the active view.
- [x] Filter & Structural Switcher Framework (Science & Trust, Our Method, Unboxing, Exhibitions, Knowledge Center): active trigger pill/tab/chip uses commanding inverted style (solid gold fill + dark text, or solid dark + crisp gold text); unselected options distinctly muted.

### 5️⃣ Macro-Vibe, Theming & Section Transitions
- [x] Scroll-triggered CSS canvas fading on the main background wrapper (smoothly transition background color between thematic shifts, e.g., scientific charcoal → meditative deep brown).
- [x] Staggered entrance animation via Intersection Observer: fade + translate up 10–15px as containers enter viewport.
- [x] Typographic rhythm: first sentence of dense paragraphs 2–3px larger and a fraction bolder as an eye-hook; serif italic strictly for high-emotion narrative keywords (Devotion, Authentic, Protection) in headers.
- [x] Replace harsh black drop shadows with low-opacity ambient shadows matching section tone; for dark-on-dark elements add a 0.5–1px razor-thin inner border/stroke (muted gold or 10% opacity white) for etched glassmorphism boundary.

### 6️⃣ Performance, Tactile UI & Header Treatment
- [x] Smart JS listener for sticky header: on scroll-down shrink header height and scale brand logo by 30%, or hide on scroll-down and reveal on scroll-up; apply `backdrop-filter: blur(12px)` + 90% opacity background tint for frosted-glass layer.
- [x] Lazy-load heavy active assets (3D rotating module, unboxing canvas); render lightweight skeleton placeholders during load; strip raw engineering text/clunky UI wrappers; use compressed clean SVGs for all geometric art vectors.

### 7️⃣ High-Priority Section Refinements
#### Hero Section
- [x] Retain "BEGIN YOUR JOURNEY" as the single, primary CTA button in the updated Primary Gradient style.
- [x] Keep "NEW TO RUDRAKSHA? START HERE" button but styled with frosty glassmorphism (per user request).
- [x] Increase font weight and color contrast of the bottom trust-marker bar ("ACE Energized", "RRTL Lab Certified") to meet WCAG AA mobile accessibility against the dark background.
- [x] Add 24px bottom padding above the viewport edge to prevent the floating WhatsApp button from overlapping the trust-marker text.

#### Begin Your Journey With Confidence Section
- [x] Re-architect contact CTA buttons: central phone call trigger as Primary Metallic button block, "WRITE TO US" as Secondary Glassmorphic item, strip out the wide WhatsApp column banner block entirely.
- [x] Add 32px vertical separation between the core message and the contact container items.
- [x] Hide the floating WhatsApp FAB entirely via scroll listener when this communication block is active in the viewport.

#### Drag To Rotate In 3D Interactive Feature
- [x] Add 24px vertical padding above and below the horizontal bead-selection pills ("1 Mukhi", etc.) to prevent accidental mis-taps on adjacent elements.
- [x] Button balance beneath the info block: "Request Certified Images" in solid Primary Metallic token; "View Combinations" in secondary translucent glassmorphic token.
- [x] Programmatically scale the floating WhatsApp widget down to 0 or slide it off-screen while the user is actively engaging with the 3D rotation arena.

#### Footer Section
- [x] Elevate footer category link typography to solid cream or bright white to meet minimum mobile accessibility against the dark wash background.
- [x] Add 56px bottom safety padding below the copyright and certification notes to prevent text from being obscured by the floating widget.

#### Stay Connected Section
- [x] Compress the massive social community links into flat, compact horizontal list items or side-by-side icon grids to display all channels within a single mobile screen height.
- [x] Clean up the map module: remove raw-text technical strings like "WORLD_VIEW"; replace with a polished UI icon toggle (map/globe vector switch) or explicit map contours to ground the community tracker context.

### 8️⃣ Section-by-Section Micro-Layout Refinements
#### Your Path Section
- [ ] Reduce introductory body copy by 50%; break remaining text into 2 short sentences for quick mobile scanning.
- [ ] Decrease category card vertical height by 25%; shift text layout to two-column (icon left, title/description/link stacked right) to compress density.
- [ ] Convert "PRIVATE ACCESS" link into a Secondary Glassmorphic outline button to match the alternate category paths.
- [ ] Add 80px right-side safety margin/padding to the primary sticky button container so the floating WhatsApp widget never sits over the text or cuts the tap target.

#### Rudraksha Learning Path Section
- [ ] Consolidate "Level 1" content into a single unified card wrapper; place the decorative central icon at the top inside the same container as the text details, eliminating the broken dual-card layout.
- [ ] If the 1–5 circular step indicators are static, remove high-contrast circular borders and drop-shadows so they don't look like clickable tabs. If interactive, add clear active/inactive states and ensure clicking a number instantly loads the corresponding level content without page refresh.
- [ ] Upgrade "Recommended Beads" tags: switch pill background to a slightly lighter, solid tone with dark text for high contrast and readable boundaries on low-brightness mobile screens.

#### First Time Here? Section
- [ ] Retain the interactive infographic switching logic triggered by row selection; execute the cumulative rewards layout — switch radio buttons to clean checkmarks, auto-check them all, and introduce a high-contrast visual focus state for the active row choice.
- [ ] Redesign the coupon graphic inside the dark card for mobile: remove skeuomorphic border lines and micro-text like "PROMO CODE"; use a clean, flat container with large, high-contrast typography emphasizing "CODE: WELCOME10" and "10% OFF" so it is legible without zooming.
- [ ] Fix alignment inside the primary action button so the right-facing arrow icon tracks perfectly to the right perimeter via the unified button token system.

#### Real People Section
- [ ] Standardize the customer review carousel for scanability: enforce strict image aspect ratios and unified photography styles (matching close-up headshots with identical background contrast levels) across all testimonial cards.
- [ ] Move the secondary CTA action to the absolute bottom of the entire review layout, below the carousel track, rendered in the Secondary Glassmorphic button tokens.

#### From Seeker To Advocate Section
- [ ] Correct the media layout hierarchy: remove the standalone button container; overlay a clean, high-contrast gold play button icon directly in the center of the main portrait image card.
- [ ] Shift the frosted-glass tag ("Siddha Mala Wearer") to the bottom-left corner of the image card where the darker clothing profile provides sufficient color contrast for the text.

#### Our Community Section
- [ ] Ground the community tracking data with real geographic UI indicators: introduce a highly abstracted, low-contrast vector world map mesh behind the gold node lines to anchor the "Global Tracker" context.
- [ ] If the data tracking is not executing a live dynamic loop, replace the glowing green dot with a solid globe or location pin icon to avoid fake-system feedback.

#### Active Connection Hub Section
- [ ] Convert the wrapping city selection chips into a single-line, horizontally scrollable swipe track; increase padding around each chip to guarantee a minimum 44×44px touch-target arena.
- [ ] Restructure the final metrics block: significantly increase font-size and weight of the numerical highlights ("1,008+") and sharply reduce the size and contrast of the descriptive labels ("Google Reviews") to build a commanding typographic hierarchy.

#### Our Heritage Section
- [ ] Fix the font baseline for the "2.75L+" metric badge so text modifiers and numerical digits align seamlessly along the bottom horizontal axis.
- [ ] Break the monotonous layout by turning the numerical metric grid into a compact, horizontally swipable data ribbon to isolate statistics and inject visual variety before the Roman-numeral timeline list.

#### Our People Section
- [ ] Compress the layout hierarchy: redesign the large vertical category containers into a high-density, 2-column card grid to display multiple roles on a single viewport screen.
- [ ] Upgrade the section target action using the dark-filled variation of the Primary Button system, centering its layout cleanly against the light canvas background.

#### Our Home Section
- [ ] Replace the generic architectural and rainy window photos with authentic, color-graded imagery detailing the physical facility, lab environment, or sanctum to reinforce the "Our Home" narrative.
- [ ] Ensure any branding symbols or icons layered over photography are enclosed within an anchor shape (e.g., semi-transparent dark circle) or use high-contrast drop-shadow values to preserve legibility regardless of background.

#### 25 Years Of Serving Spiritual Seekers Section
- [ ] Introduce a thin, centered or left-aligned vertical timeline axis line with small gold node points for each milestone year (1999 to 2024) to create a clear visual anchor.
- [ ] Shift the layout from plain text rows into alternating left/right blocks or beautifully padded horizontal steps to maximize white space.
- [ ] Increase the bottom layout margin by 48px to prevent the persistent WhatsApp button from clipping into the text descriptions.

#### Science & Trust Section / Authenticity You Can Verify
- [ ] Ensure the 2×2 layer-filtering buttons use the unified, high-contrast inverted selection architecture to provide instant, clear visual confirmation when modifying the text readout block directly below.
- [ ] If the "NATURAL — DIGITAL X-RAY" slider is static, replace it with two clearly delineated, high-contrast toggle buttons that change the circular graphic's state instantly on click. If interactive, ensure a smooth, hardware-accelerated CSS mask cross-fade runs between the two image states.

#### Our Method Section / More Than Authentic
- [ ] Merge the "A-C-E" vertical switch buttons directly into the interactive matrix box; ensure the active option uses the high-contrast filled active token style and that clicking it instantly modifies the visual analyzer panel without layout shifts or list scrolling.
- [ ] Increase the scale of all code-style HUD labels inside the dark vector graphic to at least 12px with a bold weight to preserve mobile clarity.

#### The Sacred Ritual Section
- [ ] Introduce an "Asymmetric List Pattern": convert the four items into a 2×2 grid of clean, borderless cards with subtle alternate background tints to group ideas visually and prevent blind-scanning.
- [ ] Add a 40px layout margin between the section action button and the edge of the upcoming dark section footer to establish proper compositional hierarchy.

#### The Sri Yantra Section
- [ ] Switch the italic description text to a clean sans-serif typeface or increase the serif line weight significantly, ensuring a minimum 4.5:1 color contrast ratio against the dark background.
- [ ] Scale down the geometric vector illustration container by 20% to pull the core value copy higher up into the immediate viewport area.

#### Handcrafted Malas Section
- [ ] Simplify or thicken the vector lines of the gold icons inside the collection cards to ensure they remain clear and recognizable at small sizes.
- [ ] Elevate the color value of the secondary text descriptions inside the cards (e.g., "Premium collector") to a high-contrast beige or white, fulfilling a minimum 4.5:1 contrast requirement.

#### For The Serious Collector Section / Among The World's Most Extraordinary Rudraksha
- [ ] Standardize all product overview cards to a unified container style (ideally the light cream format) to achieve a clean visual rhythm.
- [ ] Re-architect the urgency tags (e.g., "EXTREMELY LIMITED"): use a solid, distinct background color (deep crimson or solid gold accent block) with bold, high-contrast text to form an unmistakable focal point.

#### Flagship Combination Section / The World's Most Powerful Mala
- [ ] Reconfigure the horizontal nine-planet matrix into a clean 3-column, 3-row grid layout to give text labels and symbols proper breathing room and legible font sizing on mobile screens.
- [ ] Simplify the bullet items by removing the duplicate star icons, leaving only the clean checkmarks to guide the user's focus down the list.

#### The Unboxing Experience Section
- [ ] Re-engineer the accessory navigation column: turn the vertically truncated link strip into a horizontally scrollable ribbon layout resting directly above the unboxing blueprint box; ensure the active component uses the inverted high-contrast active token system to frame the interactive readout panel changes.
- [ ] Align the text labels on the active trigger button to match the graphic state: display "Open Casket Lid" when closed, and dynamic close cues once triggered; match the visual look to the updated Secondary outline framework.

#### Experience In Person Section
- [ ] Restructure the live venue card layout to a clean, unified type hierarchy: single accent tone for highlights, clear margins between dates and address text to stop chaotic scan paths; ensure city selection pills apply the strict high-contrast active token guidelines when tapped to update the layout blocks below.
- [ ] Bolster the readability of the metric numbers ("20+", "5+") by applying a significantly bolder weight or transitioning them to a deep brown contrast color.

#### Sacred Services Section
- [ ] Transition the full-width vertical card stack into an elegant 2-column grid layout to shorten total page scroll length and create a dynamic visual break.
- [ ] Upgrade the service icons by placing them inside subtle, tinted circular backdrops and thickening their vector paths to ensure immediate scannability.

#### Knowledge Center Section
- [ ] Increase the color value of the card description subtext to a lighter tone (minimum 4.5:1 contrast ratio) to ensure legibility on dark mobile viewports under variable light.
- [ ] Redesign the category filter chips with an obvious active state (solid gold fill with dark text) and clear unselected states (muted borders) to establish definitive interactive feedback when updating the listing contents.

#### Bestselling Books Section
- [ ] Combine the book preview graphic and detail metadata into a unified column or side-by-side card structure; eliminate the secondary dark text card block to save vertical layout space.
- [ ] Reposition the navigation arrows (left/right) to sit directly on or immediately beneath the book cover asset carousel track so users intuitively understand the control mechanism.

#### Buyer Beware Section / Know The Difference. Protect Your Journey.
- [ ] Shorten the bullet descriptions within the warning cards by 40%, emphasizing bold anchor keywords at the beginning of each point to facilitate rapid vertical scanning.
- [ ] Eliminate the repetitive 2×2 text grid at the bottom; convert those core warning metrics into clear visual sub-headings or tag overlays inside the "COMMON MARKET FAKES" card block, freeing up space above the final diagnostic download CTA.

#### Our Commitment Section
- [ ] Re-architect the full-width stacked policy cards into a high-density vertical accordion system or a clean 2-column card grid to shorten the page length by 50%.
- [ ] Bolden the text inside the lower metadata tags and shift the pill background to a slightly darker or filled contrast color to guarantee readability on mobile screens.

#### Beyond Business Section
- [ ] Break up the monotonous layout by converting the service initiative cards ("Ancient Temples", "Farmer Welfare", etc.) into a horizontally swipeable carousel track featuring left/right edge previews.
- [ ] Inject a 40px safe-zone padding area at the bottom-right corner of the layout container to isolate text and metric badges from being clipped by the persistent floating WhatsApp widget.

#### Sacred Offering Section / Offered At The Feet Of Mahadev
- [ ] Re-architect the descriptive rows from side-by-side split columns into a clean, vertically stacked format where titles sit directly above their respective body text paragraphs.
- [ ] Elevate the visual weight of the item headings by increasing font sizing or using a solid gold color to separate them clearly from descriptions.

#### Vetted Experiences Section
- [ ] Convert the vertically stacked reviews into a smooth, horizontal scrollable card carousel to save screens of vertical real estate.
- [ ] Upgrade the initials profile layout by applying soft gradient fills to the badges or slightly enlarging typography to match the professional titles.

#### Our Community Section / Every Walk Of Life
- [ ] Arrange the audience filters into a structured horizontal swiping track or a clean, multi-row staggered layout with standard uniform dimensions to eliminate irregular wrapping clusters.
- [ ] Demote or integrate the link trigger as a subtle text option underneath the core block boundaries.