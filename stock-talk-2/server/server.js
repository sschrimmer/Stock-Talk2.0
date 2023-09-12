const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// Define routes and middleware for authentication, GraphQL, etc.

app.get("/", (req, res) => {
  res.send("Stock Talk API");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
