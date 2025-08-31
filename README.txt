NOVA — Integrated Build (One-Package Upload)
===========================================

Files included (12):
1. index.html
2. styles.css
3. main.js
4. traitdata.json   ← from your uploaded merge
5. assets/payhip-button.svg
6. audio/intro.mp3  ← place your actual file here (keep name exactly "intro.mp3")
7. (This) README.txt

Plus supportive local items for trait usage if needed:
8. traitdata.min.json (optional)
9. traits.js (optional)
10. traitdata.csv (optional)
11. trait_usage_snippet.html (optional)

How to deploy (drag–drop once):
1) In GitHub, open your repo (e.g., nova-clean-integrated). Click "Add file" → "Upload files".
2) Drag the *contents* of this folder into the root of the repo (index.html should be at the root).
3) Ensure the folder "audio" uploads. Then upload your real intro audio as audio/intro.mp3 (exact name, lowercase).
   - If you forget this, a tiny fallback tone still plays so the flow advances, but it’s best to use your real intro.
4) Commit the changes. Vercel will auto-redeploy. Force-refresh (Cmd/Ctrl+Shift+R) to bypass cache.

Behavior notes:
- Start button triggers audio (to satisfy browser gesture policies). After the clip ends (or 12s max), it transitions to traits.
- The traits grid reads from traitdata.json; update that file to change the list.
- Print view automatically switches to a light background.

PayHip link:
- The top right “Purpose Book” button links to: https://payhip.com/b/N7Lvg

— Built for a clean, smooth, one-shot deploy.
