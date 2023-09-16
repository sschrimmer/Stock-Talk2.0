// client/components/Category.js

import React, { useState, useEffect } from 'react';
import { getStockDataForCategory } from '../api'; // You'll need to implement this API function

function Category({ categoryName }) {
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch stock data for the specified category when the component mounts
    getStockDataForCategory(categoryName)
      .then((data) => {
        setStockData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching stock data:', error);
        setLoading(false);
      });
  }, [categoryName]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{categoryName} Stocks</h2>
      <ul>
        {stockData.map((stock) => (
          <li key={stock.symbol}>
            {stock.symbol}: {stock.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Category;
