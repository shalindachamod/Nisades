# නිසඳැස් සිතුවිලි (Nisadas Sithuvili) ✍️✨

A clean, responsive Sinhala free-verse poetry web platform featuring daily inspirational quotes, poem categorization, and social sharing.

> *"Where free thoughts turn into verse, connecting sensitive hearts through authentic poetry."*

## 🌟 Key Features

* **Dynamic Daily Quotes:** Automatically displays a thought of the day parsed from `quotes.md`.
* **Category Filtering:** Easily filter poetry collections by categories like *Love*, *Life*, and *All*.
* **Interactive UI:**
  * Dark Mode / Light Mode toggle with persistence (`localStorage`).
  * "Read More" expandable poem cards.
  * Interactive like button with state preservation.
  * One-click copy poem functionality with visual feedback.
  * Social media share integration (WhatsApp & Facebook).
* **Responsive Design:** Optimized for mobile phones, tablets, and desktops using Sinhala typography (`Abhaya Libre`).

## 📁 Project Structure

```text
my-nisades-site/
│
├── index.html          # Main landing page with hero, quote, and featured poems
├── poems.html          # Archive page featuring full search and all poems
├── about.html          # About page introducing the author and project
├── quotes.md           # Line-by-line collection of daily thoughts/quotes
│
├── css/
│   └── style.css       # Layout styles, theme styling, and animations
│
├── js/
│   ├── app.js          # Core UI logic, theme switch, and quote fetcher
│   └── poems-data.js   # Poem data collection
│
└── images/
    └── profile.jpg     # Author profile picture
```

## 🚀 Getting Started

### 1. Clone or Download
```bash
git clone https://github.com/shalindachamod/nisadas-sithuvili.git
cd nisadas-sithuvili
```

### 2. Running Locally
Because the daily quote system uses `fetch()` to dynamically read `quotes.md`, opening `index.html` directly via the browser (`file://` protocol) will trigger browser CORS restrictions.

To run the site properly:
* Open the folder in **VS Code**.
* Right-click `index.html` and click **"Open with Live Server"**.

## 🌐 Deployment (GitHub Pages)

1. Push your project repository to GitHub.
2. In your repository on GitHub, open **Settings** > **Pages**.
3. Under **Branch**, select `main` (or `master`) and keep folder as `/ (root)`.
4. Click **Save**. Your site will be published online at `https://<username>.github.io/<repository-name>/`.

## 👤 Author

**Shalinda Chamod**
* Facebook: [@shalinda.chamod.2025](https://web.facebook.com/shalinda.chamod.2025)
* GitHub: [@shalindachamod](https://github.com/shalindachamod)
* LinkedIn: [Shalinda Chamod](https://www.linkedin.com/in/shalinda-chamod-452a23385/)

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
