import React from 'react';

const Rank = ({ name, entries }) => {
  return (
    <div>
      <div className="white f3">
        {`${name} , votre nombre actuel d'entrées est de...`}
      </div>
      <div className="white f1">{entries}</div>
    </div>
  );
};

export default Rank;
