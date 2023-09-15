const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// Serve static files from the React app (client/build directory)
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

// Define routes and middleware for authentication, GraphQL, etc.

// Serve the React app's index.html file for all routes except API routes
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
