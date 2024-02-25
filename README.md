# REST api for Job Listings

This is a project created as a backend RESTful API with Node, Express, MongoDB for managing job listings and users. The system allows users to view job listings, apply for jobs, and interact with other users by liking them to increase their points.

this project essentially consists of 2 basic api's . One for user related operations and other for job related operations

## Table of Contents

- [Environment Variables](#Environment)
- [Structure](#Structure)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Environment

- MONGODB_URL= xxxxxxxxxxxx , you can get your mongo db atlas free database from [cloud.mongodb.com](cloud.mongodb.com)

- secretKey=Anish_Reddy , you can change this key as per your wish, this is used to sign the jwt tokens before sending to client and decode the user info when you get it from the user, it is used for a secure session management between uer and client

- PORT = 4000 , this is used to stating the port on which you want the server to run

## Structure

In this section , the basic structure of the project is explained in this section

index.js is the root page in our project where our server is initialised and database is connected, from here we further move to / and use modules from other directories within the project

The models / Schema for the data base is defined in the models folder. There are 2 models used here, that is user and jobListing

### User Schema

|-- name
|-- password
|-- email: (unique)
| |-- Validation: Email format using regular expression
|-- points: Array of ObjectIds
|-- points_count
|-- githubLink
|-- role: (enum: ["admin", "user"], default: "user")

### Job Listing Schema

|-- date: Date (default: present data)
|-- link
|-- title
|-- usersApplied: Array of User ObjectIds
|-- postedBy: ObjectId of User

A middleware is set up inside the middleware folder, this is used to act as a middleware in all the routes that it is used, it checks for the Authorise Header in the request, decodes it with the secret key , if it validates the token only then it send the user to the route they desire

### routes

inside routes folder we have the routes for api-1 and api-2

#### structure for api-1

API-1
|-- auth
| |-- login
| |-- register
|-- likes
| |-- getusers (ordered by desending count of points)
| |-- like/unlike
|-- user
|-- CRUD operations for user

a router is present in each of the sub-directories for efficient handling of its own routes

#### structure for api-2

API-2
|-- jobs
| |-- apply
| | |-- apply (to apply or callback application for a job)
|-- |-- CRUD
| | |-- create Job
| | |-- delete Job
| | |-- update Job
| | |-- get Job
| |-- getJobs (get all jobs)
| |  
| |-- job router( to handle all job routes)

## Usage / API DOCCUMENTATION

This section will show how to use each of the routes

### API 1

#### Login

- **URL:** `/api/auth/login`
- **Method:** POST
- **Description:** Endpoint for user authentication.
- **Request Body:**
  ```json
  {
    "email": "anish@example.com",
    "password": "anish"
  }
  ```

#### Register

- **URL:** `/api/auth/register`
- **Method:** POST
- **Description:** Endpoint for user registration.
- **Request Body:**
  ```json
  {
    "email": "anish@example.com",
    "password": "anish",
    "name": "anish",
    "githubLink": "github.com/anish"
  }
  ```

**NOTE** - you will get a jwt token as a response for login and register , this is needed to access other routes

#### Get Users (Not protected)

- **URL:** `/like/users`
- **Method:** GET
- **Description:** Endpoint to get all users sorted in descending order of points.

#### Like

- **URL:** `/like/:id`
- **Method:** POST
- **Description:** Endpoint to like or un-like a user.

#### Delete

- **URL:** `/user/delete`
- **Method:** DELETE
- **Description:** Endpoint to delete current user.

#### Update

- **URL:** `/user/update`
- **Method:** PATCH
- **Description:** Endpoint for updating user details.
- **Request Body:**
  ```json
  {
    "email": "anish@example.com",
    "password": "anish",
    "name": "anish1",
    "githubLink": "anish,com"
  }
  ```

### API 1

#### Get Jobs (Not Protected)

- **URL:** `/job`
- **Method:** GET
- **Description:** Endpoint to get all Jobs.

#### Create Job

- **URL:** `/job`
- **Method:** POST
- **Description:** Endpoint for job creation.
- **Request Body:**
  ```json
  {
    "title": "senior engineer",
    "link": "anish.com"
  }
  ```

#### Update Job

- **URL:** `/job/:id`
- **Method:** PATCH
- **Description:** Endpoint for job updation.
- **Request Body:**
  ```json
  {
    "title": "senior engineer1",
    "link": "anish1.com"
  }
  ```

#### Delete Job

- **URL:** `/job/:id`
- **Method:** DELETE
- **Description:** Endpoint for job deletion.

#### Get Job Deets

- **URL:** `/job/:id`
- **Method:** GET
- **Description:** Endpoint for retreiveing indivisual job details.

#### Apply to a job

- **URL:** `/job/:id`
- **Method:** POST
- **Description:** Endpoint for applying/revoking application to a job.
