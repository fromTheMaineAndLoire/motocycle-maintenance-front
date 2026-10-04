import React from 'react';

const Card = ({ data }) => {
  return (
    <div className="card">
      <div className="card-content">
        <h3 className="card-title">{data.info?.title || 'No title'}</h3>
        <p className="card-summary">{data.info?.summary || 'No summary'}</p>
        <p className="card-version">
          Version: {data.info?.version || data.arazzo || 'Unknown'}
        </p>
      </div>
    </div>
  );
};

export default Card;
