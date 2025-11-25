🧩 Employee & User Management API

A Node.js RESTful API built with Express and MongoDB (Mongoose) that manages users and employees.
Features include secure user authentication (with hashed passwords), employee CRUD operations, and validation using express-validator.


🚀 Getting Started

1️⃣ Clone the repository

git clone https://github.com/nhunique/101429112_COMP3123_Assignment1.git

cd 101429112_COMP3123_Assignment1

2️⃣ Install dependencies

npm install

3️⃣ Create Environment Variables

Create a .env file in the root directory (same folder as index.js):

touch .env


Then open .env and add:

PORT=8081

DB_CONNECTION_STRING=mongodb+srv://admin:admin@cluster0.md0sx7e.mongodb.net/comp3123_assigment1?retryWrites=true&w=majority&appName=Cluster0



4️⃣ Run the server

Development mode (auto reload with nodemon)

npm run dev

Production mode

npm start


If successful, the server will start at:

http://localhost:8081/




🧾 Available API Routes

<u>User Routes</u>
<table> <thead> <tr> <th>Method</th> <th>Endpoint</th> <th>Description</th> <th>Status</th> </tr> </thead> <tbody> <tr> <td><code>POST</code></td> <td><code>/api/v1/user/signup</code></td> <td>Create new user (password is hashed)</td> <td>201</td> </tr> <tr> <td><code>POST</code></td> <td><code>/api/v1/user/login</code></td> <td>Login using username/email + password</td> <td>200</td> </tr> </tbody> </table>

<u>Employee Routes</u>
<table> <thead> <tr> <th>Method</th> <th>Endpoint</th> <th>Description</th> <th>Status</th> </tr> </thead> <tbody> <tr> <td><code>GET</code></td> <td><code>/api/v1/emp/employees</code></td> <td>Get all employees</td> <td>200</td> </tr> <tr> <td><code>POST</code></td> <td><code>/api/v1/emp/employees</code></td> <td>Create a new employee</td> <td>201</td> </tr> <tr> <td><code>GET</code></td> <td><code>/api/v1/emp/employees/:eid</code></td> <td>Get an employee by ID</td> <td>200</td> </tr> <tr> <td><code>PUT</code></td> <td><code>/api/v1/emp/employees/:eid</code></td> <td>Update an employee by ID</td> <td>200</td> </tr> <tr> <td><code>DELETE</code></td> <td><code>/api/v1/emp/employees?eid=xxx</code></td> <td>Delete employee by ID (query param)</td> <td>204</td> </tr> </tbody> </table>

🧰 Tech Stack

Node.js – JavaScript runtime

Express.js – Web framework

Mongoose – MongoDB ODM

bcrypt – Password hashing

express-validator – Request validation

dotenv – Manage environment variables

🔒 Security Notes

All passwords are hashed before saving using bcrypt.

Database credentials are securely stored in .env.

Do not log or expose sensitive user data in responses.

⚠️ Error Handling

Uses centralized Express error middleware.

Returns standard HTTP status codes (e.g., 400, 404, 500).

Logs errors to the console for debugging.