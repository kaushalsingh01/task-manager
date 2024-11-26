# Task Manager App

This is a Task Manager application built using React, Firebase, and Bootstrap. The app allows users to manage their tasks by creating, updating, and deleting them. It uses Firebase for authentication and Firestore as the database to store tasks.

## Features:
- User authentication using Firebase Authentication (Test Login: admin@email.com password: admin1234).
- Add, update, and delete tasks.
- Real-time task updates synced with Firestore.
- Search functionality to filter tasks by title and description.
- Bootstrap-based responsive UI.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js (version 14 or later) installed on your system.
- A Firebase project with Firestore and Firebase Authentication enabled.

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/task-manager-app.git
cd task-manager-app
```

### 2. Install Dependencies

Run the following command to install the required dependencies:

```bash
npm install
```

### 3. Set Up Firebase Project

1. **Create a Firebase Project**:
   - Go to the [Firebase Console](https://console.firebase.google.com/).
   - Click on **"Add project"** and follow the steps to create a new Firebase project.

2. **Enable Firebase Authentication**:
   - In the Firebase console, navigate to **Authentication** > **Sign-in method**.
   - Enable the desired authentication methods (e.g., Email/Password).

3. **Enable Firestore Database**:
   - In the Firebase console, navigate to **Firestore Database**.
   - Click on **Create database**, and choose **Start in test mode** for easy access (don't forget to secure the database later).

4. **Get Firebase Credentials**:
   - In the Firebase console, navigate to **Project settings** > **General**.
   - Under **Your apps**, select the **Web** icon.
   - Copy the Firebase config object that looks like this:

     ```js
     const firebaseConfig = {
       apiKey: "your-api-key",
       authDomain: "your-auth-domain",
       projectId: "your-project-id",
       storageBucket: "your-storage-bucket",
       messagingSenderId: "your-messaging-sender-id",
       appId: "your-app-id",
       measurementId: "your-measurement-id"
     };
     ```

### 4. Add Firebase Configuration to Your Project

1. Open the `firebaseConfig.js` file located in the `src` folder.
2. Replace the placeholder values with your Firebase project's credentials that you copied from the Firebase console:

```javascript
// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id",
  measurementId: "your-measurement-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
```

### 5. Start the Application

Once the Firebase setup is complete, you can run the app locally with:

```bash
npm start
```

This will start the development server, and you should be able to view the app at `http://localhost:3000`.

## About the Project

The Task Manager app is designed to help users stay organized by allowing them to manage their tasks efficiently. It integrates with Firebase for user authentication and Firestore for data storage. The app is designed with simplicity and functionality in mind, offering a clean and user-friendly interface using Bootstrap.

### Technologies Used:
- **Frontend**: React.js, React-Bootstrap
- **Backend**: Firebase (Authentication, Firestore)
- **Styling**: Bootstrap 5

## Firebase Features Used:
- **Firebase Authentication**: For user authentication (supports Email/Password sign-in).
- **Firestore**: NoSQL cloud database for storing tasks.

## Contributing

If you'd like to contribute to this project, feel free to fork the repository and submit a pull request. Any improvements, bug fixes, or feature requests are welcome.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

### Key Points:
- **Firebase Setup**: It explains how to set up a Firebase project, enable Authentication, Firestore, and retrieve credentials.
- **Install and Configure**: It guides the user on how to install dependencies and configure Firebase credentials in the app.
- **Running the App**: It provides steps to run the application locally after setting up Firebase.

Feel free to modify any sections based on your project's specific needs.