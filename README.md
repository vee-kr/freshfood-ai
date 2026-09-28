# FreshFood

An accessible web application that helps blind and low-vision users identify packaged food and check its expiration date.


## ✨ Features
- 📷 **Food scanning** — Upload or take a photo of a packaged food product.
- 🤖 **AI-powered recognition** — Uses an AI vision model to identify the product and read its expiration date.
- 📅 **Expiration tracking** — Determine whether a product is Fresh, Expiring, or Expired.
- 🍽️ **My Food** — Save scanned products and keep track of their expiration dates.
- 🔊 **Read Aloud** — Make food information easier to access using text-to-speech.
- ♿️ **Accessible interface** — Designed with accessibility and readability in mind, including high contrast and clear visual elements.
- 📱 **Responsive design** — Works on both mobile and desktop screens.

## ♿ Accessibility
FreshFood is designed with accessibility in mind, especially for blind and low-vision users.

- 🫟 **High contrast** — Uses strong contrast between text, backgrounds, and interactive elements.
- 🔤 **Clear typography** — Uses readable font sizes and spacing to make information easier to read.
- 🕹️ **Clear interactive elements** — Buttons and controls are visually distinct and easy to identify.
- 🌐 **VoiceOver support** — On iPhone, users can use Apple's built-in **VoiceOver** screen reader to navigate and interact with the application.
- 🔊 **Read Aloud** — Important food information can be read aloud using text-to-speech.
- 📱 **Responsive layout** — The interface adapts to different screen sizes and devices.
- 🗺️ **Simple navigation** — Keeps the main actions clear and easy to find.

## 🛠️ Technologies

- **Python** — Backend development and application logic
- **HTML** — Page structure
- **CSS** — Styling
- **JavaScript** — Frontend functionality
- **FastAPI** — Backend API and server
- **OpenRouter** — AI model access for food recognition and expiration-date detection
- **Vercel** — Deployment

## 📱 How It Works

1. 📷 **Scan a product** — Upload or take a photo of a packaged food product.
2. 🤖 **Process the image** — FreshFood sends the image to an AI vision model.
3. 🔍 **Identify the information** — The AI identifies the product name and expiration date from the package.
4. 📅 **Check the expiration status** — FreshFood determines whether the product is **Fresh**, **Expiring**, or **Expired**.
5. 💾 **Add food to My Food** — Add scanned products to **My Food** or manually enter a product name and expiration date.
6. 📋 **Manage your food** — View saved products and keep track of their expiration dates.
7. 🔊 **Read the information aloud** — Important food information can be read aloud using text-to-speech.

## 🤖 AI

## 📂 Project Structure

```text
freshfood-ai/
│
├── backend/
│   ├── __init__.py
│   └── main.py               # FastAPI application, AI scanning, and frontend serving
│
├── css/
│   └── style.css            # Styles
│
├── images/
│   └── logo.png             # FreshFood logo
│
├── js/
│   └── script.js            # Frontend logic and application functionality
│
├── app.py                   # Application entry point
├── index.html               # Home page
├── scan.html                # Food scanning page
├── result.html              # Scan result page
├── my-food.html             # Saved food products page
│
├── requirements.txt         # Python dependencies
└── README.md                
```

## 🚀 Getting Started

## 🌐 Deployment

## ⚠️ Limitations

## 🔋 Future Improvements

## 📸 Screenshots

## 👩🏼‍💻 Author

Created by **Vasilisa Korchagina**

GitHub: [vee-kr](https://github.com/vee-kr)
