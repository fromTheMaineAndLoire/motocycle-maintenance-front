import React from 'react';
import Card from './Card';

const Carousel = ({ items, filenames }) => {
  return (
    <div className="carousel">
      <div className="carousel-track">
        {items.map((item, index) => (
          <div key={index} className="carousel-item">
            <Card data={item} filename={filenames[index]} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
