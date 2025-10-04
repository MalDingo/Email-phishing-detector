

Phishing Email Analyzer – Chrome Extension for Gmail

📝 Description

Phishing Email Analyzer is a lightweight Chrome extension designed to help users detect potential phishing risks in their Gmail inbox. It scans incoming emails in real time and highlights suspicious elements such as:

⚠️ Suspicious keywords (e.g., urgent, verify now)

⚠️ Suspicious sender domains (e.g., fake “bank” addresses not matching trusted domains)

⚠️ Potential phishing attempts directly in the Gmail interface

The extension adds a warning banner above risky emails, helping users recognize and avoid phishing attacks.

🔧 Features

Real-time scanning of Gmail inbox

Highlights phishing risks directly in the email list

Dynamic scanning using MutationObserver (new emails are checked automatically)

Simple, fast, and privacy-friendly (all detection is done locally, no data leaves your browser)
Project Structure
mail-det/
├── manifest.json      
├── content.js        
├── background.js     
├── popup.html         
├── icon16.png
├── icon48.png
└── icon128.png

🚀 Installation

Clone the repo:

git clone https://github.com/MalDingo/Email-phishing-detector

Open chrome://extensions/ in Chrome

Enable Developer mode

Click Load unpacked and select the project folder

📌 Future Improvements

🔍 Machine Learning–based detection of phishing content

📊 Popup dashboard to display flagged emails

🛡️ Integration with safe-browsing APIs to detect malicious links
