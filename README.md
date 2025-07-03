# Phoenix Labs: Patient Dashboard App

A modern, mobile-first patient dashboard built with Expo, React Native, and TypeScript. This app provides patients with a seamless experience to view vitals, manage bookings, track medication, and more.

---

## Features
- User authentication (login, signup, onboarding)
- View and track health vitals
- Book and manage appointment slots
- Medication reminders and status
- Delivery/refill tracking
- Custom global alert system
- Responsive, accessible UI with Tailwind CSS (NativeWind)

---

## 🏗️ Project Structure

```
phoenixlabs/
├── app/                # App screens and navigation layouts
│   ├── (auth)/         # Auth-related screens (login, signup, onboarding)
│   ├── (tabs)/         # Main dashboard tabs (home, slots, account, etc.)
│   └── _layout.tsx     # Root layout and navigation
├── components/         # Reusable UI components (Button, Alert, etc.)
├── stores/             # Zustand stores for state management
├── validations/        # Zod schemas for form validation
├── lib/                # Utility functions
├── assets/             # Images and icons
├── constants/          # App-wide constants
├── types/              # TypeScript types
├── api/                # API utilities
├── global.css          # Global styles
├── app.json            # Expo app configuration
└── ...
```

---

## Setup Instructions

1. **Clone the repository:**
   ```sh
   git clone https://github.com/BHARATHKUMARREDDY2004/Phoenixlabs
   cd phoenixlabs
   ```

2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```

3. **Start the Expo development server:**
   ```sh
   npx expo start
   ```

4. **Run on your device:**
   - Use the Expo Go app (iOS/Android) to scan the QR code
   - Or run on an emulator/simulator

---

## Environment & Configuration
- All configuration is managed via `app.json` and `.env` (if needed)
- API endpoints are set in `api/` and can be updated as required
- Splash screen and icons are configured in `app.json` (see [Expo docs](https://docs.expo.dev/guides/app-icons/))

---

## Architectural Decisions
- **Expo + React Native**: Fast prototyping, cross-platform support
- **TypeScript**: Type safety across the codebase
- **Zustand**: Lightweight, scalable state management
- **Zod**: Schema validation for forms and API data
- **NativeWind (Tailwind CSS)**: Utility-first styling for rapid UI development
- **Custom Alert System**: Unified, themeable alerts across the app
- **File-based Routing**: Organized navigation using Expo Router

---

## Contributing
1. Fork the repo
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push to your branch and open a Pull Request

---

## License
MIT

---

## Acknowledgements
- [Expo](https://expo.dev/)
- [React Native](https://reactnative.dev/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Zod](https://zod.dev/)
- [NativeWind](https://www.nativewind.dev/)
- [Expo Router](https://expo.github.io/router/docs)
