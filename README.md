# Server-Client-Setup-Authentication
'server-authentication' is build for server side authentication

![alt text](https://github.com/QilongMa/Server-Client-Setup-Authentication/blob/master/diagram%20flow.PNG)

When signup, eamil if not in use, we will create a jwt token.
When signin, passport is used to create local strategy, and find a match with credentials provided by user in DB.
After user is verified, a jwt is assgined to him.
When user come back to the app, to make an auth'd request with the token, we verify the correctness of the token.
It's made by jwt, a plugin from passport library. And have access to restricted resource.
