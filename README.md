# REST API

Example of Rest Api using Node Js with Typescript and MongoDB.

## Table of contents
* [Introduction - The Project's Aim](#introduction)
* [Main Technologies](#technologies)
* [Extra Libraries](#libraries)
* [Setup](#setup)
* [Launch](#launch)

## Introduction - The Project's Aim

It's a simple REST API that allows you to do basic operations of CRUD of an entity and it handles errors showing them on the response in case that something is wrong.

## Main Technologies:

- Node Js
- Express Js
- Typescript
- Mongo DB

## Extra Libraries:

- Moment
- Nodemon

## Setup:

After running the project, install it locally using npm:

```
  npm install  
```

Then, create a copy of .env.sample, rename it to .env and open to modify it:

```
  PORT (port where the app will run)

  MONGO_URL
```

Finally, run the script for creating tables in the schema that you just created.

## Launch:

To run this project, use this command:

```
  npm start
```