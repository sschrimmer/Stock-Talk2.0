import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  
  body {
    margin: 0;
    padding: 0;
    font-family: Arial, Helvetica, sans-serif;
  }

  
  body {
    background-image: url('https://static.vecteezy.com/system/resources/previews/002/623/312/large_2x/blue-candlestick-chart-on-blue-background-trading-graphic-design-concept-financial-stock-market-cryptocurrency-graph-illustration-vector.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-color: #9edafe;
  }

  .dashHead {
    color: #FFFFFF;
  }

  .label {
    color: #FFFFFF;
  }

  p {
    text-color: #FFFFFF;
  }

  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  
  header {
    background-color: #2a2a2a;
    color: #fff;
    padding: 10px 0;
  }

  header h1 {
    font-size: 24px;
    margin: 0;
  }

  
  nav {
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
    }

    li {
      margin-right: 20px;

      a {
        text-decoration: none;
        color: #fff;
        font-weight: bold;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  
  button {
    padding: 10px 20px;
    background-color: #18DB00;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #0055cc;
    }
  }


  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;

    th,
    td {
      border: 1px solid #ddd;
      padding: 10px;
      text-align: left;
    }

    th {
      background-color: #f2f2f2;
      font-weight: bold;
    }

    tr:nth-child(even) {
      background-color: #f5f5f5;
    }
  }

  
  footer {
    background-color: #2a2a2a;
    color: #fff;
    padding: 10px 0;
    text-align: center;
  }
`;

export default GlobalStyle;