# React App skeleton project with Vite

React App skeleton project that can be used as baseline/skeleton for new React projects

1. React 18.x
2. Redux
3. React Router 6.x
4. Material UI 5.x
5. Axios
6. React Hook Form
7. Vite 3.x

### Run the Project on Local Machine

1. Clone the project
2. Start the Mock Backend server using the following command
   ```shell
    json-server db.json --routes routes.json --port 8080
   ```
3. Start react project using NPM command
    ```shell
    npm run dev
    ```
4. Go to http://localhost:3000 to access the website

### Run production build on Docker

1. Build the project
   ```shell
   npm run --build
    ```
2. Build docker image
    ```shell
    docker build . -t react_app
    ```
3. Run docker image`

    ```shell
    docker run -p 3000:80 cra_app
    ```
4. Go to http://localhost:3000 to access the website 

