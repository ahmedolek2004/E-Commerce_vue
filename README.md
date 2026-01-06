
🎓 Final Project
E-Commerce Web Application Using Vue.js and Firebase
Student Name : Ahmed Abdelhlem

Academic Year : 2024 – 2025

Department : Information Technology / Computer Science

Project Type

Final Project

📌 Abstract

This project presents the design and implementation of a modern E-Commerce Web Application using Vue.js (Vue 3) and Firebase. The application aims to provide a scalable, secure, and user-friendly online shopping platform that allows users to browse products, manage a shopping cart, and authenticate securely.

The system is built following modern frontend development practices using component-based architecture and cloud-based backend services. Firebase is used to handle authentication, real-time data storage, and deployment, eliminating the need for a traditional server-side backend.

🎯 Project Objectives

The main objectives of this graduation project are:

Design a modern and responsive e-commerce user interface

Apply Vue 3 Composition API for clean and maintainable code

Implement secure user authentication using Firebase

Store and manage data using Firebase Firestore

Deploy the application using Firebase Hosting

Apply best practices in frontend architecture and project structure

🧠 System Overview

The system consists of three main layers:

Presentation Layer (Frontend)

Built using Vue.js

Handles UI rendering and user interactions

Application Logic Layer

State management

Routing and navigation

Business logic

Backend Services (Firebase)

Authentication

Firestore database

Cloud hosting

🧱 Technology Stack
Technology	Description
Vue.js 3	Frontend framework
Vite	Development & build tool
Firebase Authentication	User authentication
Firebase Firestore	NoSQL real-time database
Firebase Hosting	Cloud deployment
JavaScript (ES6)	Programming language
HTML5 & CSS3	User interface
📂 Project Structure
E-Commerce_vue/
│
├── public/
│   └── index.html
│
├── src/
│   ├── assets/               # Images and static files
│   ├── components/           # Reusable UI components
│   ├── views/                # Application pages
│   ├── router/               # Routing configuration
│   ├── firebase/             # Firebase setup
│   ├── App.vue               # Root component
│   └── main.js               # Entry point
│
├── package.json
├── vite.config.js
└── README.md

⚙️ System Requirements
Hardware Requirements

Any modern computer with internet access

Software Requirements

Node.js (LTS version)

npm or yarn

Modern web browser (Chrome, Firefox)

🚀 Environment Setup
1️⃣ Install Node.js

Download from:
https://nodejs.org/

Verify installation:

node -v
npm -v

2️⃣ Clone the Project
git clone https://github.com/ahmedolek2004/E-Commerce_vue.git
cd E-Commerce_vue

3️⃣ Install Dependencies
npm install

4️⃣ Run Development Server
npm run dev


The application runs at:

http://localhost:5173

🔥 Firebase Configuration
Firebase Services Used

Firebase Authentication

Firebase Firestore

Firebase Hosting

Firebase Setup Steps

Create a Firebase project
https://console.firebase.google.com/

Add a Web App to the project

Enable Email/Password Authentication

Enable Firestore Database

Firebase Initialization File
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE,
  messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)

🔐 Security Considerations

Authentication handled securely by Firebase

Environment variables used to protect sensitive keys

Firestore security rules restrict unauthorized access

🌍 Deployment

The project is deployed using Firebase Hosting.

Deployment Steps
npm run build
firebase login
firebase init
firebase deploy

📊 Testing & Validation

Manual testing for UI functionality

Authentication testing

Firestore CRUD operations testing

Cross-browser compatibility testing

📈 Future Enhancements

Payment gateway integration

Admin dashboard

Product search and filters

Order history

Mobile application version

🧪 Results

The application successfully demonstrates a full e-commerce frontend with secure authentication, real-time database integration, and cloud deployment. The system meets all project objectives and provides a solid foundation for future development.

📚 References

Vue.js Official Documentation
https://vuejs.org/

Vite Official Documentation
https://vitejs.dev/

Firebase Documentation
https://firebase.google.com/docs

Firebase Authentication
https://firebase.google.com/docs/auth

Firebase Firestore
https://firebase.google.com/docs/firestore

Firebase Hosting
https://firebase.google.com/docs/hosting

📝 License

This project is developed for academic purposes as a graduation project.