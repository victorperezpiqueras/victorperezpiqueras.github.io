---
name: add-project
description: Add a new entry to the "projects" section of src/assets/data.json from a repository URL (or any project link). Reads the repo, writes the title/description/tags, wires up the tech badges (downloading any missing icon), and places the demo still + GIF. Use when the user says "add this repo to my portfolio", "add a project", or pastes a GitHub URL with the intent of publishing it on the site.
---

# Add a project from a repo URL

Turn a repository URL into one entry in the `projects` array of
`src/assets/data.json`, plus whatever supporting assets that entry needs.

Run every step. Don't stop after writing the JSON — an entry whose icons or
demo image are missing renders as a broken card.

## 0. Inputs

Required: the project URL. If the user didn't give one, ask for it.

The URL is normally a GitHub repo. It can also be a live site (e.g.
`https://clashtactics.net`) — in that case set `isNotRepo: true` so the card
shows the external-link icon instead of the GitHub icon.

Immediately after you have the URL, tell the user what media to drop in the
repo root (step 4) so they can do it while you research. Ask once, then carry
on with the rest of the work; don't block on it.

## 1. Research the repo

Prefer, in order:

```bash
gh repo view <owner>/<repo> --json name,description,homepageUrl,languages,topics,readme
```

If `gh` fails (private, not GitHub, not authenticated), fetch the README with
WebFetch, or ask the user to describe the project. Never invent facts about a
repo you couldn't read.

Pull out: what it does, who it's for, the notable stack, and any live demo URL.

## 2. Write the entry

The shape is `src/models/ProjectData.ts`:

```jsonc
{
  "title": "Clash Tactics",
  "description": "…",
  "link": "https://github.com/victorperezpiqueras/foo", // "" if nothing public
  "isNotRepo": true,                                     // only when link isn't a repo
  "demoFile": "clash_tactics",                           // basename in assets/projectsDemos
  "tags": ["python", "aws", "flutter"]
}
```

Rules that keep it consistent with the existing ten entries:

- **title** — human-facing product name, not the repo slug (`bombergame` →
  `El Bombas`). Ask the user if the repo name is the only thing you have and it
  reads like a slug.
- **description** — 20–50 words, one paragraph, present tense, third person, no
  first person and no marketing voice. Say what it does and what it's for; a
  second sentence for the interesting technical or context detail. Match the
  register of the neighbouring entries — read two of them before writing.
- **link** — the URL given. Empty string for projects with nothing public
  (`X-Wing VR`, `ProjectION` both use `""`), and then omit `isNotRepo`.
- **demoFile** — `snake_case` of the title (`Clash Tactics` → `clash_tactics`,
  `Unfollower Finder` → `unfollower_finder`). This is a basename, no extension.
- **tags** — see step 3.

**Append the new object to the END of the `projects` array.**
`src/pages/Projects/Projects.tsx` reverses the list, so last in the file is
first on the page — a new project belongs last.

`src/assets` is listed in `.prettierignore`, so `npm run format` will not fix
this file. Edit it by hand with 2-space indentation matching its neighbours.

## 3. Tech badges

A tag only renders with an icon and a proper label when **both** of these exist:

1. `src/assets/techIcons/<tag>.png`
2. a `<tag>` key in `TECH_LABELS` in `src/shared/ui/TechBadge.tsx`

A tag missing from `TECH_LABELS` still renders — as the raw lowercase string
with no icon. That's the bug to avoid.

Pick 2–6 tags: the languages, frameworks, and infrastructure that actually
characterise the project. Reuse existing keys wherever one fits (`ls
src/assets/techIcons`) — don't add `react-native` when `flutter`-style
granularity is what the set uses. Keys are lowercase, no spaces, no dots
(`nodejs`, `tailwind`, `raspberrypi3`).

### Adding a missing icon

Icons come from <https://techicons.dev/> (noted in `TechBadge.tsx`). Get the
PNG for the technology — techicons.dev, the project's own press/brand page, or
Wikimedia are all fine; use the official mark, on a transparent background,
square.

**Size matters.** The badge renders at 16×16 CSS px and these files ship
unoptimised in the bundle. The existing set is almost all **48×48 PNGs at
0.5–4 KB**; a few 512×512 strays (flutter, svelte, tailwind) are the exception,
not the target.

- Target 48×48, transparent PNG, **under ~5 KB**.
- Never commit something multi-hundred-KB or a JPEG with a white box behind it.
- Verify what you downloaded before wiring it up:

```bash
python3 - <<'PY'
import struct, os
f = "src/assets/techIcons/<tag>.png"
d = open(f, "rb").read(33)
print(f, struct.unpack(">II", d[16:24]), os.path.getsize(f), "bytes")
PY
```

If it isn't 48×48, resize it (ImageMagick `magick in.png -resize 48x48 out.png`,
or Python/Pillow) before committing. If you cannot find a clean official icon,
say so and ask the user for one rather than shipping a bad asset.

Then add the label to `TECH_LABELS`, keeping the map **alphabetical by key**,
with the label written the way the vendor writes it (`Node.js`, `AWS`,
`Tailwind CSS`).

## 4. Demo media

The card needs, in `src/assets/projectsDemos/`:

- `<demoFile>.png` — the still, always shown.
- `<demoFile>.gif` — the animated capture, played on hover / on the Preview
  button. **Optional**: `ProjectItem.tsx` falls back to the still on error
  (`journal_paper_autochecker` has no GIF).

Ask the user to **paste both files into the repository root** — that's the
handoff point; you move them yourself:

> Drop the screenshot and the demo GIF in the repo root
> (`/home/vikti/repos/victorperezpiqueras.github.io`). Any filename is fine —
> I'll rename them to `<demoFile>.png` / `<demoFile>.gif` and move them into
> `src/assets/projectsDemos/`. The GIF is optional.

Then:

```bash
ls -la *.png *.gif 2>/dev/null            # find what they dropped
mv <dropped>.png src/assets/projectsDemos/<demoFile>.png
mv <dropped>.gif src/assets/projectsDemos/<demoFile>.gif
```

Check the sizes. The stills run 15 KB–225 KB; GIFs run 100 KB–18 MB and are
already the heaviest thing on the site. If a GIF lands over ~8 MB, say so and
offer to shrink it (fewer frames, smaller dimensions) — don't silently commit
another 18 MB file.

If the user hasn't pasted the media by the time everything else is done: finish
the JSON, the icons and the label, then tell them exactly which two filenames
are still missing and where they go. Never fabricate a placeholder image.

## 5. Verify

```bash
python3 -c "import json; json.load(open('src/assets/data.json'))" && echo "json ok"
npm run typecheck
npm run lint
ls src/assets/projectsDemos/<demoFile>.*
ls src/assets/techIcons/<each new tag>.png
```

Then report: the entry you wrote, any icon you added (with its dimensions and
byte size), and anything still outstanding — usually the demo media.
