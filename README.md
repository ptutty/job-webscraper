# Gizza Job App

A Node app built with MongoDB and Angular for searching and managing IT job applications in the Higher education sector.

Node does the bulk of the work on the server side - web server, RESTful API, job scraping, DOM traversal and parsing, authentication, importing into MongoDB, 
Angular provides a nice reactive frontend with services which access the node API routes.
MongoDB stores jobs and Mongoose provided a nice ORM for search and paging etc.. - no heavy duty relational DB needed!

## Requirements

- [Node and npm](http://nodejs.org)

## Installation

1. Clone the repository: `git clone https://ptutty@bitbucket.org/ptutty/gizzajob.git`
2. Install the application and dependencies: `npm install`
3. setup mongoDB on your VM or use a SAAS plaform and setup a free account on modulusmongo.net
5. create a .env file at root of the project and add your monogoDB location:
MONGO_HOST = '<your MONGODB location i.e. mongodb://username@apollo.modulusmongo.net'
6. Start the server: `node server.js` or use PM2 to demonise.
7. View in browser at `http://localhost:8080`



![Job-aholic](http://www.leftfutures.org/wp-content/uploads/2011/09/Gizza-Job-copy-300x214.jpg)
