import React from 'react';

const Button = ({ variant = 'primary', className = '', children, ...props }) => {
  const classes = [`ui-button`, `ui-button--${variant}`, className].filter(Boolean).join(' ');
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
