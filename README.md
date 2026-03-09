# Mike Seiler's Homepage

Single-page personal site inspired by Apple's aesthetic with dark mode, glassmorphism, and a playful typing animation—perfect for showcasing a profile without any build tools.

## Live Demo & Preview

- **Live:** https://apollo40.github.io/familie-seiler-org/
- Capture a screenshot or GIF of the hero section (e.g., `assets/preview.jpg`) and embed it here to show readers the UI at a glance.

## Requirements

- GitHub account with Pages enabled
- Modern desktop or mobile browser
- Python 3 (ships with macOS/Linux) or any static-file server for local preview
- No build chain: everything runs as plain HTML/CSS/JS

## Personalization Checklist

1. **Add your portrait**  
   Save a square photo as `assets/photo.jpg` (≥ 400 × 400 px). If you skip this step, the hero falls back to a circle with the initial **M**.

2. **Wire up the contact form (Formspree)**  
   1. Create a free account on [formspree.io](https://formspree.io).  
   2. Copy your form ID (example: `xpzgkqdo`).  
   3. Update `index.html` and replace `{FORM_ID}`:
      ```html
      action="https://formspree.io/f/{FORM_ID}"
      ```
      → becomes `action="https://formspree.io/f/xpzgkqdo"`. The free plan currently allows 50 submissions/month.

3. **Update the contact email**  
   Replace the placeholder in `index.html` so the mailto link hits your inbox:
   ```html
   <a href="mailto:kontakt@example.com" class="contact-email">
   ```

4. **Fill in social links**  
   Swap the `#` placeholders in `index.html` for your real profiles:
   ```html
   <!-- Instagram -->
   <a href="https://instagram.com/YOUR_NAME" ...>

   <!-- LinkedIn -->
   <a href="https://linkedin.com/in/YOUR_NAME" ...>
   ```

5. **Personalize the copy & typing phrases**  
   Update the "About" and "Interests" sections directly in `index.html`. The typing animation phrases live inside `js/main.js`:
   ```js
   const phrases = [
     'Software engineer',
     'Tech enthusiast',
     'Photographer',
     // ...
   ];
   ```

## Deploy to GitHub Pages

1. Open the repository on GitHub.
2. Navigate to **Settings → Pages**.
3. Select `main` as the branch and `/ (root)` as the folder.
4. Click **Save** and wait ~1–2 minutes for the deployment to finish.

## Project Structure

```
familie-seiler-org/
├── index.html          # Full single-page site
├── css/
│   └── style.css       # Theming, glassmorphism, responsive tweaks, dark mode
├── js/
│   └── main.js         # Animations, dark-mode toggle, form handling
├── assets/
│   ├── favicon.svg     # SVG favicon
│   └── photo.jpg       # ← drop your portrait here
├── .nojekyll           # Disable Jekyll on GitHub Pages
└── README.md
```

## Local Preview

```bash
# Start a lightweight server (Python is bundled on macOS/Linux)
python3 -m http.server 8080

# Visit the site in your browser
# http://localhost:8080
```

## Contributing

Issues and pull requests are welcome. Please keep changes focused on accessibility, performance, or content improvements and include screenshots when UI tweaks are involved.

## FAQ

- **Why did the form stop working?**  
  Formspree's free tier is capped at 50 submissions per month. Once the quota resets, the endpoint works again; otherwise upgrade your Formspree plan.

- **Can I change the preview server port?**  
  Yes. Run `python3 -m http.server 3000` (or any port you prefer) and open `http://localhost:3000` instead.
