# KoppaKitsExchange API Documentation

Welcome to the KoppaKitsExchange API documentation. This API provides a comprehensive set of endpoints to facilitate user management, messaging, and item-related functionalities for Nigerian NYSC corp members. Developers can integrate these features seamlessly into their applications to enhance user experiences and streamline interactions within the KoppaExchange platform.

[Visit this link for Postman documentation](https://documenter.getpostman.com/view/25574591/2sA2rCUhQQ)

## Users

Authentication and Account Management
Login: Authenticate users by providing their email and password.
Logout: Securely log users out with Bearer Token authorization.
Get Users By Camp: Retrieve a list of users based on their designated NYSC camp.
Get All Users: Access a comprehensive list of all users.
Signup: Register new users by providing essential details.
Forget Password: Initiate the password recovery process.
Reset Password: Change a user's password securely.
Delete Account: Permanently delete a user account.

## Messages

User Communication
Get User Messages: Retrieve messages for a specific user.
Post User Messages: Send new messages to a user.

## Items

Item Management
Get Items By Camp: Obtain a list of items based on the user's NSYC camp.
Get Items By Status: Filter items by status ['searching' 'pairing' 'paired'].
Create Item: Add a new item to the platform.

Explore the detailed below for each endpoint to effectively integrate KoppaExchange API features into your application. For any inquiries or support, feel free to contact Emmanuel Adeyemi.

---

## Users

### POST - Login

Endpoint: `{{url}}/api/v1/users/login`

This API endpoint facilitates user authentication. It requires a JSON payload containing the user's email and password.

### GET - Logout

Endpoint: `{{url}}/api/v1/users/logout`

Logging out is achieved through this endpoint, requiring Bearer Token authorization and a JSON payload containing the user's email and password.

### GET - Get Users By Camp

Endpoint: `{{url}}/api/v1/users/camp`

Retrieve a list of users based on their designated NYSC camp. Bearer Token authorization is essential for access.

### GET - Get All Users

Endpoint: `{{url}}/api/v1/users`

Access a comprehensive list of all users through this endpoint, mandating Bearer Token authorization.

### POST - Signup

Endpoint: `{{url}}/api/v1/users/signup`

Register a new user by providing a JSON payload containing essential details such as email, name, phone number, NYSC camp, location (coordinates) in format [longitude latitude] and password.

### POST - Forget Password

Endpoint: `{{url}}/api/v1/users/forget-password`

Initiate the password recovery process by submitting the user's email in the JSON payload.

### POST - Reset Password

Endpoint: `{{url}}/api/v1/users/reset-password/bb3d866ddea45a9e266cdc38f709a3dbcb6fc0bf4a743efe669223dc5d461c0e`

Reset a user's password by providing the new password in the JSON payload, this endpoint is gotten via provided email through the forget password endpoint.

### DELETE - Delete Account

Endpoint: `{{url}}/api/v1/users/delete/65d9a19241d97c934100244c`

Delete a user account with Bearer Token authorization, accompanied by the user's password in the JSON payload.

---

## Messages

### GET - Get User Messages

Endpoint: `{{url}}/api/v1/users/65d3dba3498e289a39408a8a/messages`

Retrieve messages for a specific user with Bearer Token authorization, the params is the id of the user which messages will be sent to.

### POST - Post User Messages

Endpoint: `{{url}}/api/v1/users/65d3dba3498e289a39408a8a/messages`

Post a new message for a user with Bearer Token authorization. Include the message content in the JSON payload.

---

## Items

### GET - Get Items By Camp

Endpoint: `{{url}}/api/v1/items/camp`

Obtain a list of items based on the user's camp. Bearer Token authorization is required.

### POST - Get Items By Status

Endpoint: `{{url}}/api/v1/items/status`

Filter items by status with Bearer Token authorization. Provide the desired status in the JSON payload. The desired status are ['searching' 'pairing' 'paired']

### POST - Create Item

Endpoint: `{{url}}/api/v1/items`

Create a new item with Bearer Token authorization. Ensure all necessary details are included in the request. If clothing, the query string for clothing_size and wanted_clothing_size will be of type String and enum of ['small', 'medium', 'large', 'extra-large'] while the query string for shoe_size and wanted_clothing_size will be of type Number.
