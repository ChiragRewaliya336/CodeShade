# 🎨 CodeShade — LeetCode Theme Customizer

Customize your LeetCode coding experience with beautiful themes.

CodeShade is a lightweight Chrome extension that lets you personalize the appearance of LeetCode problem pages with 10 carefully selected themes. Whether you prefer a dark coding environment, a clean light interface, or high contrast, CodeShade lets you choose a look that suits your workflow.

<p align="center">
  <strong>10 Themes · Lightweight · Manifest V3 · Privacy-Focused</strong>
</p>

---

## ✨ Features

- 🎨 **10 Beautiful Themes** — Choose from a curated collection of themes.
- 🌙 **Dark & Light Modes** — Switch between dark and light appearances.
- ⚡ **Instant Theme Switching** — Change your theme through the extension interface.
- 💾 **Persistent Preferences** — Your settings are saved locally.
- 🧩 **LeetCode-Focused Styling** — Customize individual problem pages without intentionally restyling unrelated pages.
- 💻 **Editor-Friendly Styling** — Designed to preserve LeetCode's native Monaco editor syntax highlighting.
- ⚙️ **Dedicated Settings Page** — Manage appearance preferences in one place.
- 🔒 **Privacy-Focused** — Designed to work locally without requiring an account.

## 🎭 Available Themes

CodeShade includes the following 10 themes:

| Theme | Style |
|---|---|
| Midnight | Deep, dark coding environment |
| Dracula | Dark purple-inspired interface |
| Nord | Cool, muted colors |
| Monokai | Colorful, developer-oriented palette |
| Ocean | Blue-inspired appearance |
| Forest | Green-inspired appearance |
| Sunset | Warm, sunset-inspired colors |
| Clean Light | Minimal light interface |
| Solarized Dark | Solarized dark color palette |
| High Contrast | Enhanced visual contrast |

*Actual appearance may vary slightly depending on LeetCode's current interface.*

## 📸 Screenshots

Screenshots will be added after testing the extension in Chrome.

<!-- Add screenshots here after capturing the actual extension UI. -->

## 🚀 Installation

CodeShade is distributed through GitHub and can be installed manually in Google Chrome.

### Step 1: Download

1. Open the [CodeShade GitHub repository](https://github.com/YOUR_USERNAME/CodeShade).
2. Go to **Releases**.
3. Download the latest `CodeShade-<version>-production.zip` file.
4. Extract the ZIP into a folder on your computer.

### Step 2: Load into Chrome

1. Open Google Chrome.
2. Navigate to `chrome://extensions`.
3. Enable **Developer mode**.
4. Click **Load unpacked**.
5. Select the extracted folder containing `manifest.json`.

CodeShade should now appear in your Chrome extensions list.

### Step 3: Start Customizing

1. Open a LeetCode problem page.
2. Open the CodeShade extension.
3. Select your preferred theme.
4. Open Settings if you want to manage your appearance preferences.

**Note:** This is a manually installed extension, not a Chrome Web Store installation. Updates may require downloading and installing a newer release.

## 🛠️ Built With

- **HTML5** — Interface structure
- **CSS3** — Themes and styling
- **JavaScript** — Extension functionality
- **Chrome Extensions Manifest V3** — Browser extension platform
- **Chrome Storage API** — Local preference persistence

The extension uses vanilla JavaScript without a frontend framework.

## 📁 Project Structure

```text
CodeShade/
├── content/
│   ├── content.css
│   ├── content.js
│   └── selectors.js
├── options/
│   ├── options.html
│   ├── options.css
│   └── options.js
├── popup/
│   ├── popup.html
│   ├── popup.css
│   └── popup.js
├── shared/
│   ├── storage.js
│   ├── themes.js
│   └── validation.js
├── tests/
├── scripts/
├── manifest.json
├── package.json
├── PRIVACY.md
├── SECURITY.md
├── CHANGELOG.md
└── README.md