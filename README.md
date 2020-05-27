# Project Overview
This is a web application for portable meters where you can convert `clean excel file` to `project.xml`. You can also read individual CT files, compare them visually, and create CT sets for a job. This project uses `Nodejs` for the backend and `React` for the frontend. 

### Prerequisites:
- You should have [Nodejs](https://nodejs.org/en/) installed on your machine.
- You need a `Google service account` for this app. So that you can share files via google drive.
- You need google service account `Private key` downloaded with you.

### Steps to run the project:
- Clone this git repository using `git clone` command.
- cd into the directory using `cd <repository directory>`.
- Install all the dependencies using `npm install`.
- Place google service account private key in the `etc/` directory with name `config.json`. 
  - Follow instructions in `etc/ConfigReadme.md` to create `config.json` file.
- Build the project using `npm run-script build`.
- Start the application using `npm start`.
- Open your browser at `http://localhost:3030/`.
