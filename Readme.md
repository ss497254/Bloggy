# MERN Stack Blogging Website

## View live App

Hosted at **https://bloggy-it.herokuapp.com** (sorry unavailable)

## About

Bloggy is a platform to Publish your Feeling, Ideas, Experience to Public.
You can create and find unique and beautiful blogs here.

## Tech Stack Used

- [MongoDB](https://docs.mongodb.com/) - Document database - to store data as JSON
- [Express.js](https://devdocs.io/express/) - Back-end web application framework running on top of Node.js
- [React](https://reactjs.org/docs/) - Front-end web app framework used
- [Node.js](https://nodejs.org/en/docs/) - JavaScript runtime environment

### Setting up App

## Env Variables

Make Sure to Create a dev.end file in ./config directory and add appropriate variables in order to use the app.

**Essential Variables**

JWT_SECRET  
DB_USERNAME  
DB_PASSWORD  
DB_HOST  
DB_NAME  
MODE  
TIMEDIFF (optional)

**Starting the App**
You can run Frontend and backend seperately for development.

1. First Install the Dependencies by running command :

```(bash)
npm install
```

2. Type the following command to start the server on your localhost at Port 8000

```(bash)
npm run dev-start
```

3. Type the following command to get the client running on your localhost at Port 3000

```(bash)
npm run client
```
