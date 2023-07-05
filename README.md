# RCO-Soul

## Description

The purpose of this project is to demonstrate how to run a React admin client using Soul as a REST API service. Soul is an open-source REST API wrapper that exposes an SQLite database to any client.

## Running Soul and the React-admin app locally

1. Install Soul on your local machine globally by running:

   ```
   npm i soul-cli -g
   ```

   NOTE: You might need admin access, so if you are on Mac or Linux, use `sudo`.

2. Go to the root folder of the project and install the npm packages by running:

   ```
   npm install
   ```

3. Copy the environment variables from the `.env.sample` file and modify the variables by running:

   ```
   cp .env.sample .env
   ```

   - `PORT`: the port on which the Soul server runs.
   - `VITE_API_URL`: the API URL of Soul, which should be `http://localhost:<PORT>/api/tables`.

4. Start the Soul server by running:

   ```
   npm run dev:soul
   ```

5. Start your React-admin client in another terminal by running:

   ```
   npm run dev:client
   ```

## Deploying the project to Heroku

You can deploy this project to Heroku. You can use either the Heroku CLI or create a pipeline in Heroku to automatically deploy the project when a commit is pushed to a PR.

### Deploying the project using the Heroku CLI

1. Create a new Heroku app in the Heroku dashboard.
2. Install the Heroku CLI on your local machine.
3. Log in to Heroku from your CLI by running:

   ```
   heroku login
   ```

4. Create a new Heroku Git remote by running the following command:

   ```
   heroku git:remote -a <your-app-name>
   ```

5. Push your code to the Heroku Git remote by running the following command:

   ```
   git push heroku master
   ```

6. Go to the Heroku dashboard's settings tab and pass the Soul API URL to the environment variable. Your `VITE_API_URL` should be something like this:

   ```
   VITE_API_URL=https://<your-app-name>.herokuapp.com/api/tables
   ```

   Note: make sure to replace `<your-app-name>` with the actual name of your Heroku app.

7. Copy the link of the project from the Heroku dashboard and verify if it is working. You can add /api/client to the link to check the React admin client or /api/tables to check the Soul API. Here are some examples:

- React admin app link: `https://<your-app-name>.herokuapp.com/api/client`
- Soul API link: `https://<your-app-name>.herokuapp.com/api/tables`

- Note: Replace <your-app-name> with the actual name of your Heroku app.
