# API STATUS CODES
### Successful responses:
- **200 OK**
The request has succeeded. 
- **201 Created**
The request has succeeded and a new resource has been created as a result. This is typically the response sent after POST requests, or some PUT requests.
### Client error responses
- **400 Bad Request**
The server could not understand the request due to invalid syntax.
- **401 Unauthorized**
Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response.
- **404 Not Found**
The server can not find the requested resource. In the browser, this means the URL is not recognized. In an API, this can also mean that the endpoint is valid but the resource itself does not exist. 
### Server error responses
- **500 Internal Server Error**
The server has encountered a situation it doesn't know how to handle.

# ERROR CODES
### Client error codes
- **4001**
Error(Single Line Error)
- **4002**
Field Erorrs(Error with field names)