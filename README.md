### SETUP
clone repo from git
run "npm install" to setup dependencies
set environment "NODE_ENV = local"
update config>constants.js to reflect correct mongodb setup.

# IDE 
- Sublime text

# Sublime Packages
- https://github.com/jdc0589/JsFormat

# App Architecture

## Main 
- Server.js : Main entry point to the server. creates a Hapi server.

## ENV settings
- Config.constants : Defines local constants.
- reads "NODE_ENV" environment variable to decide between prod / QA / local envs.

## Routes
- all routes per entity are defined in this package.
- No business logic in routes.
- look at job.js under routes folder for a simple example.

## Controller
- all controllers are defined here. 
- all bussiness logic goes in controller.
- refer jobs.js under controllers for sample code.
- should include proper error handling / logging 

## Models
- all models are defined here.
- all model names to be singular. Database collection names created by mongoose defaults to plural. e.g model = job , then collection = jobs
- any new model created should be added to db.js

## Utils
- classes to handle sms / push notificaiton  / emails / logging