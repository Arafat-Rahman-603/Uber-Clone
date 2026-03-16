# Uber Clone Frontend

This document outlines the details of the frontend setup for the Uber Clone application, specifically detailing our package dependencies and the main pages of the application.

## 📦 Tech Stack & Dependencies

The frontend is built using **React** and bundled with **Vite**. Below are the key dependencies used in the project, as defined in `package.json`:

### Core Framework
* **`react`** (`^19.2.0`) & **`react-dom`** (`^19.2.0`): The core library for building the user interface.
* **`react-router-dom`** (`^7.13.1`): Used for client-side routing to navigate between different pages seamlessly.

### State Management
* **`@reduxjs/toolkit`** (`^2.11.2`) & **`react-redux`** (`^9.2.0`): Main state management system.
* **`zustand`** (`^5.0.11`): A small, fast, and scalable state-management solution.

### API & Real-time Communication
* **`axios`** (`^1.13.6`): Promise-based HTTP client for making API requests to the backend.
* **`socket.io-client`** (`^4.8.3`): Enables real-time, bidirectional communication (used for live location tracking and real-time ride request updates).

### Maps & UI
* **`leaflet`** (`^1.9.4`) & **`react-leaflet`** (`^5.0.0`): Used for rendering interactive maps, displaying routes, and real-time navigation.
* **`react-icons`** (`^5.5.0`): A library for including popular icons in the application UI.

### Styling & Build Tools (Dev Dependencies)
* **`tailwindcss`** (`^3.4.19`), **`postcss`** (`^8.5.6`), **`autoprefixer`** (`^10.4.27`): Utility-first CSS framework for rapid and responsive UI styling.
* **`vite`** (`^7.3.1`): Next-generation frontend tooling for extremely fast development server and optimized production builds.
* **`eslint`**: Linter to maintain code quality.

---

## 📂 Pages Directory (`src/pages`)

The application has several routes components stored in `src/pages`. These are divided primarily between general users (Passengers) and riders (Drivers).

### 🚀 General / Landing
* **`Start.jsx`**: The initial landing page or intro screen when a user opens the application.

### 🧑‍💼 User (Passenger) Pages
* **`UserLogin.jsx`**: Authentication page for existing users to log in.
* **`UserSignup.jsx`**: Registration page for new users to create an account.
* **`UserLogout.jsx`**: Handles the user logout flow.
* **`Home.jsx`**: The main user dashboard where passengers can search for rides, view the map, and request transportation.
* **`Rideing.jsx`**: The active ride screen for the user, showing trip progress, driver details, and real-time location.
* **`UserProtectedCom.jsx`**: A Higher-Order Component (HOC) or layout wrapper to protect routes that require user authentication.

### 🚗 Rider (Driver) Pages
* **`RiderLogin.jsx`**: Authentication page for existing drivers to log in.
* **`RiderSignup.jsx`**: Registration page for new drivers to sign up.
* **`RiderLogout.jsx`**: Handles the driver logout flow.
* **`RiderHome.jsx`**: The main driver dashboard to view incoming ride requests, go online/offline, and see real-time statistics.
* **`RiderRideing.jsx`**: The driver's active ride screen, providing turn-by-turn navigation, route geometry, and passenger details.