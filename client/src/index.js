import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApolloProvider } from '@apollo/client'; // Import ApolloProvider
import { loadStripe } from '@stripe/stripe-js';
import GlobalStyle from './globalStyling';
import { ApolloClient, InMemoryCache } from '@apollo/client'; // Import ApolloClient and InMemoryCache

const stripePromise = loadStripe('pk_test_51NnuTDCQo2qBMXyzMFBiah3MrptUU26TlomFrK8VMfEJIeWfP8YiEvq6fbhKdAwDGdQkvLGBxMe0tAE4eU2Sk1w800zaYgqjnv');
const client = new ApolloClient({ // Create Apollo Client instance
  uri: '/graphql', // Replace with your GraphQL server endpoint
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the Dashboard component as the default
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}> {/* Wrap with ApolloProvider */}
      <GlobalStyle />
      <App />
    </ApolloProvider>
  </React.StrictMode>,
);
