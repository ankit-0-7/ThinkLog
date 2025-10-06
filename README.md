Of course. Here is the updated `README.md` file with the **Commenting System** and **Full-Text Search** features added to your "Key Features" list and removed from the "Roadmap."

-----

## Updated `README.md`

Copy and paste this entire block of code into your `README.md` file.

````markdown
# ThinkLog - A Full-Stack MERN Blog Platform 🚀

ThinkLog is a modern, feature-rich blogging application built from the ground up with the MERN stack (MongoDB, Express.js, React, Node.js). It allows users to register, create, manage, and engage with content through a dynamic and personalized user experience.

![ThinkLog Demo GIF](<#placeholder-for-your-new-gif-url#>)

---

## ✨ Key Features

-   ✅ **Full-Stack CRUD:** Users can **C**reate, **R**ead, **U**pdate, and **D**elete their own blog posts.
-   ✅ **Secure Authentication:** Modal-based user registration and login with secure password hashing (`bcrypt`) and JSON Web Token (JWT) authorization.
-   ✅ **Content Discovery:**
    -   **Full-Text Search:** Instantly find posts by keywords in the title or content, powered by a MongoDB text index.
    -   **Author Pages:** Click on an author's name to view all of their posts on a dedicated page.
-   ✅ **User Engagement:**
    -   **Commenting System:** Logged-in users can add and view comments on posts.
    -   **Liking System:** Users can like and unlike posts.
    -   **Comment Count:** Homepage previews show the number of comments on each post.
-   ✅ **Personalization:**
    -   **Content Recommendation Engine:** A content-based system suggests posts to logged-in users based on the genres of posts they have liked.
    -   **Dark/Light Mode Toggle:** A persistent theme switcher for user comfort, built with React Context and CSS Variables.
-   ✅ **Modern UI/UX:** A sleek, responsive, and aesthetic user interface with smooth transitions and a professional look and feel.

---

## 🛠️ Tech Stack

-   **Frontend:** React, React Router, Axios, Vite
-   **Backend:** Node.js, Express.js
-   **Database:** MongoDB with Mongoose
-   **Authentication:** JSON Web Tokens (JWT), bcrypt.js
-   **Styling:** Pure CSS with CSS Variables for dynamic theming.

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites
Make sure you have Node.js and npm installed on your machine.
```sh
npm install npm@latest -g
````

### Installation

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/ankit-0-7/ThinkLog.git](https://github.com/ankit-0-7/ThinkLog.git)
    ```
2.  **Navigate to the backend and install dependencies:**
    ```sh
    cd ThinkLog/backend
    npm install
    ```
3.  **Navigate to the frontend and install dependencies:**
    ```sh
    cd ../frontend
    npm install
    ```

### Environment Variables

You'll need to create a `.env` file in the `backend` directory and add the following variables:

```
MONGO_URI="your_mongodb_uri_here"
JWT_SECRET="your_super_secret_jwt_key"
PORT=5000
```

### Running the Application

1.  **Run the backend server:** (from the `/backend` directory)
    ```sh
    npm run server
    ```
2.  **Run the frontend client:** (from the `/frontend` directory)
    ```sh
    npm run dev
    ```

-----

## 🗺️ API Endpoints

| Method   | Endpoint                         | Access  | Description                                 |
| :------- | :------------------------------- | :------ | :------------------------------------------ |
| **POST** | `/api/users/register`            | Public  | Register a new user.                        |
| **POST** | `/api/users/login`               | Public  | Authenticate a user and get a token.        |
| **GET** | `/api/posts`                     | Public  | Get all blog posts.                         |
| **POST** | `/api/posts`                     | Private | Create a new blog post.                     |
| **GET** | `/api/posts/search`              | Public  | Search posts by a query string (`?q=...`).  |
| **GET** | `/api/posts/recommendations`     | Private | Get personalized post recommendations.      |
| **GET** | `/api/posts/user/:userId`        | Public  | Get all posts by a specific user.           |
| **GET** | `/api/posts/:id`                 | Public  | Get a single post by its ID.                |
| **PUT** | `/api/posts/:id`                 | Private | Update a post owned by the user.            |
| **DELETE**| `/api/posts/:id`                | Private | Delete a post owned by the user.            |
| **PUT** | `/api/posts/:id/like`            | Private | Like or unlike a specific post.             |
| **POST** | `/api/comments`                  | Private | Create a new comment.                       |
| **GET** | `/api/comments/post/:postId`     | Public  | Get all comments for a specific post.       |

-----

## 🛤️ Roadmap / Future Features

This project is actively being developed. Here are some of the features planned for the future:

  - [ ] Create user profile pages.
  - [ ] Implement post categories and tags for filtering.
  - [ ] Add file uploads for post cover images.
  - [ ] Implement a rich text editor (like Quill.js) for post creation.
  - [ ] Pagination for the homepage to handle many posts.
  - [ ] Notifications for likes and comments.

-----

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📧 Contact

Ankit Sharma - [https://github.com/ankit-0-7](https://github.com/ankit-0-7)

Project Link: [https://github.com/ankit-0-7/ThinkLog.git](https://github.com/ankit-0-7/ThinkLog.git)

```
```
