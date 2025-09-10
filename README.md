# DevTree Fullstack Project

This project consists of two repositories: **deploy_devtree_frontend** (frontend) and **deploy_devtree_backend** (backend). Together, they form a fullstack application designed to connect all your social networks and personal links in one place—think "link-in-bio" but custom and dynamic.

---

## Live Demo

- **Production URL:** [https://devtree-mevadev.netlify.app/](https://devtree-mevadev.netlify.app/)

---

## Repositories

- **Frontend (React + TypeScript):** [Meva1997/deploy_devtree_frontend](https://github.com/Meva1997/deploy_devtree_frontend)
- **Backend (Express + TypeScript):** [Meva1997/deploy_devtree_backend](https://github.com/Meva1997/deploy_devtree_backend)

---

## Project Overview

DevTree allows users to create a personal profile where they can share and manage their social networks and important links from a single, shareable URL. The system includes authentication, profile editing, image upload, and handle (username) search and validation.

---

## Main Technologies

- **Frontend:** Vite, React, TypeScript, React Query, React Router.
- **Backend:** Express, TypeScript, MongoDB (Mongoose), JWT, CORS, Cloudinary for image management.

---

## Features

### Frontend

- **Landing Page:** Explains the product and allows users to search for available handles.
- **Authentication:** Login and registration, session management with JWT.
- **Profile Management:** Update name, description, profile image, and links.
- **Public Profile View:** Access profiles via `/your-handle`.
- **Admin Panel:** User dashboard to manage links and profile.

### Backend

- **Register & Login:** Data validation, password hashing & verification, JWT generation.
- **User Management:** Get user data, update profile, upload profile images to Cloudinary.
- **Handle Search & Validation:** API to check handle availability and search users by handle.
- **Route Protection:** Authentication and validation middleware.
- **Custom CORS:** Secure communication between frontend and backend.

---

## Installation

### Backend

```bash
git clone https://github.com/Meva1997/deploy_devtree_backend.git
cd deploy_devtree_backend
npm install
# Set up environment variables (.env): MONGO_URI, JWT_SECRET, FRONTEND_URL
npm run dev
```

### Frontend

```bash
git clone https://github.com/Meva1997/deploy_devtree_frontend.git
cd deploy_devtree_frontend
npm install
npm run dev
```

---

## Folder Structure

- **Backend:** `src/handlers`, `src/middleware`, `src/models`, `src/config`, `src/server.ts`, `src/router.ts`
- **Frontend:** `src/views`, `src/components`, `src/layouts`, `src/api`, `src/router.tsx`, `src/main.tsx`

---

## Key Backend Endpoints

- `POST /auth/register` — User registration
- `POST /auth/login` — Login & JWT issuance
- `GET /user` — Get authenticated user info
- `PATCH /user` — Update profile
- `POST /user/image` — Upload profile image
- `GET /:handle` — Get user by handle
- `POST /search` — Check handle availability

---

## Main User Flow

The user accesses the frontend, can search for a handle, register, log in, and personalize their profile. The backend manages authentication and all user data, ensuring validation and security.

---

## Author

- [Meva1997](https://github.com/Meva1997)

---

This README unifies both repos to present the project as a professional fullstack solution.
