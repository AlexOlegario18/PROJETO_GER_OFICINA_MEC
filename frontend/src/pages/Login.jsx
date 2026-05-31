import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { usuario, senha });
      
      // Esperamos que o backend retorne: { id, nome, tipo }
      const user = response.data;

      if (user && user.tipo) {
        // --- SALVAMENTO ESTRATÉGICO ---
        
        // 1. Salvamos o objeto inteiro (boa prática)
        localStorage.setItem('userLogado', JSON.stringify(user));

        // 2. Salvamos as chaves individuais que seu MecanicoPainel e Sidebar usam
        localStorage.setItem('idUsuario', user.id);
        localStorage.setItem('nomeUsuario', user.nome);
        localStorage.setItem('tipoUsuario', user.tipo);

        const tipo = user.tipo.toLowerCase();

        // --- REDIRECIONAMENTO ---
        if (tipo === 'admin') {
          navigate('/admin');
        } else if (tipo === 'mecanico') {
          navigate('/mecanico');
        } else if (tipo === 'secretario' || tipo === 'secretaria') {
          navigate('/secretaria');
        } else {
          alert("Acesso restrito: Tipo de usuário inválido.");
        }
      } else {
        alert("Erro no servidor: Dados do usuário incompletos.");
      }

    } catch (error) {
      console.error("Erro no login:", error);
      alert("❌ Usuário ou senha incorretos!");
    }
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleLogin} style={cardStyle}>
        <h2 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '25px' }}>🛠️ Sistema de Oficina</h2>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={labelStyle}>Usuário:</label>
          <input 
            type="text" 
            style={inputStyle} 
            value={usuario} 
            onChange={(e) => setUsuario(e.target.value)} 
            placeholder="Seu usuário"
            required 
          />
        </div>

        <div style={{ marginBottom: '25px' }}>
          <label style={labelStyle}>Senha:</label>
          <input 
            type="password" 
            style={inputStyle} 
            value={senha} 
            onChange={(e) => setSenha(e.target.value)} 
            placeholder="******"
            required 
          />
        </div>

        <button type="submit" style={buttonStyle}>ENTRAR</button>
      </form>
    </div>
  );
};

// Estilos mantidos e polidos
const containerStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' };
const cardStyle = { backgroundColor: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', width: '100%', maxWidth: '360px' };
const labelStyle = { fontWeight: 'bold', fontSize: '14px', color: '#34495e' };
const inputStyle = { width: '100%', padding: '12px', marginTop: '8px', borderRadius: '6px', border: '1px solid #dcdde1', boxSizing: 'border-box', outline: 'none' };
const buttonStyle = { width: '100%', padding: '14px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' };

export default Login;