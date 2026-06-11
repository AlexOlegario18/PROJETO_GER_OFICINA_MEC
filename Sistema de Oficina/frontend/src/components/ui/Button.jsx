import React from 'react';
import styles from './Button.module.css';

const VARIANT_CLASS_MAP = {
  brand: styles.btnBrand,
  success: styles.btnSuccess,
  warning: styles.btnWarning,
};

const Button = ({ variant = 'brand', className = '', children, type = 'button', ...props }) => {
  const variantClass = VARIANT_CLASS_MAP[variant] || VARIANT_CLASS_MAP.brand;
  const classes = [styles.btnBase, variantClass, className].filter(Boolean).join(' ').trim();

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
