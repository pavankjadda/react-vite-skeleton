# A Create React App (CRA) skeleton project

A Create React App (CRA) skeleton project that can be used as base lint/skeleton for new React projects

1. React
2. Redux
3. React Router
4. Material UI
5. Axios
6. Formik
7. Vite

### Run the Project on Local Machine

1. Clone the project
2. Start the Mock Backend server using the following command
   ```shell
    json-server db.json --routes routes.json --port 8080
   ```
3. Start react project using NPM command
    ```shell
    npm start --watch
    ```
4. Go to http://localhost:3000 to access the website

### Run production build on Docker

1. Build the project
   ```shell
   npm run --build
    ```
2. Build docker image
    ```shell
    docker build . -t cra_app
    ```
4. Run docker image`

    ```shell
    docker run -p 3000:80 cra_app
    ```
5. Go to http://localhost:3000 to access the website 

