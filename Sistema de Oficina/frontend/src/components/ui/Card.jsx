import React from 'react';

const Card = ({ className = '', children, ...props }) => {
  const classes = ['ui-card', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Card;
