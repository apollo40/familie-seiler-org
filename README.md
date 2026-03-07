# Mike Seilers Homepage

Persönliche GitHub Pages Seite – Apple-Style, Dark Mode, Glassmorphism.

**Live:** https://apollo40.github.io/familie-seiler-org/

---

## Einrichtung

### 1. Foto hinzufügen

Lege dein Profilbild als `assets/photo.jpg` ab (empfohlen: min. 400 × 400 px, quadratisch).
Ohne Foto erscheint automatisch ein Kreis mit dem Initial **M** als Fallback.

### 2. Kontaktformular (Formspree)

1. Registriere dich kostenlos auf [formspree.io](https://formspree.io)
2. Erstelle ein neues Formular und kopiere deine **Form-ID** (z. B. `xpzgkqdo`)
3. Öffne `index.html` und ersetze `{FORM_ID}` in der Zeile:
   ```html
   action="https://formspree.io/f/{FORM_ID}"
   ```
   → z. B. `action="https://formspree.io/f/xpzgkqdo"`

Kostenloser Plan: 50 Nachrichten/Monat.

### 3. Kontakt-E-Mail anpassen

In `index.html` die Zeile mit `kontakt@example.com` durch deine echte E-Mail ersetzen:
```html
<a href="mailto:kontakt@example.com" class="contact-email">
```

### 4. Social-Media-Links eintragen

In `index.html` die `#`-Platzhalter in den Social-Links ersetzen:
```html
<!-- Instagram -->
<a href="https://instagram.com/DEIN_NAME" ...>

<!-- LinkedIn -->
<a href="https://linkedin.com/in/DEIN_NAME" ...>
```

### 5. Texte personalisieren

Die Abschnitte „Über mich" und „Interessen" in `index.html` enthalten Platzhaltertexte –
einfach durch deine eigenen Inhalte ersetzen.

Die Typing-Phrasen im Hero findest du in `js/main.js`:
```js
const phrases = [
  'Softwareentwickler',
  'Technik-Enthusiast',
  'Fotograf',
  // ...
];
```

---

## GitHub Pages aktivieren

1. Repository auf GitHub öffnen
2. **Settings** → **Pages**
3. Unter *Branch* → `main` wählen, Ordner `/` (root)
4. **Save** klicken
5. Nach ca. 1–2 Minuten ist die Seite live

---

## Dateistruktur

```
familie-seiler-org/
├── index.html          # Komplette Single-Page Site
├── css/
│   └── style.css       # Theming, Glassmorphism, Responsive, Dark Mode
├── js/
│   └── main.js         # Animationen, Dark Mode, Formular, etc.
├── assets/
│   ├── favicon.svg     # SVG Favicon
│   └── photo.jpg       # ← hier dein Foto ablegen
├── .nojekyll           # GitHub Pages ohne Jekyll
└── README.md
```

---

## Lokale Vorschau

```bash
# Python (in der Regel vorinstalliert)
python3 -m http.server 8080

# Dann im Browser öffnen:
# http://localhost:8080
```
