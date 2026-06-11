import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Button from '../components/ui/Button';
import styles from './Login.module.css';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/auth/login', { usuario, senha });
      const user = response.data;

      if (!user?.tipo) {
        alert('Erro no servidor: Dados do usuário incompletos.');
        return;
      }

      localStorage.setItem('userLogado', JSON.stringify(user));
      localStorage.setItem('idUsuario', user.id);
      localStorage.setItem('nomeUsuario', user.nome);
      localStorage.setItem('tipoUsuario', user.tipo);

      const tipo = user.tipo.toLowerCase();

      if (tipo === 'admin') {
        navigate('/admin');
      } else if (tipo === 'mecanico') {
        navigate('/mecanico');
      } else if (tipo === 'secretario' || tipo === 'secretaria') {
        navigate('/secretaria');
      } else {
        alert('Acesso restrito: Tipo de usuário inválido.');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      alert('❌ Usuário ou senha incorretos!');
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.card} onSubmit={handleLogin} noValidate>
        <div className={styles.titleContainer}>
          <ion-icon name="build-outline" className={styles.titleIcon} aria-hidden="true" />
          <h2 className={styles.title}>Sistema de Oficina</h2>
        </div>

        <div className={styles.field}>
          <label htmlFor="usuario-input" className={styles.label}>
            Usuário
          </label>
          <div className={styles.inputGroup}>
            <ion-icon name="person-outline" className={styles.icon} aria-hidden="true" />
            <input
              id="usuario-input"
              name="usuario"
              type="text"
              className={styles.input}
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="Seu usuário"
              autoComplete="username"
              required
            />
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="senha-input" className={styles.label}>
            Senha
          </label>
          <div className={styles.inputGroup}>
            <ion-icon name="lock-closed-outline" className={styles.icon} aria-hidden="true" />
            <input
              id="senha-input"
              name="senha"
              type="password"
              className={styles.input}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="******"
              autoComplete="current-password"
              required
            />
          </div>
        </div>

        <Button variant="brand" type="submit" className={styles.submitButton}>
          ENTRAR
        </Button>
      </form>
    </div>
  );
};


export default Login;