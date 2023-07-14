# RCO-Soul

# Description

The purpose of this project is to demonstrate how to run a React admin client using [Soul](https://github.com/thevahidal/soul) as a REST API service. Soul is an open-source REST API wrapper that exposes an SQLite database to any client.

# Running the project locally

There are two ways to run this project locally:

1. Run Soul and the React Admin client independently
2. Run the React Admin client as an extension of Soul.

## 1. Running Soul and the React Admin client independently

1. Go to the root folder of the project and install the npm packages by running:

   ```
   npm install
   ```

2. Copy the environment variables from the `.env.sample` file and modify the variables by running:

   ```
   cp .env.sample .env
   ```

   - `PORT`: The port on which the Soul server runs.
   - `VITE_API_URL`: The API URL of Soul, which should be `http://localhost:<PORT>/api/tables`.
   - `EXTENSIONS`: The **absolute path** location of the `_extensions` folder

3. Start the Soul server by running:

   ```
   npm run dev:soul
   ```

4. Start your React-admin client in another terminal by running:

   ```
   npm run dev:client
   ```

5. To check if the app is working, use the following URL in your browser:
   ```
      http://localhost:<port_of_react-admin>
   ```

## 2. Running the react admin client as a soul extension

1. Build the react admin client
   ```
     npm run build
   ```
2. Run the react admin app as a soul extension
   ```
     npm run dev:soul-client
   ```
3. To check if the app is working, use the following URL in your browser:
   ```
     http://localhost:<port>/api/client
   ```

# Deploying the project to Heroku

You can deploy this project to Heroku. You can use either the Heroku CLI or create a pipeline in Heroku to automatically deploy the project when a commit is pushed to a PR.

## Deploying the project using the Heroku CLI

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
