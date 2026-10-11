# Privacy

CodeShade stores appearance preferences in Chrome's local extension storage: selected palette, enabled state, custom color values, and editor-surface toggle. These preferences are stored locally and are not sent to a server.

CodeShade does not collect or transmit browsing history, LeetCode account information, cookies, authentication tokens, source code, submissions, or personal information. It contains no telemetry, backend, or remote API calls. Its content script is limited to `https://leetcode.com/*`; page styling is activated only on an individual `/problems/<slug>/` route or its subroutes.

Removing the extension removes its extension data according to Chrome's storage behavior. Users can also use **Reset** in the popup/options page to restore the default preferences.
