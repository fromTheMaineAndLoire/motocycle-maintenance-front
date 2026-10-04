import React from 'react';
import Card from './Card';

const Carousel = ({ items }) => {
  return (
    <div className="carousel">
      <div className="carousel-track">
        {items.map((item, index) => (
          <div key={index} className="carousel-item">
            <Card data={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
