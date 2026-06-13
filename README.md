# TATD Partner Driver App

A premium, native React Native driver application built with **Expo (SDK 54)** and **Redux Toolkit**, designed for TATD drivers/partners to manage their profiles, schedules, view rides, and handle logins with OTP and language preferences (Hindi & English).

---

## 🔗 Project Resources & Links

- **GitHub Repository**: [github.com/pluskode/tatd-driver](https://github.com/pluskode/tatd-driver)
- **Android APK Download**: [Download tatd-partner.apk](https://pub-262d5ca5e8c64282a40d4a92ad7f5ada.r2.dev/tatd-partner.apk)

---


## 📱 Implemented Features

- **Custom Animated Splash Screen**:
  - Built using React Native's native `Animated` engine (fade, scale, rotation transitions).
  - Ambient radial pulsing glow background.
  - Automatically checks and restores saved sessions/language preferences from local storage before transitioning.
- **Localization (Dual-Language support)**:
  - Complete English and Hindi interface translation dictionary.
  - Includes a floating `LanguageToggleButton` component across screens for real-time translation toggling.
- **Driver Authentication Flow**:
  - Form validation on the Login screen using **React Hook Form** and **Zod**.
  - Sends requests via Axios to the TATD backend (`/driver/login/driver-login.php`) to trigger OTP.
  - OTP verification screen for driver authentication.
  - Persistent driver sessions utilizing `@react-native-async-storage/async-storage`.
- **Interactive Driver Dashboard**:
  - Displays the active driver's authenticated mobile number.
  - Today's Summary statistics: Earnings (in ₹), Rating (4.9 ★), and Trips completed.
  - Quick action buttons (Vehicles, Documents, Support) with warning toasts.
  - Interactive daily safety checklist (Checklist state toggles with strike-through text styling).
  - Announcement and notice board displaying weekly driver incentives.
- **Rides History & Detail Modal**:
  - Filterable tabs to view All, Completed, or Cancelled rides.
  - Interactive list item cards displaying Ride ID, date/time, amounts, and locations.
  - Clicking a ride card opens a custom bottom-sheet Modal showing route details (Pickup/Drop points, total fare, payment modes).
- **Driver Schedule Tab**:
  - Timeline view displaying working hours/shifts (e.g., Morning, Afternoon, Evening slots) and rest/working statuses.
- **Profile Settings & Safety**:
  - Verified partner badge with rating details.
  - Wallet balance viewer with a simulated payout transfer request interface.
  - Direct SOS emergency trigger and quick dialing for Police (112) or Ambulance (108).
  - Help & Support actions that link directly to TATD support channels (Phone call, WhatsApp link, Email mailto).
  - Real-time language switching segment and secure session logout.

---

## 🛠️ Tech Stack & Key Libraries

- **Framework**: [Expo SDK 54](https://expo.dev/) (React Native)
- **State Management**: `@reduxjs/toolkit` & `react-redux` (handles auth sessions and app language)
- **Styling**: Standard React Native styling (`StyleSheet.create` and inline styles for precise native performance)
- **Form Handling & Validation**: `react-hook-form` & `zod`
- **Storage**: `@react-native-async-storage/async-storage`
- **Navigation**: `@react-navigation/native` with `@react-navigation/native-stack` & `@react-navigation/bottom-tabs`
- **API Client**: `axios` (configured with base URL `https://www.tatd.in/app-api`)
- **Icons**: `@expo/vector-icons` (Feather Icons)
- **Notifications**: `react-native-toast-message`

---

## 📁 Project Structure

```text
my-expo-app/
├── assets/                  # App images, icons, and splash screens
├── src/
│   ├── App.jsx              # App root component setting up Providers & navigation
│   ├── api/
│   │   └── client.js        # Axios instance configured with base URL (https://www.tatd.in/app-api)
│   ├── components/
│   │   └── LanguageToggleButton.jsx  # Toggle component for language switching
│   ├── constants/
│   │   └── translations.js  # English and Hindi string translations
│   ├── navigation/
│   │   └── AppNavigator.jsx # Tab & Stack navigators setup
│   ├── redux/
│   │   ├── store.js         # Redux store config
│   │   ├── authSlice.js     # Manages driver login session
│   │   └── languageSlice.js # Manages active language state
│   ├── screens/
│   │   ├── SplashScreen.jsx   # Animated entry splash screen
│   │   ├── LoginScreen.jsx    # Phone number form screen
│   │   ├── OtpScreen.jsx      # OTP verification simulation screen
│   │   ├── DashboardScreen.jsx# Stats, safety checklists, announcements
│   │   ├── RidesScreen.jsx    # Ride filter lists with detail drawers
│   │   ├── ScheduleScreen.jsx # Driver shifts and timeline
│   │   └── ProfileScreen.jsx  # Payouts, SOS emergency, support linking, and logout
│   ├── utils/
│   │   └── errorHandler.js  # Global utility to format API error toasts
│   └── validations/
│       └── schemas.js       # Zod validation schema definition
├── App.js                   # Expo root entry point
├── app.json                 # Expo native application configuration
├── babel.config.js          # Babel config (Worklets plugin configuration)
├── metro.config.js          # Metro bundler config
├── postcss.config.mjs       # PostCSS configuration
└── tsconfig.json            # Path alias configurations
```

---

## 🚀 Getting Started

### 📋 Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: (LTS version 18+ recommended)
- **npm** or **yarn**
- **Expo Go** app (installed on your Android/iOS device) or an **Emulator** (Android Studio / Xcode)

### ⬇️ Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/pluskode/tatd-driver.git
   cd tatd-driver
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```
---

## 🏃 Running the App

### Start the development server (Metro Bundler)

```bash
npm run start
```
*or*
```bash
npx expo start
```

Once the Metro bundler is running, you can:
- Scan the **QR Code** shown in the terminal using the **Expo Go** app on your physical device.
- Press **`a`** to open the app on an Android Emulator.
- Press **`i`** to open the app on an iOS Simulator.

---

## 🛠️ Code Formatting & Linting

We use ESLint and Prettier to keep our code clean and consistent.

- **Check for lint issues**:
  ```bash
  npm run lint
  ```
- **Automatically format code**:
  ```bash
  npm run format
  ```

---

## 📦 Building

We use **EAS (Expo Application Services)** to build production binaries.

### Configure EAS Build
If you need to configure the build profiles:
```bash
eas build:configure
```

### Build for Android (Production/Release)
To start a production build of the Android APK/AAB:
```bash
eas build --platform android --profile production
```
