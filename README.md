# 🍔 React Native Food Ordering App

A modern, full-stack mobile application for food ordering built with **React Native (Expo)** and powered by **Appwrite**. This app provides users with seamless browsing of menu items, customizable orders, cart management, and secure authentication — all in one place.

# Screenshot

<img width="278" height="561" alt="image" src="https://github.com/user-attachments/assets/03e387ee-af6a-4cfe-91e7-19de7f2d8719" /> <img width="311" height="712" alt="image" src="https://github.com/user-attachments/assets/7a58d083-6297-42ac-9c69-272d67f63396" /> | <img width="317" height="820" alt="image" src="https://github.com/user-attachments/assets/188d110e-59b0-4eb4-9e17-611e86d671cd" />




---

## 🚀 Features

### 🔐 User Authentication
- Sign up, sign in, and session management via Appwrite Auth.
- Protected routes using `useAuthStore()` and conditional navigation.

### 🍕 Dynamic Menu
- Browse items by category (e.g., Pizza, Drinks, Sides).
- Item details include name, image, price, calories, and protein.
- Powered by Appwrite's Database and Storage.

### 🧩 Customizations
- Add-ons like sauces, crusts, toppings, etc.
- Each menu item is linked with its available customizations.
- Dynamically displayed on the item detail screen.

### 🛒 Cart System
- Add items to the cart with quantity and customization options.
- View total price and item summary.
- Remove or update cart items.
- Cart state managed globally using Zustand.

### 📂 Appwrite Integration
- **Authentication**: Secure login & signup
- **Database**: Stores users, menu items, categories, customizations
- **Storage**: Image upload and retrieval for menu items
- **Functions**: Optional seeding and backend logic

---

## 🧱 Tech Stack

| Technology     | Description                                      |
|----------------|--------------------------------------------------|
| React Native   | Frontend mobile framework (Expo CLI)             |
| Appwrite       | BaaS for auth, database, storage                 |
| Zustand        | Lightweight global state management              |
| Tailwind (NativeWind) | Utility-first CSS styling in RN         |
| TypeScript     | Strongly typed codebase                          |

---


