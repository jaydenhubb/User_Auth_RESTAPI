# User Management RESTful API
This project is a NodeJS-based RESTful API that provides user registration, login, and access to protected routes. It serves as the back-end for a user management system and utilizes MongoDB for storing user data and authentication information.

## Requirements
* Node.js
* MongoDB

## Installation 

1. Clone the repository.
2. Install dependencies using npm or yarn.

   - npm install
        Or 
   - yarn add 

3. Set up your MongoDB connection string, port and jwt secret in a .env file in the project's root directory.

  * **MONGO_URI = yourmongoconnectionstring**
  * **PORT = Your port number**
  * **JWT_SECRET= Yourjwtsecret**

4. Start the server.
  **npm run dev**

## Endpoints
  * Home Page 
    GET https://user-auth-ccpg.onrender.com/api/home 

    Response Body:
    ```json
    "Welcome to my page"
    ```

  * User Registration
    POST https://user-auth-ccpg.onrender.com/api/users/signup 

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
    POST https://user-auth-ccpg.onrender.com/api/users/login

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
    GET https://user-auth-ccpg.onrender.com/api/users/dashboard

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
The API uses jsonwebtoken authentication middleware to verify users visiting protected routes.
## Test
To test the login and signup route 
  - run ***npm run test***

## Tech Stack
  * Node.js
  * Express.js
  * MongoDB
  * Jest and Supertest 

## Live url
While testing the live Url using POSTMAN, Insomnia or any other testing tool, after sending each request, response might take a little while. This is because I am using a free tier cloud hosting service. But rest assured you will get a response. 

              