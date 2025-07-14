import React from 'react';
import './TrendCard.css';
import { TrendData } from '../Data/TrendData';

const TrendCard = () => {
  return (
    <div className='TrendCard'>
      <h3>Trending for you</h3>

      {TrendData.map((trend, index) => {
        const query = encodeURIComponent(trend.name); // Safe for URLs
        const googleSearchURL = `https://www.google.com/search?q=${query}`;

        return (
          <a
            key={index}
            href={googleSearchURL}
            target="_blank"
            rel="noopener noreferrer"
            className="trend"
          >
            <span>#{trend.name}</span>
            <span>{trend.shares}k Shares</span>
          </a>
        );
      })}
    </div>
  );
};

export default TrendCard;
