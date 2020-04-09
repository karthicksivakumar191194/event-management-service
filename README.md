# Event Management System

### INTRODUCTION
Rest API for Event Management System.

### MODULES
- **Authentication**(JWT)
	- Login
	- Regenerate Auth Token(Using Access & Refresh Token)
	- Get User Details by Access Token
	- Check if valid Access Token is present on the header(Middleware)
- **User Management**
     - List all Users
     - Add User
	 	 - Autogenerate 10 Digit Password
	 	 - Bcrypt User Password
		 - Auto-Email to user with their account info
- **Event Management**
     - List all Events
     - Add Event
	 - Edit Event

### CODE FLOW
- bin\www 
- app.js
- routes.js
- routes\users.js(routes\{module route file})
- controllers\user.js(controllers\{module controller file}) | requires - models\user.js