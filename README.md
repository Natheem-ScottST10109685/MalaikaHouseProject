# MalaikaHouseProject

# All-Code-main — Static Website (Course Project)

This repository contains a static multi-page website (HTML/CSS) created as part of a 3rd-year Work Integrated Learning project. The pages are standalone HTML files and a dashboard folder with admin/parent/external sub-pages.

## What this is

- A collection of static HTML pages representing the site UI (no backend required).
- Intended for local viewing or simple static hosting.
- Files were provided as a code dump from course materials.

## Key files & structure

Top-level pages:
- `Book a Visit.html`
- `Contact us.html`
- `Home Page.html`
- `Our Story.html`
- `Parent Information.html`
- `Staff Supporters.html`
- `What We Offer.html`

Dashboard (folder `DASHBOARD FIxed/`) — contains multiple subfolders and admin/parent/external pages for the dashboard UI.

The repository is purely client-side: HTML, CSS (and maybe inline JS). There is no server code or build pipeline included.

## How to open locally

Option A — Open directly in a browser
- From your file manager, double-click any `.html` file (for example `Home Page.html`) to open it in your default browser.

Option B — Serve on a local static server (recommended for correct relative paths and AJAX/static fetches)
- Using Python 3 (in PowerShell):

```powershell
cd "<path-to-repo>"
python -m http.server 8000
```

Then open http://localhost:8000 in your browser.

- Using VS Code Live Server extension: open the folder in VS Code and click "Go Live".

## Recommended tools

- Visual Studio Code (editor)
- Live Server (VS Code extension) for quick local testing
- Modern browser (Chrome, Edge, Firefox)
- Python 3 (optional, for the simple http server)

## Notes for contributors

- This is a static site—edit HTML/CSS files directly.
- Keep backups of original files before bulk edits.
- If you add JavaScript modules or a build step, include a `package.json` and update this README with build/run instructions.

## License

This repository does not contain a formal license. If you want to add one, consider the MIT license or another permissive license.

---

Generated: README added to help describe and run the local site.
