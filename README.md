# 🎨 CodeShade — LeetCode Theme Customizer

Customize your LeetCode coding experience with 10 beautiful themes.

CodeShade is a lightweight Chrome extension that lets you personalize the appearance of LeetCode problem pages. Choose from a collection of dark, light, and high-contrast themes to create a coding environment that suits your preferences.

**10 Themes · Manifest V3 · Lightweight · Privacy-Focused**

---

## ✨ Features

- 🎨 **10 Themes** — Choose from a curated collection of themes.
- 🌙 **Dark & Light Modes** — Switch between different visual styles.
- ⚡ **Theme Switching** — Customize your LeetCode experience.
- 💾 **Persistent Preferences** — Save your appearance settings locally.
- 🧩 **Problem-Page Styling** — Designed to customize individual LeetCode problem pages.
- 💻 **Editor-Friendly Styling** — Designed to preserve LeetCode's native Monaco syntax highlighting.
- ⚙️ **Settings Page** — Manage appearance preferences.
- 🔒 **Privacy-Focused** — Designed to work without requiring a separate account.

## 🎭 Available Themes

| Theme | Style |
|---|---|
| Midnight | Deep, dark appearance |
| Dracula | Purple-inspired dark theme |
| Nord | Cool, muted colors |
| Monokai | Colorful coding palette |
| Ocean | Blue-inspired appearance |
| Forest | Green-inspired appearance |
| Sunset | Warm, sunset-inspired colors |
| Clean Light | Minimal light appearance |
| Solarized Dark | Solarized dark palette |
| High Contrast | Enhanced visual contrast |

## 📸 Screenshots

### CodeShade Preview

![CodeShade Screenshot 1](images/Screenshot%20%28430%29.png)

### Theme Selection

![CodeShade Screenshot 2](images/Screenshot%20%28433%29.png)

### Settings Page

![CodeShade Screenshot 3](images/Screenshot%20%28434%29.png)

## 🚀 Installation

CodeShade can be installed manually in Google Chrome.

### 1. Download the Extension

1. Open the [CodeShade GitHub repository](https://github.com/ChiragRewaliya336/CodeShade).
2. Navigate to **Releases**.
3. Download the latest production ZIP.
4. Extract the ZIP into a folder.

### 2. Install in Chrome

1. Open Google Chrome.
2. Navigate to `chrome://extensions`.
3. Enable **Developer mode**.
4. Click **Load unpacked**.
5. Select the extracted folder containing `manifest.json`.

### 3. Start Using CodeShade

1. Open a LeetCode problem page.
2. Open the CodeShade extension.
3. Choose your preferred theme.
4. Open Settings to manage appearance preferences.

**Note:** This is a manually installed extension. Updates may require downloading and installing a newer release.

## 🛠️ Built With

- **HTML5** — Interface structure
- **CSS3** — Theme styling
- **JavaScript** — Extension functionality
- **Chrome Extensions Manifest V3** — Extension platform
- **Chrome Storage API** — Preference persistence

CodeShade uses vanilla JavaScript without a frontend framework.

## 📁 Project Structure

```text
Code-Shada/
├── content/
│   ├── content.css
│   ├── content.js
│   └── selectors.js
├── images/
│   ├── Screenshot (430).png
│   ├── Screenshot (433).png
│   └── Screenshot (434).png
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
├── manifest.json
├── PRIVACY.md
└── README.md
```

*The structure above highlights the main extension files. Your repository may also contain tests, scripts, and other development files.*

## 🔐 Privacy

CodeShade is designed to store appearance preferences locally and does not require a separate user account.

For additional information, read [PRIVACY.md](PRIVACY.md).

Review the extension's source code and permissions before installation.

## 🧪 Testing

During release preparation, the project reported:

- 17 automated tests passed.
- Manifest validation passed.
- JavaScript syntax checks passed.
- Static security checks passed.

These automated checks do not replace manual browser testing. Theme behavior, settings persistence, editor readability, and page restrictions should also be verified in Chrome.

## 🤝 Contributing

Contributions, bug reports, and suggestions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Run the available tests.
5. Submit a pull request explaining your changes.

## 🐛 Reporting Issues

If you find a bug, open an issue in the GitHub repository.

Include:
- A description of the problem
- Steps to reproduce it
- Your Chrome version
- Screenshots, if relevant

Never include passwords, authentication tokens, or other sensitive information in issue reports.

## 📄 License

A license has not been specified in this README. Add a `LICENSE` file before granting others explicit permission to reuse, modify, or distribute the project.

## 👨‍💻 Author

**Chirag**

GitHub: [ChiragRewaliya336](https://github.com/ChiragRewaliya336)

---

<p align="center">
  Made for a more personalized coding experience. 💻
</p>