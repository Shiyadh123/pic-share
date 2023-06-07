# pic-share
This project consists of a client-server application.

## Server

### Installation

1. Navigate to the `server` folder: `cd server`
2. Install dependencies: `npm install`
3. Create a `.env` file in the `server` folder and configure environment variables:  ```MONGO_URL``` , ```JWT_SECRET``` and ```PORT```

### Usage

1. Start the server: `node index.js`
2. The server will be running on `PORT`.

## Client

### Installation

1. Navigate to the `client` folder: `cd client`
2. Install dependencies: `npm install`
3. Create a `.env` file in the `client` folder and configure environment variable: `REACT_APP_API_KEY` (Backend URL)

### Usage

1. Start the client: `npm start`
2. The client application will be accessible in your browser.

## Environment Variables

Both the server and client may require specific environment variables to function correctly.

## Contributing

If you would like to contribute to this project, please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b my-feature`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-feature`
5. Submit a pull request

