# Manage Contacts Rest API
This project is a backend built with **Node.js** utilizing **MongoDB** for database management and **JWT (JSON Web Tokens)** for authentication. It provides endpoints for managing contacts, including operations such as creating, reading, updating, and deleting contacts.

## Documentation

This documentation provides information about the endpoints and functionalities of the Manage Contacts Rest API.

## Hosted API URL

https://node-js-restapi-jzu4.onrender.com

## User Endpoints

### Register a New User

Registers a new user with the provided username, email, and password.

- **URL**

  `/api/user/register`

- **Method**

  `POST`

- **Access**

  Public

- **Request Body**

  | Parameter | Type   | Description           |
  | --------- | ------ | --------------------- |
  | username  | string | User's username       |
  | email     | string | User's email address  |
  | password  | string | User's password       |

- **Success Response**

  - **Code:** 201 CREATED
    **Content:** `{ "_id": "user_id", "email": "user_email" }`

- **Error Response**

  - **Code:** 401 Unauthorized
    **Content:** `{ "error": "All fields are mandatory" }`

  - **Code:** 400 Bad Request
    **Content:** `{ "error": "User already registered" }`

### Login User

Logs in a user with the provided email and password.

- **URL**

  `/api/user/login`

- **Method**

  `POST`

- **Access**

  Public

- **Request Body**

  | Parameter | Type   | Description         |
  | --------- | ------ | ------------------- |
  | email     | string | User's email        |
  | password  | string | User's password     |

- **Success Response**

  - **Code:** 200 OK
    **Content:** `{ "accessToken": "access_token" }`

- **Error Response**

  - **Code:** 401 Unauthorized
    **Content:** `{ "error": "Email or password not valid" }`

### Get Current Logged In User

Retrieves information about the current logged-in user.

- **URL**

  `/api/user/current`

- **Method**

  `POST`

- **Access**

  Private

- **Success Response**

  - **Code:** 200 OK
    **Content:** `{ "user": { "username": "user_username", "email": "user_email", "id": "user_id" } }`

---

## Additional Notes

- The API responses are in JSON format.
- Authentication is implemented using JSON Web Tokens (JWT).
- Passwords are hashed using bcrypt for security.
- Access to certain endpoints requires authentication.

------

## Contact Endpoints

### Get All Contacts

Retrieves all contacts belonging to the authenticated user.

- **URL**

  `/api/contacts`

- **Method**

  `GET`

- **Access**

  Private

- **Success Response**

  - **Code:** 200 OK
    **Content:** `[ { "name": "contact_name", "email": "contact_email", "phone": "contact_phone", "user_id": "user_id" }, { ... } ]`

### Create Contact

Creates a new contact for the authenticated user.

- **URL**

  `/api/contacts`

- **Method**

  `POST`

- **Access**

  Private

- **Request Body**

  | Parameter | Type   | Description             |
  | --------- | ------ | ----------------------- |
  | name      | string | Contact's name          |
  | email     | string | Contact's email address |
  | phone     | string | Contact's phone number  |

- **Success Response**

  - **Code:** 200 OK
    **Content:** `{ "name": "contact_name", "email": "contact_email", "phone": "contact_phone", "user_id": "user_id" }`

- **Error Response**

  - **Code:** 401 Unauthorized
    **Content:** `{ "error": "All fields are mandatory" }`

  - **Code:** 400 Bad Request
    **Content:** `{ "error": "Email already taken" }`

### Get Contact by ID

Retrieves a specific contact by its ID.

- **URL**

  `/api/contacts/:id`

- **Method**

  `GET`

- **Access**

  Private

- **Success Response**

  - **Code:** 200 OK
    **Content:** `{ "name": "contact_name", "email": "contact_email", "phone": "contact_phone", "user_id": "user_id" }`

- **Error Response**

  - **Code:** 404 Not Found
    **Content:** `{ "error": "Contact not found" }`

  - **Code:** 401 Unauthorized
    **Content:** `{ "error": "User is not authorized" }`

### Delete Contact by ID

Deletes a specific contact by its ID.

- **URL**

  `/api/contacts/:id`

- **Method**

  `DELETE`

- **Access**

  Private

- **Success Response**

  - **Code:** 200 OK
    **Content:** `{ "name": "contact_name", "email": "contact_email", "phone": "contact_phone", "user_id": "user_id" }`

- **Error Response**

  - **Code:** 404 Not Found
    **Content:** `{ "error": "Contact Not Found" }`

  - **Code:** 401 Unauthorized
    **Content:** `{ "error": "User is not authorized" }`

### Update Contact by ID

Updates a specific contact by its ID.

- **URL**

  `/api/contacts/:id`

- **Method**

  `PUT`

- **Access**

  Private

- **Request Body**

  | Parameter | Type   | Description             |
  | --------- | ------ | ----------------------- |
  | name      | string | Updated contact's name  |
  | email     | string | Updated contact's email |
  | phone     | string | Updated contact's phone |

- **Success Response**

  - **Code:** 200 OK
    **Content:** `{ "name": "updated_contact_name", "email": "updated_contact_email", "phone": "updated_contact_phone", "user_id": "user_id" }`

- **Error Response**

  - **Code:** 404 Not Found
    **Content:** `{ "error": "Contact Not Found" }`

  - **Code:** 401 Unauthorized
    **Content:** `{ "error": "User is not authorized" }`

---

## Additional Notes

- The API responses are in JSON format.
- Access to certain endpoints requires authentication.


## Accessing Private Endpoints

To access private endpoints, you need to include an authentication token in the request headers. Follow these steps to correctly access private endpoints:

1. **Log in**: First, log in to obtain an authentication token.

2. **Obtain Authentication Token**: Upon successful login, you will receive an authentication token.

3. **Include Token in Request Headers**: Include the authentication token in the request headers of private endpoint requests. Set the `Authorization` header with the value `Bearer <token>` where `<token>` is the authentication token obtained in step 2.
