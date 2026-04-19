🚀 DevTinder Backend

A scalable backend for a developer networking platform that enables users to discover developers, send connection requests, and manage professional connections seamlessly. The project follows a modular architecture with secure authentication and optimized database handling.

🧠 Overview

DevTinder is inspired by modern networking platforms where developers can connect, collaborate, and build meaningful professional relationships. It provides core features like authentication, profile management, connection workflows, and feed generation.

🛠️ Tech Stack
Backend: Node.js, Express.js
Database: MongoDB
ODM: Mongoose
Authentication: JWT (JSON Web Tokens)
API Testing: Postman
⚙️ Features
🔐 Authentication & Authorization
JWT-based authentication
Secure cookie handling
Protected routes using middleware
👤 User Profile Management
Create, update, and view developer profiles
Manage personal and professional details
🤝 Connection System
Send, accept, and reject connection requests
Maintain professional network
📰 Developer Feed
Dynamic feed generation based on connections
Efficient data querying and pagination
🗄️ Database Optimization
Well-structured MongoDB schemas
Efficient querying and data population using Mongoose
📂 Project Structure
src/
│── controllers/     # Business logic
│── models/          # Mongoose schemas
│── routes/          # API routes
│── middleware/      # Auth & error handling
│── config/          # DB and environment configs
│── utils/           # Helper functions
🔌 API Endpoints (Sample)
Method	Endpoint	Description
POST	/signup	Register user
POST	/login	Authenticate user
GET	/profile	Get user profile
POST	/connect	Send connection request
GET	/feed	Get developer feed
🚀 Installation & Setup
# Clone the repo
git clone https://github.com/Ashutoshwizz/devtinder.git

# Navigate to backend folder
cd devtinder

# Install dependencies
npm install

# Run the server
npm run dev
🔐 Authentication Flow
User logs in/signup
Server validates credentials
JWT token is generated
Token stored securely in cookies
Middleware verifies token for protected routes
📈 Future Improvements
Real-time chat (WebSockets)
Recommendation system
Advanced filtering & search
Deployment with Docker & CI/CD
🤝 Contributing

Contributions are welcome! Feel free to fork the repo and submit a pull request.

📧 Contact

Ashutosh Yadav

GitHub: https://github.com/Ashutoshwizz
