![Uniposts](http://uniposts.co.uk/images/logo.png)

# A MEAN stack app for searching higher education IT jobs



A MEAN stack app for searching higher education IT jobs in the UK, the app allow users to create an account and shortlist jobs posted. Uniposts searches university HR website for I.T. jobs nightly.

### [App Demo](http://uniposts.co.uk/#/)
 ###
## technical overview

Node does the bulk of the work on the server side - web server, RESTful API, job scraping, DOM traversal and parsing, authentication, importing into MongoDB, 
Angular provides a nice reactive frontend with services which access the node API routes.
MongoDB stores jobs and Mongoose provided a nice ORM for search and paging etc.. - no heavy duty relational DB needed!

## Requirements

- [NodeJS, MongoDB and NPM](http://nodejs.org)

## Installation

1. Clone the repository: `git clone https://ptutty@bitbucket.org/ptutty/gizzajob.git`
2. Install the application and dependencies: `npm install`
3. setup mongoDB on your VM or use a SAAS plaform and setup a free account on modulusmongo.net
5. create a .env file at root of the project and add your monogoDB location:
MONGO_HOST = '<your MONGODB location i.e. mongodb://username@apollo.modulusmongo.net'
6. Start the server: `node server.js` or use PM2 to demonise.
7. View in browser at `http://localhost:8080`

## About Uniposts

Uniposts started as a way for me to learn more about programming in a asynchronous environment and to learn a little bit more about NodeJS. Feel free to fork or contribute to this project. I'd love to here your feedback and questions.