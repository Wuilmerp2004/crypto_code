# Crypto Hustle Pro

A React-based cryptocurrency dashboard that displays real-time prices, detailed coin data, and interactive routing for individual crypto assets using the CryptoCompare API.

Vercel Deployment: https://crypto-hustle-code.vercel.app 

---

## Overview

Crypto Hustle Pro allows users to browse a list of top cryptocurrencies, view their current prices, and click on any coin to access detailed information — including market cap, 24-hour stats, algorithm type, and coin descriptions.  
This project builds on the foundations of *Crypto Hustle Lite*, adding React Router navigation, dynamic detail pages, and API integration for a richer, multi-page experience.

---

## Features

- Real-Time Pricing: Fetches live USD prices for cryptocurrencies using the CryptoCompare API.  
- Detailed Coin View: Displays coin descriptions, algorithm type, launch date, and 24-hour performance metrics.  
- Dynamic Routing: Built with React Router — each coin links to its own detailed route (`/coinDetails/:symbol`).  
- Clean Navigation: Includes a simple layout component with persistent navigation and nested routes.  
- Responsive Design: Lightweight CSS ensures the interface adapts to different screen sizes.  
- Environment Variables: API key stored securely via Vite environment variables.

---

## Tech Stack

| Layer | Technologies |
|--------|---------------|
| Frontend | React (Vite), JSX, CSS |
| Routing | React Router DOM v6 |
| API | [CryptoCompare API](https://min-api.cryptocompare.com/) |
| Build Tool | Vite |

---



