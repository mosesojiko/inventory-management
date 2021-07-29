
# Inventory Management App (Backend)
## Documentation

## Signup Route
http://127.0.0.1:5000/user/signup
### Description:
Using the post method, this endpoint creates a user with name, email, and password as input fields. Thess fields are required.
**Note that all these endpoint were tested using postman**

## Login Route
http://127.0.0.1:5000/user/login
### Description:
This endpoint is used to login a user. Only the user email and password is required, and only registered users can login. Upon login, a token is generated. Only a user with a token can update or delete his data. Method used is post.

## Get all users
http://127.0.0.1:5000/user
### Description:
This router returns all registered users in the database using the get method. 

## Get a user by id
http://127.0.0.1:5000/user/id
### Example usage
http://127.0.0.1:5000/user/610282222e80d00c300aecfd
### Description:
This route gets a specific user using the user ID. The ID is passed into the route as a parameter.The get method is used here.

## Update a user
http://127.0.0.1:5000/user/update/id
### Example usage
http://127.0.0.1:5000/user/update/610282222e80d00c300aecfd
### Description:
This route is used to update/modify a user information. Use the put method to update. To update, one need to pass in the user id as a parameter to the route. In the input fields, type in the new user information. This is a protected route therefore, the user token generated when the user logged-In, need to be added in the request header.

## Delete a user
http://127.0.0.1:5000/user/delete/id
### Example usage
http://127.0.0.1:5000/user/delete/610282222e80d00c300aecfd
## Description:
This endpoint deletes a user. The last part of the url above is the id. Since it is a protected route, the user token generated during signin needs to be passed in the request header.

## Route to create a product
http://127.0.0.1:5000/products
**Note that only registered users can create and modify their products**
###Description:
This is a protected endpoint. For a user to create a product, he will first create and account, log-in to his account, and then create products. Since, it is a protected route, he cannot create product without his log-in token which was generated during log-in.

## Get a single product by a user
http://127.0.0.1:5000/products
### Example usage
http://127.0.0.1:5000/products/61029b05a30d4c1e985ca6f5
### Description:
This get method is used to get a single product by using the product Id. It is also a protected endpoint.

## Update a product
http://127.0.0.1:5000/products/update/id
### Example usage
http://127.0.0.1:5000/products/update/61029b05a30d4c1e985ca6f5
### Description:
This endpoint is used to update a user specified product using the product ID. In the body, enter the new product information. Remenber to use the login-token since it is a protected route.

## Delete a product
http://127.0.0.1:5000/products/delete/id
### Example usage
http://127.0.0.1:5000/products/delete/61029b05a30d4c1e985ca6f5
Description:
This endpoint deletes a particular product from the database using the product ID.

## Get all products by a user
http://127.0.0.1:5000/products/all
##Descripttion:
This endpoint returns all products posted by a user. It is a protected route.

