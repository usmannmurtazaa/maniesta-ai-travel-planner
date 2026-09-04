<div align="center">

# ✈️ Maniesta AI Travel Planner

**A premium AI-powered travel planning experience**  
Plan your perfect trip in minutes with Gemini AI, interactive maps, weather forecasts, and a personal travel assistant.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>

## 🌟 Features

- 🤖 **AI-Generated Itineraries** – Personalized day-by-day plans powered by **Google Gemini**
- ✏️ **Full Editing & Regeneration** – Modify any activity or regenerate entire days
- 💬 **AI Travel Assistant** – Ask questions about your trip (e.g., “What should I pack?”)
- 🌤️ **Live Weather** – Current conditions and 7‑day forecast via **Open‑Meteo**
- 🗺️ **Interactive Maps** – Leaflet + OpenStreetMap with activity markers
- 💾 **Saved Trips** – Store multiple trips in your browser (localStorage)
- 📊 **Budget Breakdown** – Track estimated costs vs. budget
- 📱 **Fully Responsive** – Optimized for mobile, tablet, laptop, and desktop
- 🎨 **Premium UI** – Glassmorphism, aurora gradients, and smooth Framer Motion animations

## 🛠️ Tech Stack

| Category        | Technology                          |
|-----------------|-------------------------------------|
| Framework       | Next.js 14 (App Router)             |
| Language        | TypeScript                          |
| Styling         | Tailwind CSS + custom glass styles  |
| Animations      | Framer Motion                       |
| AI              | Google Gemini (gemini-2.5-flash)    |
| Weather         | Open‑Meteo API (no key required)    |
| Maps            | Leaflet + OpenStreetMap             |
| Storage         | localStorage                        |

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17 or later
- npm or yarn
- A [Google Gemini API key](https://makersuite.google.com/app/apikey)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/maniesta-ai-travel-planner.git
   cd maniesta-ai-travel-planner
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**  
   Create a `.env.local` file in the root:
   ```
   GEMINI_API_KEY=your_google_gemini_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the app.

5. **Build for production**
   ```bash
   npm run build
   npm run start
   ```

## 🌍 Deployment

The project is ready for deployment on **Netlify** or **Vercel**.  
For Netlify:

1. Push the repository to GitHub.
2. Connect the repo in Netlify.
3. Set build command: `npm run build`  
   Publish directory: `.next`
4. Add environment variable `GEMINI_API_KEY`.
5. Deploy!

## 📄 Environment Variables

| Variable         | Description                     | Required |
|------------------|---------------------------------|----------|
| `GEMINI_API_KEY` | Google Gemini API key           | ✅ Yes   |

## 🧠 How It Works

1. User fills a multi‑step form (destination, dates, budget, interests, etc.).
2. The app sends the data to a secure server‑side API route.
3. Gemini generates a structured itinerary with activities, times, costs, and coordinates.
4. The itinerary is saved to `localStorage` and displayed on an interactive dashboard.
5. Weather and maps are fetched client‑side from Open‑Meteo and Leaflet.
6. The AI assistant answers questions using the current trip context.

## 📁 Project Structure

```
maniesta-ai-travel-planner/
├── app/
│   ├── api/
│   │   ├── generate-itinerary/route.ts   # Gemini itinerary generation
│   │   ├── regenerate-itinerary/route.ts # Regeneration (day/all)
│   │   ├── weather/route.ts              # Open‑Meteo weather
│   │   └── assistant/route.ts            # AI travel assistant
│   ├── planner/                          # Trip planning form
│   ├── dashboard/                        # Trip dashboard
│   ├── results/                          # Legacy results page (still accessible)
│   ├── about/                            # About/FAQ
│   └── layout.tsx                        # Root layout
├── components/
│   ├── ui/                               # Reusable UI primitives
│   ├── layout/                           # Navbar, Footer
│   ├── forms/                            # Multi‑step form steps
│   ├── sections/                         # Landing page sections
│   ├── dashboard/                        # Dashboard‑specific components
│   └── shared/                           # Loading, Empty, Error states
├── lib/
│   ├── types.ts                          # TypeScript interfaces
│   ├── constants.ts                      # Dropdown options
│   └── utils.ts                          # Utility functions
└── ...
```

## 🐛 Known Limitations

- No persistent database – trips are saved only in the browser (`localStorage`).
- Weather and map depend on external free APIs; occasional failures are handled gracefully.
- Gemini may occasionally return activities without exact coordinates, so map markers may be limited.

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

---

**Made with ❤️ and AI**  
Happy travels! 🌍