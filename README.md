# User Management RESTful API
This project is a NodeJS-based RESTful API that provides user registration, login, and access to protected routes. It serves as the back-end for a user management system and utilizes MongoDB for storing user data and authentication information.

## Requirements
* Node.js
* MongoDB

## Installation 

1. Clone the repository.
2. Install dependencies using npm.

   >>> npm install

3. Set up your MongoDB connection string, port and jwt secret in a .env file in the project' root directory.
 ***Bold and Italics***
 MONGO_URI = yourmongoconnectionstring
***Bold and Italics***
 PORT = Your port number
***Bold and Italics***
 JWT_SECRET= Yourjwtsecret 

Start the server.

  npm start

## Endpoints
  * User Registration
    POST /api/users/signup 

    Request Body:
    ```json
    {
     "username": "your_username",
     "password": "your_password"
    }
    ```
    Response:
    ```json
    {
     "message": "User successfully created!"
    }
    ```
  * User Login
    POST /api/login

    Request Body:
    ```json
    {
    "username": "your_username",
    "password": "your_password"
    }
    ```

    Response:
    ```json
    {
    "Message": "User logged in successfully"
    }
    ```

  * Protected Route - Dashboard
    GET /api/users/dashboard

    Request Header:
    ```json
      {
      "Authorization": "Bearer your_jwt_token"
      }
      ```
      Response:
      ```json
        {
        "message": "Welcome to your dashboard, [username]!"
        }
        ```
## Error Handling
In case of any issues, the API provides informative error messages:

* 400 Bad Request: When the request body is invalid.
* 401 Unauthorized: When login credentials are incorrect.
* 404 Not Found: When accessing an invalid route.
* 500 Internal Server Error: In case of database errors.
                
## Authentication Middleware
The API uses an authentication middleware to verify the provided authentication token for protected routes.

## Tech Stack
  * Node.js
  * Express.js
  * MongoDB (or other NoSQL databases)
              