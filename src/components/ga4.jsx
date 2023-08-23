'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Ga4Page() {
  const [pageviews, setPageviews] = useState(null);

  useEffect(() => {
    axios
      .get('/api/v1/ga4')
      .then((response) => {
        setPageviews(response.data.pageviews);
      })
      .catch((error) => {
        console.error('Failed to fetch GA data:', error);
      });
  }, []);

  if (pageviews === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Google Analytics Pageviews</h1>
      <p>Last 7 days pageviews: {pageviews}</p>
    </div>
  );
}
