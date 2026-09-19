# gensupply.org

The website for **Generation Supply**, a student-led nonprofit in Fairfax County,
Virginia that collects donated school supplies and hand-delivers them to the
classrooms that need them most.

Live at [gensupply.org](https://gensupply.org).

## Build

There isn't one. This is hand-written HTML, CSS and vanilla JavaScript served
straight from GitHub Pages — no framework, no bundler, no dependencies, nothing
to install and nothing to break on deploy. For a brochure site that a volunteer
may need to edit in two years, that is a feature.

```
index.html     every section, in one document
styles.css     the full design system
script.js      scroll-triggered impact counters and a dismissible banner
assets/        logo and photography
CNAME          custom domain for GitHub Pages
robots.txt     crawl rules
sitemap.xml    submitted to Search Console
```

## Notes

- **Built for search.** A small nonprofit lives or dies on being findable
  locally, so the page carries a canonical URL, Open Graph and Twitter cards,
  descriptive alt text, and geographic keywords aimed at Fairfax County rather
  than generic charity terms.
- **Single document, semantic sections.** Mission, how it works, impact,
  stories, programs, network, team, gallery and ways to get involved are each a
  real `<section>` with an id, so navigation is anchor-based and works without
  JavaScript.
- **JavaScript is enhancement only.** The impact counters animate when scrolled
  into view and the banner can be dismissed. With scripting disabled the page
  still reads completely.

## Editing

Change a file, commit to `main`, and GitHub Pages redeploys. Copy lives in
`index.html`; the counters read their target values from `data-` attributes on
the elements themselves, so updating a number does not mean touching the script.
