# 🔬 ANBL Research Portal (Frontend)

A premium, Apple-inspired research dashboard built with React and Vite, designed for the Advanced Nanomedicine & Biosafety Laboratory.

---

## 🎨 Visual Identity
The portal utilizes a minimalist, high-impact aesthetic:
- **Primary Color**: ANBL Red (`#F63A31`)
- **Typography**: Inter / System Sans-Serif
- **Design Language**: Glassmorphism, animated molecular particles, and tactile hover states.

---

## 📂 Component Structure

- **`src/webtools/Layout/`**: The core dashboard environment including the sidebar, header, and animated overview.
- **`src/webtools/Components/`**: Reusable high-level modules like the **PlatformSearch** (Neuro-Bio-Axis).
- **`src/webtools/Platforms/`**: Detailed view components like the **Analysis Report** generator.

---

## ⚡ Key Features

1.  **Smart Search Engine**:
    *   Google-style "Hero-to-Results" transition.
    *   Dynamic sticky search bar with frosted glass effect.
    *   Scientific filter popup with paginated results.
2.  **Characterization Cards**: Uniform, data-driven cards with category-coded tags and scientific specs.
3.  **Report Integration**: Direct connection to the backend for real-time document retrieval and PDF-ready analysis views.
4.  **Error Resilience**: Integrated notification system for rate limits, network failures, and data validation errors.

---

## 🚀 Setup & Setup

### 1. Installation
```bash
npm install
```

### 2. Development
```bash
npm run dev
```

### 3. API Connection
The frontend connects to the backend at `http://localhost:5000`. 
To change this, update the base URL in the `fetch` calls within `PlatformSearch.jsx` and `MaterialDetails.jsx`.

---

## 🩺 Debugging & Maintenance

- **Sticky Bar Issues**: Ensure no parent container has `overflow: hidden` if the sticky search bar fails to pin.
- **Data Not Showing**: Check if the backend is running and the console for CORS or 429 (Rate Limit) errors.
- **Responsive Layout**: Sidebar behavior is controlled in `WebToolsLayout.css` with a 900px breakpoint for the mobile drawer.
- **Animations**: Page transitions use the `fade-in` utility class found in `index.css`.
