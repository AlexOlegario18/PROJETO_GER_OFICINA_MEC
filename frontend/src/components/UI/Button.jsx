import React from "react";
import { StyledButton, Spinner } from "./styles";

const Button = ({ children, loading, disabled, ...props }) => (
  <StyledButton disabled={disabled || loading} $loading={loading} {...props}>
    {loading ? <Spinner /> : children}
  </StyledButton>
);

export default Button;
