# Vue sur la Montagne Resort & Spa — Hotel Landing Page

A luxury hotel management landing page for a resort in Rizal, Philippines.
Built with **React + Vite + Tailwind CSS**.

---

## ✨ Features

| Feature | Details |
|---|---|
| 🎠 **Animated Hero Carousel** | Full-screen slideshow of all 6 room types with crossfade transitions (5.5s interval) |
| 📅 **Live Booking Form** | Check-in/out date picker, room type selector, guest count |
| 🛏️ **6 Room Types** | Photo cards with hover effects and a detail modal (name, price, size, bed type, features, description) |
| 🌿 **8 Curated Services** | Infinity Pool & Spa, Farm-to-Table Dining, Trail Expeditions, Photography Retreats, Outdoor Fitness, Rizal Tours, Signature Spa, Stargazing |
| 🖼️ **Photo Gallery** | 6-image bento grid of real Rizal landmarks and resort spaces with lightbox overlay |
| 📍 **About & Map Section** | Resort story + illustrated map of Rizal province with location markers |
| 💬 **Testimonials Carousel** | 4 guest reviews with animated slide transitions |
| 📬 **Contact Form** | Full validation, email / phone / message fields |
| ⚡ **Loading Screen** | Branded animated intro before the main page appears |
| 📱 **Fully Responsive** | Optimised for mobile, tablet, and desktop viewports |
| 🎨 **Scroll Reveal Animations** | Sections animate in as the user scrolls via a custom `useReveal` hook |

---

## 🎨 Design System

### Colour Palette

| Swatch | Token | Hex | Usage |
|---|---|---|---|
| 🟩 | Deep Forest | `#072209` | Primary brand dark |
| 🟢 | Forest Green | `#2E7D32` | Accent, CTAs |
| 🟡 | Brand Gold | `#C9A227` | Highlights, stars |
| 🟤 | Warm Parchment | `#DCCBB5` | Labels, icon tints |
| 🤍 | Cream | `#F5F0E8` | Page background |
| 🔵 | Navy Deep | `#1B365D` | Services & testimonials sections |

### Typography

| Role | Typeface | Usage |
|---|---|---|
| Display | **Cormorant Garamond** *(italic, light)* | H1–H3 headings |
| Eyebrow | **Cinzel** *(medium, wide-tracked)* | Section labels, badges, navbar |
| Body | **DM Sans / Lato** *(regular)* | Body copy, forms, UI text |

---

## 🛏️ Room Types

| Room | Size | Bed | Starting Price |
|---|---|---|---|
| Deluxe Mountain View | 42 sqm | King | ₱8,500 / night |
| Superior Forest Suite | 60 sqm | King | ₱12,000 / night |
| Premier Lake View | 75 sqm | Twin King | ₱15,500 / night |
| Presidential Villa | 180 sqm | Master Suite | ₱38,000 / night |
| Jungle Treehouse Cabin | 35 sqm | Queen | ₱10,500 / night |
| Garden Pavilion Room | 32 sqm | Queen | ₱6,800 / night |

---

## 🌿 Services

1. **Infinity Pool & Spa** — Float above the forest canopy; Filipino-inspired wellness treatments
2. **Rizal Farm-to-Table** — Chef-curated menus from Rizal's highland harvests
3. **Guided Trail Expeditions** — Mt. Daraitan, Tinipak River, hidden waterfalls
4. **Photography Retreats** — Guided landscape walks, drone sessions, studio printing
5. **Outdoor Fitness Studio** — Open-air yoga pavilions with mountain views
6. **Curated Rizal Tours** — Angono art scene, Laguna de Bay, ancestral sites
7. **Signature Spa Rituals** — Hilot healing, volcanic stone massages, forest bathing
8. **Stargazing Evenings** — Guided astronomy nights with telescopes

---

## 🖼️ Gallery

| # | Title | Location |
|---|---|---|
| 1 | Tinipak River at Dawn | Tanay, Rizal |
| 2 | Mt. Daraitan Summit | Tanay, Rizal |
| 3 | Forest Canopy Suite | Vue sur la Montagne Resort |
| 4 | Angono-Binangonan Cave Petroglyphs | Binangonan, Rizal |
| 5 | Pililla Wind Farm | Pililla, Rizal |
| 6 | Infinity Pool | Vue sur la Montagne Resort |

---

## 🛠️ Tech Stack

```
UI Layer        →  React 18 · Lucide React
Styling         →  Tailwind CSS · Google Fonts (Cormorant · Cinzel · DM Sans)
Build & Dev     →  Vite · PostCSS
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+**

### Installation

```bash
# Clone or download the project
cd vue-sur-la-montagne

# Install dependencies
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.
The page includes a branded loading screen before the main content appears.

### Production Build

```bash
npm run build
```

---

## 📁 Project Structure

```
vue-sur-la-montagne/
├── public/
│   ├── circle_logo.png
│   ├── landscape_logo.png
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   ├── gallery/                       # 6 real Rizal landscape photos
│   │   │   ├── Tinipak_River_Spring.jpg
│   │   │   ├── daraitan_summit.jpg
│   │   │   ├── Resort_Forest_Canopy_Suite.jpg
│   │   │   ├── angono_binangonan_cave.jpg
│   │   │   ├── pililla_wind_mill.jpg
│   │   │   └── infinit_pool.jpeg
│   │   ├── mountain_view.jpg              # Deluxe Mountain View room
│   │   ├── superior_forest_suit.jpg       # Superior Forest Suite
│   │   ├── lake_view_reflection.jpg       # Premier Lake View
│   │   ├── presidential_villa.jpg         # Presidential Villa
│   │   ├── jungle_treehouse.webp          # Jungle Treehouse Cabin
│   │   └── garden_pavillion_room.jpg      # Garden Pavilion Room
│   ├── components/
│   │   ├── Navbar.jsx                     # Sticky nav with scroll-aware styling
│   │   ├── Hero.jsx                       # Animated full-screen room carousel
│   │   ├── BookingSection.jsx             # Reservation form
│   │   ├── RoomsSection.jsx               # 6 room cards + detail modal
│   │   ├── RoomDetailModal.jsx            # Modal overlay for room details
│   │   ├── ServicesSection.jsx            # 8 hotel services grid
│   │   ├── GallerySection.jsx             # Bento photo gallery with lightbox
│   │   ├── AboutSection.jsx               # Resort story + Rizal location map
│   │   ├── TestimonialsSection.jsx        # Guest reviews carousel
│   │   ├── ContactSection.jsx             # Contact form with validation
│   │   ├── LoadingScreen.jsx              # Branded intro animation
│   │   └── Footer.jsx                     # Links, address, social icons
│   ├── hooks/
│   │   └── useReveal.js                   # Intersection Observer scroll-reveal hook
│   ├── App.jsx                            # Root layout & loading gate
│   ├── main.jsx                           # React entry point
│   └── index.css                          # Global styles & Tailwind base
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

---

## 📍 About Vue sur la Montagne

**Vue sur la Montagne** *(French: "View of the Mountain")* is a fictional five-star luxury resort situated in **Tanay, Rizal, Philippines** — a real highland municipality approximately 60 km east of Metro Manila, set against the backdrop of the Sierra Madre mountain range.

---

*Built for Vue sur la Montagne Hotel — Rizal, Philippines.*  
*A fictional luxury resort concept — all guest names, prices, and amenities are illustrative.*
