# sho_gd — GitHub Pages website

A small static website for GitHub Pages, built with plain HTML, CSS, and JavaScript. No frameworks, build step, external fonts, analytics, or tracking.

## Pages
- `index.html` — landing page / profile
- `portfolio.html` — projects
- `privacy.html` — Samurai Dash privacy policy
- `styles.css` — shared responsive styling
- `script.js` — mobile navigation and automatic copyright year

## Before publishing
1. Replace `assets/profile-placeholder.svg` in the homepage markup with your own portrait (for example `assets/profile.jpg`). Update the `alt` text to describe the image.
2. Replace `hello@example.com` with your public contact email in `index.html` and `privacy.html`.
3. Replace the `href="#"` social and store links with your real URLs, or remove any that you don't use. Placeholder `#` links are not intended to be published.
4. Confirm the privacy policy matches the final version of the game and any platform services or SDKs you use.
5. Update the policy effective date if you publish it on a different date.

## Publish with GitHub Pages
1. Create a GitHub repository, for example `sho-gd.github.io` for a user site, or any repository name for a project site.
2. Upload the contents of this folder to the repository root (so `index.html` is at the root).
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**, choose your publishing branch (usually `main`) and folder `/ (root)`, then save.
5. Wait for GitHub Pages to publish and open the URL shown in the Pages settings.

All page links are relative, so the site also works when published as a project site under a repository subpath.
