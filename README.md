# Loquiz Test Task

Test task for the TypeScript developer candidate in Loquiz

Task:
Exercise: use the Loquiz API to create a results page with a web framework of your choice using TypeScript.

- refer to the API documentation at https://api.loquiz.com/v3/docs/
- your Authorization header is "ApiKey-v1 d64642249a14413ac83fdf40b57192b7be1bfb715a3e74519e279b3ee5eaf426", do not worry about exposing it
- show results for the game with id "FK5TS3QAB"
- display at least the game title and every team's name, odometer, playtime and totalScore

Project is built with TypeScript using React as frontEnd framework.

## Project setup
```
npm install
npm install --only=dev
```

### Build project
```
npm run build:server
npm run build:client
```

### Run project
```
npm start
```
