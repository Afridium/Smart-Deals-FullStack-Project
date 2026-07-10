# Smart Deals

Smart Deals is a full-stack MERN web application where users can list products, browse listings, and place bids on items they're interested in. Authentication is handled with Firebase, and protected routes are secured using JWT tokens verified against Firebase on the backend.

## Features

- 🔐 **Authentication** — Firebase Authentication for user sign up / login
- 🛡️ **Protected Routes** — Private routes on the frontend using `AuthContext` and `AuthProvider`, combined with JWT + Firebase token verification on the backend
- 📦 **Product Management** — Users can upload, view, and manage products
- 💰 **Bidding System** — Users can place bids on products and track their bids
- 🎨 **Responsive UI** — Built with Tailwind CSS for a clean, mobile-friendly design

## Tech Stack

**Frontend**
- React.js
- React Router
- Tailwind CSS
- Firebase (Client SDK)

**Backend**
- Node.js / Express.js
- MongoDB
- Firebase Admin SDK (token verification)
- JSON Web Tokens (JWT)

## How Authentication Works

1. User logs in via Firebase Authentication on the client.
2. Firebase issues an ID token, which is stored and attached to outgoing requests.
3. The backend verifies the Firebase token using the Firebase Admin SDK.
4. A JWT is issued/used for session handling on protected API routes.
5. On the frontend, `AuthContext` and `AuthProvider` track the logged-in user, and `PrivateRoute` components guard pages that require authentication.

## Getting Started

### Prerequisites

- Node.js installed
- A MongoDB database (local or Atlas)
- A Firebase project with a service account key

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/your-username/smart-deals.git
   cd smart-deals
   ```

2. Install dependencies for both client and server

   ```bash
   cd client
   npm install

   cd ../server
   npm install
   ```

3. Set up environment variables (see below)

4. Run the development servers

   ```bash
   # In /server
   npm run dev

   # In /client
   npm run dev
   ```

### Environment Variables

**Client (`client/.env`)**

```
VITE_API_URL=your_backend_url
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

**Server (`server/.env`)**

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FIREBASE_SERVICE_ACCOUNT_KEY=your_firebase_service_account_json
```

## Future Improvements

- Payment integration
- Real-time bid notifications
- Product categories and search filters
- User ratings and reviews

## License

This project is open source and available under the [MIT License](LICENSE)."# Smart-Deals-FullStack-Project" 
