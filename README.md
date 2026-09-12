# Rommar Ombao — CV

A single-page CV site built with Bootstrap 5, themed in apple green.
Amazon PPC Manager · Frontend Developer · Executive Virtual Assistant.

**Live site:** https://romm94.github.io/UpdatedCV/

---

## What's in it

- **Tree of experience** — a hand-built SVG tree where each branch is one company, oldest at the base. The branches draw themselves from the ground up on load and the leaves unfurl behind them. Hover or tab onto a branch and its leaves deepen while the caption names the company and dates.
- **Scroll-linked timeline** — the stem running down the Experience section fills with green as you scroll past it, and each role's leaf node lights up as it enters view.
- **Keyboard and screen reader support** — every branch is focusable and carries an `aria-label`, so the tree is navigable without a mouse.
- **Reduced motion** — everything renders instantly and fully for visitors who have `prefers-reduced-motion` set. No animation is required to read the page.
- **Dark mode** — a toggle in the top bar, defaulting to the visitor's system preference and remembering their choice in `localStorage`. An inline script in `<head>` applies the theme before first paint so the page never flashes white.
- **Print stylesheet** — `Ctrl`/`Cmd` + `P` drops the navigation and the tree and prints a clean paper CV.
- **Responsive** — a single column on phones, two columns from the `lg` breakpoint up.

## Structure

```
UpdatedCV/
├── index.html        # all page content and the inline SVG tree
├── css/
│   └── styles.css    # design tokens and the apple green theme over Bootstrap
├── js/
│   └── script.js     # tree interaction, scroll reveals, timeline fill
├── README.md
├── LICENSE.md
└── .gitignore
```

No build step, no dependencies to install. Bootstrap 5.3 and Google Fonts load from CDNs.

## Running it locally

Open `index.html` in a browser and it works. If you would rather serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Publishing on GitHub Pages

1. Push these files to the `main` branch of this repository.
2. Go to **Settings → Pages**.
3. Under **Source**, choose **Deploy from a branch**, pick `main` and the `/ (root)` folder, then **Save**.
4. The site goes live at `https://romm94.github.io/UpdatedCV/` within a minute or two.

## Making it your own

**Colours.** Every colour is a custom property at the top of `css/styles.css`. The light theme lives in `:root` and the dark theme in `[data-theme="dark"]` just below it — every rule in the file reads from these tokens, so adding or changing a theme means editing only those two blocks:

```css
:root{
  --apple:#8DB600;         /* primary apple green */
  --apple-bright:#A9D93B;  /* leaves, highlights */
  --apple-deep:#5C7A0B;    /* labels, hover states */
  --ink:#16210F;           /* body text, footer background */
  --ink-soft:#4A5742;      /* secondary text, branches */
  --paper:#FAFBF4;         /* page background */
  --panel:#EDF2DE;         /* alternating section background */
  --line:#DCE4C6;          /* rules, borders, dormant leaves */
  --btn-bg:#566F0A;        /* filled button — dark enough for white text */
  --footer-bg:#16210F;     /* footer stays dark in both themes */
}
```

Change those values and the whole page follows.

**A note on the greens.** `--apple` (`#8DB600`) is bright, which makes it good for leaves and rules but unusable behind white text — the contrast is about 2.4:1, well under the 4.5:1 minimum. That's why buttons and small labels use the darker `--apple-deep` instead. If you brighten these, check the result against a contrast checker before shipping it.

**Adding a role.** Copy an `<article class="job reveal">` block in `index.html` and edit the dates, title and bullets. To give it a branch on the tree, duplicate a `<g class="branch">` group, adjust the `d` attribute of its `.limb` path and the `transform` on each leaf, then update `data-year` and `data-who` — the script reads those attributes to build the caption, so no JavaScript changes are needed.

**A note on the leaves.** Each leaf sits inside a wrapper `<g>` that holds its `translate`/`rotate`/`scale`. The CSS animates `transform` on the `<use>` element itself. Keep that separation: a CSS `transform` on the same element would override the SVG attribute and collapse the leaves into the corner.

## Built with

[Bootstrap 5.3](https://getbootstrap.com/) · [Bricolage Grotesque](https://fonts.google.com/specimen/Bricolage+Grotesque), [Karla](https://fonts.google.com/specimen/Karla) and [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono) via Google Fonts.

## Contact

- **Email:** rommarombao@gmail.com
- **Location:** Pasig City, Metro Manila, Philippines
- **GitHub:** [@Romm94](https://github.com/Romm94)

## License

[MIT](LICENSE.md) — the code is free to reuse. The CV content, name and personal details are mine; please swap them for your own.
