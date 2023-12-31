const express = require("express");
const path = require("path");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("../server/graphql/schema");
const resolvers = require("../server/graphql/resolvers");
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// Serve static files from the React app (client/build directory)
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startApolloServer() {
  await server.start();
  server.applyMiddleware({ app });
}

startApolloServer().then(() => {
  // Serve your React app's index.html for all routes other than API routes.
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}; http://localhost:3001/`);
  });
});
