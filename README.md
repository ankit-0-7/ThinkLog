# ThinkLog - A Full-Stack MERN Blog Platform 🚀

ThinkLog is a modern, feature-rich blogging application built from the ground up with the MERN stack (MongoDB, Express.js, React, Node.js). It allows users to register, create, manage, and share their thoughts with the world.

![ThinkLog Demo GIF](<#placeholder-for-your-gif-url#>)

---

## ✨ Key Features

Here's what you can do on ThinkLog right now:

-   ✅ **User Authentication:** Secure user registration and login functionality using JWT.
-   ✅ **CRUD for Posts:** Logged-in users can **C**reate, **R**ead, **U**pdate, and **D**elete their own blog posts.
-   ✅ **Authorization:** Users can only edit or delete the posts they have created.
-   ✅ **Modern UI:** A sleek, responsive, and aesthetic user interface with a dark theme.
-   ✅ **Modal-based Auth:** A seamless user experience with pop-up modals for login and registration.

---

## 🛠️ Tech Stack

This project is built with the following technologies:

-   **Frontend:** React, React Router, Axios
-   **Backend:** Node.js, Express.js
-   **Database:** MongoDB with Mongoose
-   **Authentication:** JSON Web Tokens (JWT), bcrypt.js
-   **Styling:** Pure CSS with a modern, responsive design

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have Node.js and npm installed on your machine.
-   npm
    ```sh
    npm install npm@latest -g
    ```

### Installation

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    ```
2.  **Navigate to the backend and install dependencies:**
    ```sh
    cd backend
    npm install
    ```
3.  **Navigate to the frontend and install dependencies:**
    ```sh
    cd ../frontend
    npm install
    ```

### Environment Variables

You'll need to create a `.env` file in the `backend` directory and add the following variables:

MONGO_URI = "your_mongodb_uri_here"
JWT_SECRET = "your_super_secret_jwt_key"
PORT = 5000


### Running the Application

1.  **Run the backend server:** (from the `/backend` directory)
    ```sh
    npm run server
    ```
2.  **Run the frontend client:** (from the `/frontend` directory)
    ```sh
    npm run dev
    ```

---

## 🗺️ API Endpoints

The following API routes have been implemented:

| Method | Endpoint             | Access  | Description                        |
| :----- | :------------------- | :------ | :--------------------------------- |
| `POST` | `/api/users/register`| Public  | Register a new user.               |
| `POST` | `/api/users/login`   | Public  | Authenticate a user and get a token. |
| `GET`  | `/api/posts`         | Public  | Get all blog posts.                |
| `POST` | `/api/posts`         | Private | Create a new blog post.            |
| `GET`  | `/api/posts/:id`     | Public  | Get a single post by its ID.       |
| `PUT`  | `/api/posts/:id`     | Private | Update a post owned by the user.   |
| `DELETE`|`/api/posts/:id`     | Private | Delete a post owned by the user.   |


---

## 🛤️ Roadmap / Future Features

This project is actively being developed. Here are some of the features planned for the future:

-   [ ] Add a commenting system for posts.
-   [ ] Create user profile pages.
-   [ ] Implement post categories and tags for filtering.
-   [ ] Add file uploads for post cover images.
-   [ ] Implement a rich text editor (like Quill.js) for post creation.
-   [ ] Full-text search functionality for posts.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📧 Contact

Your Name - [Link to your GitHub Profile](<#your-github-profile-url#>)

Project Link: [https://github.com/your-username/your-repo-name](https://github.com/your-username/your-repo-name)

