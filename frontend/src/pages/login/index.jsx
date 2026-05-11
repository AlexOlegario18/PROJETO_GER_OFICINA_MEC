import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginContainer, LoginCard, Title, ErrorAlert } from "./styles";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";

// Mock login function
const mockLogin = async ({ username, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === "admin" && password === "1234") {
        resolve({ role: "admin" });
      } else if (username === "mecanico" && password === "1234") {
        resolve({ role: "mecanico" });
      } else {
        reject(new Error("Usuário ou senha inválidos"));
      }
    }, 1200);
  });
};

const Login = () => {
  const [loginState, setLoginState] = useState("idle"); // idle | loading | error
  const [errorMsg, setErrorMsg] = useState("");
  const { register, handleSubmit, formState } = useForm();

  const onSubmit = async (data) => {
    setLoginState("loading");
    setErrorMsg("");
    try {
      const result = await mockLogin(data);
      // Redirecionamento mock
      if (result.role === "admin") {
        // window.location.href = "/admin/dashboard";
      } else if (result.role === "mecanico") {
        // window.location.href = "/mecanico/dashboard";
      }
      setLoginState("idle");
    } catch (err) {
      setLoginState("error");
      setErrorMsg(err.message);
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
