
# Task Management App

This is a simple task management app created using Nextjs and tailwind css for frontend and nodejs & expressjs for backend  and mysql for database.


# Frontend setup instruction:


1. Goto the Frontend folder.
2. Create a .env file there and copy .env.example.frontend to the .env
3. Run npm install for installing packages.
4. Run npm run dev for running the project

# Backend setup instruction:


1. Goto the Backend folder.
2. Create a .env file there and copy .env.example.backend to the .env
3. You need to install mysql in your system.
3. Run npm install for installing packages.
4. Run npm run dev for running the project.

# Run Test:
1. Run npm run test

# Api Documentation:

| Api name | Http Method | Autherization | params | body | Response
|----------|----------|----------|----------|----------|----------|
| api/register | POST |  | |{username:string,email:string,password:string} | {status:numner, message:string,   data:Object, error:Object}
| api/login | POST |  | | {email:string,password:string}|{status:numner, message:string,   data:Object, error:Object}
| api/tasks | GET | access token | | |{status:numner, message:string,   data:Object, error:Object}
| api/tasks | POST | access token | | {title:string,description:string}|{status:numner, message:string,   data:Object, error:Object}
| api/tasks/:id | PUT | access token |id | {title?:string,description?:string,status?:boolean}|{status:numner, message:string,   data:Object, error:Object}
| api/tasks/:id | PUT | access token |id | {title?:string,description?:string,status?:boolean}|{status:numner, message:string,   data:Object, error:Object}
