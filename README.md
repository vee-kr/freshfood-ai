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

The AI is instructed to:

- 🔍 Identify the product name.
- 📅 Find the expiration date on the package.
- 🏷️ Prefer dates labeled **EXP**, **EXPIRY**, **BEST BEFORE**, or **USE BY**.
- 🚫 Avoid using production or manufacturing dates as expiration dates.
- 👀 Use only information that is visible in the photo.
- 📄 Return the detected information in a structured format.

If the product name or expiration date cannot be identified, the application can return `NOT_FOUND` instead of guessing.

> ⚠️ AI results depend on the quality and visibility of the photo. FreshFood does not guarantee that every product or expiration date will be identified correctly.

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


### 1. Clone the repository

Clone the repository and navigate to the project directory.

    git clone https://github.com/vee-kr/freshfood-ai.git
    cd freshfood-ai

### 2. Create a virtual environment

Create a Python virtual environment:

    python -m venv venv

Activate it:

**macOS / Linux:**

    source venv/bin/activate

**Windows:**

    venv\Scripts\activate

### 3. Install dependencies

Install the required Python packages:

    pip install -r requirements.txt

### 4. Set up environment variables

Create a `.env` file in the project root.

The only required environment variable is your OpenRouter API key:

    OPENROUTER_API_KEY=your_api_key

Replace `your_api_key` with your actual OpenRouter API key.

### 5. Optional proxy configuration

If OpenRouter is inaccessible from your network, you can optionally configure a Webshare proxy.

Add the following variables to your `.env` file:

    WEBSHARE_PROXY_ADDRESS=your_proxy_address
    WEBSHARE_PROXY_PORT=your_proxy_port
    WEBSHARE_PROXY_USERNAME=your_proxy_username
    WEBSHARE_PROXY_PASSWORD=your_proxy_password


> ‼️ A proxy is **not required** if OpenRouter is accessible from your network.

### 6. Run the application

Start the FastAPI server:

    uvicorn app:app --reload

Then open the local address provided by FastAPI in your browser.

### 7. Start using FreshFood

1. 📷 Take or choose a photo of a packaged food product.
2. 🤖 Let the AI analyze the photo.
3. 📅 Check the detected expiration date and food status.
4. 💾 Add the product to **My Food** if you want to keep track of it.
5. 🔊 Use **Read Aloud** to hear the food information.

## 🌐 Deployment

FreshFood is deployed using **Vercel**.

### Environment Variables

When deploying the application to Vercel, add the following environment variable in the project's settings:

    OPENROUTER_API_KEY=your_api_key_here

If a proxy is required for your network, the optional Webshare proxy variables can also be added:

    WEBSHARE_PROXY_ADDRESS=your_proxy_address
    WEBSHARE_PROXY_PORT=your_proxy_port
    WEBSHARE_PROXY_USERNAME=your_proxy_username
    WEBSHARE_PROXY_PASSWORD=your_proxy_password

### Live Demo

FreshFood is available at:

https://freshfood-ai.vercel.app/

## ⚠️ Limitations

### 🚨 Important: Free AI Model Availability

> **FreshFood currently uses free AI models through OpenRouter. These models may become temporarily unavailable, overloaded, rate-limited, or removed from the platform. As a result, AI scanning may occasionally fail or require the models used by the application to be changed or updated.**

- 🤖 **AI accuracy** — AI-generated results may be incorrect, especially when the product name or expiration date is unclear, blurry, partially hidden, or difficult to read.
- 📷 **Photo quality** — The accuracy of the scan depends on the quality, lighting, angle, and visibility of the photo.
- 📅 **Expiration dates** — FreshFood only uses dates that are visible in the provided image. If an expiration date cannot be identified, the result may be returned as `NOT_FOUND`.
- 🌐 **Network access** — FreshFood requires access to OpenRouter to process food images. Some networks may require an optional proxy configuration.
- 🔑 **API access** — An OpenRouter API key is required to use the AI scanning functionality.
- 💾 **Local storage** — Saved food products are stored in the browser's local storage and may be lost if the browser data is cleared.
- 📱 **Browser support** — Some accessibility and camera features may behave differently depending on the browser and device.

## 🔋 Future Improvements


- 🤖 Improve AI accuracy and reliability for different types of food packaging and expiration date formats.
- 🌍 Add support for more languages.
- 💾 Add cloud-based food storage so saved products can be accessed across devices.
- 🔔 Add optional notifications for products that are approaching their expiration dates.

## 📸 Screenshots

## 👩🏼‍💻 Author

Created by **Vasilisa Korchagina**

GitHub: [vee-kr](https://github.com/vee-kr)
