# 🔬 ANBL Laboratory Portal - Agent Memory

This document stores the operational memory, visual guidelines, page layout details, and dashboard tool configurations for the **ANBL Laboratory Portal** frontend workspace.

---

## 🏛 Project Overview
The ANBL Portal is a high-fidelity, Apple-inspired scientific research dashboard and public information landing page. It provides public outreach for the laboratory, a searchable database of publication bibliographies, and an advanced dashboard hosting computational nanomedicine tools.

## 🛠 Tech Stack
- **Framework:** React (v19.x)
- **Build Tool:** Vite (v8.x)
- **Routing:** React Router DOM (v7.x)
- **Styling:** Vanilla CSS (curated HSL palettes, glassmorphism, custom scrollbars, and keyframe particle animations)
- **Branding:** Primary color: ANBL Red (`#F63A31`), with a dark-mode-centric scientific aesthetic.
- **Resilience:** Monitors network connectivity dynamically. Displays an `OfflineScreen` when the browser loses connection.

---

## 📂 Architecture & Routing Map

### 1. Public Facing Interface (Main Layout)
Managed under [MainLayout](file:///D:/Zipsar-Base/anbl-website/src/App.jsx#L98-L122) in `App.jsx`:
- **Announcement Bar:** Dynamic banner with early-access webtool invitation.
- **Routes:**
  - `GET /`: [Home](file:///D:/Zipsar-Base/anbl-website/src/pages/Home/Home.jsx) (Overview & updates)
  - `GET /about`: [About](file:///D:/Zipsar-Base/anbl-website/src/pages/About/About.jsx) (Lab timeline)
  - `GET /team`: [ResearchTeam](file:///D:/Zipsar-Base/anbl-website/src/pages/ResearchTeam/ResearchTeam.jsx) (Roster)
  - `GET /publications`: [Publications](file:///D:/Zipsar-Base/anbl-website/src/pages/Publications/Publications.jsx) (Searchable bibliography with pagination)
  - `GET /research`: [Research](file:///D:/Zipsar-Base/anbl-website/src/pages/Research/Research.jsx) (Overview of domains)
  - `GET /contact`: [Contact](file:///D:/Zipsar-Base/anbl-website/src/pages/Contact/Contact.jsx) (Inquiries form)

### 2. WebTools Computational Dashboard
Nest-routed under `/webtools` using the [WebToolsLayout](file:///D:/Zipsar-Base/anbl-website/src/webtools/Layout/WebToolsLayout.jsx):
- **WebTools Landing (`/webtools`):** Hub card navigator.
- **Neuro-Bio-Axis Tool (`/webtools/neuro-bio-axis`):** Nanoparticle neurological interaction database search engine.
- **Poly-ToxMap Tool (`/webtools/poly-toxmap`):** Toxicity filters and polymer database search.
- **Poly-ToxPredictor (`/webtools/poly-toxmap-predictor`):** Model simulation sandbox.
- **Material Details Reports (`/webtools/details/:id`):** Renders clean, structured, and print-ready scientific characterization reports.
- **Documentation (`/webtools/documentation`):** Computational methodologies guide.

---

## 🎨 Visual Identity & Styling
- **Typography:** Inter/System Sans-serif.
- **Page Transitions:** Handled via `.fade-in` animation class defined in `index.css`.
- **Loading Overlay:** Animated particle screen with vibrating dots simulating molecular movements.
- **Responsive Layout:** Sidebar responsive break-point at `900px` for mobile drawer toggle.
