import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ data, filename }) => {
  return (
    <Link to={`/arazzo/${filename}`} className="card-link">
      <div className="card">
        <div className="card-content">
          <h3 className="card-title">{data.info?.title || 'No title'}</h3>
          <p className="card-summary">{data.info?.summary || 'No summary'}</p>
          <p className="card-version">
            Version: {data.info?.version || data.arazzo || 'Unknown'}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
