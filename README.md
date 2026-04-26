# Havaana Coffee - Modern Cafe Website

This is a full-stack web application structure for a modern cafe website.

## Tech Stack

* **Frontend:** React, Vite, Tailwind CSS, JavaScript
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (with Mongoose)

## Directory Structure

* `client/`: Contains the React + Vite frontend application.
* `server/`: Contains the Node.js + Express backend server.

## Getting Started

### Prerequisites
* Node.js (v18+)
* MongoDB

### Running the Server
1. Navigate to the `server` directory: `cd server`
2. Install dependencies: `npm install`
3. Create a `.env` file in the `server` directory with your `PORT` and `MONGO_URI`.
4. Run the server: `npm run dev` (assuming you have nodemon installed globally or as a dev dependency, else `node server.js`)

### Running the Client
1. Navigate to the `client` directory: `cd client`
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`

## Documentation
See individual `client/README.md` and `server/README.md` (if added) for more detailed instructions.
