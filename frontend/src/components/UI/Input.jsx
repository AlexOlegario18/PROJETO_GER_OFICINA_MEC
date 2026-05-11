import React from "react";
import { InputWrapper, StyledInput, Label, ErrorMsg } from "./styles";

const Input = React.forwardRef(
  (
    {
      label,
      error,
      touched,
      id,
      type = "text",
      ...props
    },
    ref
  ) => (
    <InputWrapper>
      {label && <Label htmlFor={id}>{label}</Label>}
      <StyledInput
        id={id}
        type={type}
        $hasError={!!error && touched}
        ref={ref}
        {...props}
      />
      {error && touched && <ErrorMsg>{error}</ErrorMsg>}
    </InputWrapper>
  )
);

export default Input;
