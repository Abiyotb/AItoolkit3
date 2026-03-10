# EAII AI Ethics Toolkit (Web packaging)

This folder is a static, offline-friendly web version of the **EAII AI Ethics Toolkit – Module: Minimum Viable Ethics Gate (v1.1)**.

## What’s inside

- `index.html` – landing page
- `pages/module-mveg.html` – readable module content (tables + gate details)
- `pages/trigger-checklist.html` – interactive Gate 0 Trigger Checklist (auto lane assignment)
- `pages/decision-record.html` – interactive Decision Record (Gate 0–3)
- `pages/evidence-checklist.html` – interactive Stage‑Gate Evidence Checklist (Gate 0–3)
- `downloads/` – starter CSV templates (approvals log, risk register, operational logs, vendor due diligence)

## How to run locally

- Option 1 (simple): open `index.html` in your browser.
- Option 2 (recommended): serve the folder with a static web server.

Example (Python):

```bash
cd eaii-ai-ethics-toolkit-web
python -m http.server 8000
```

Then open `http://localhost:8000`.

## How to publish online

Because this is a static site, you can host it on:

- an internal web server (IIS / Nginx / Apache)
- SharePoint static hosting (if enabled)
- GitHub Pages (public or enterprise)
- a cloud static host (S3 + CloudFront, Azure Static Web Apps, etc.)

## Data handling

- The interactive forms store drafts in the user’s browser using `localStorage`.
- The site does **not** send data to any server.

If you later add a backend (e.g., to store decisions centrally), ensure you apply your organization’s privacy, security, retention, and access control requirements.

## Updating the content

The module data is stored in:

- `assets/js/mveg-data.js`

If you create new modules, follow the same pattern:

1. Create a new `assets/js/<module>-data.js` data file.
2. Add module pages under `pages/`.
3. Add navigation links.

