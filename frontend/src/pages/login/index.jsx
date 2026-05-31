import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LoginContainer, LoginCard, Title, ErrorAlert } from "./styles";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import { useAuth } from "../../contexts/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [loginState, setLoginState] = useState("idle"); // idle | loading | error
  const [errorMsg, setErrorMsg] = useState("");
  const { register, handleSubmit, formState } = useForm();

  const onSubmit = async (data) => {
    setLoginState("loading");
    setErrorMsg("");
    try {
      const user = await login(data.username, data.password);
      
      if (user.tipo === "admin") {
        navigate("/admin");
      } else if (user.tipo === "mecanico") {
        navigate("/mecanico");
      } else {
        navigate("/");
      }
      
      setLoginState("idle");
    } catch (err) {
      setLoginState("error");
      setErrorMsg(err.message || "Erro ao fazer login. Tente novamente.");
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <Title>Login Oficina Mecânica</Title>
        {loginState === "error" && <ErrorAlert>{errorMsg}</ErrorAlert>}
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <Input
            label="Usuário"
            id="username"
            {...register("username", { required: "Campo obrigatório" })}
            error={formState.errors.username?.message}
            touched={formState.touchedFields.username}
            autoFocus
          />
          <Input
            label="Senha"
            id="password"
            type="password"
            {...register("password", { required: "Campo obrigatório" })}
            error={formState.errors.password?.message}
            touched={formState.touchedFields.password}
          />
          <Button
            type="submit"
            loading={loginState === "loading"}
            disabled={loginState === "loading"}
          >
            Entrar
          </Button>
        </form>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;
