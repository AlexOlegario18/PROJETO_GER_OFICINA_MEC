import React, { useState } from 'react';
import api from '../../services/api';

const CadastroAba = () => {
  const [form, setForm] = useState({
    nome: '', cpf_cnpj: '', telefone: '', email: '', endereco: '',
    placa: '', modelo: '', marca: '', ano: '', cor: '', km: '', combustivel: 'Flex'
  });

  const salvar = async (e) => {
    e.preventDefault();
    
    // Log para você conferir no F12 se os dados estão saindo certos
    console.log("Enviando dados:", form);

    try {
      // Chamando a rota que configuramos no backend
      const response = await api.post('clientes/cadastrar', form);
      
      alert('✅ Cadastrado com sucesso!');
      
      // Limpa o formulário após o sucesso
      setForm({ 
        nome: '', cpf_cnpj: '', telefone: '', email: '', endereco: '', 
        placa: '', modelo: '', marca: '', ano: '', cor: '', km: '', combustivel: 'Flex' 
      });

   } catch (err) {
  // Isso vai pegar a mensagem que o 'res.status(500).json({ error: ... })' do backend enviar
  const mensagemDeErroDoBanco = err.response?.data?.error || "Erro desconhecido";
  alert(`❌ Erro no Banco de Dados: ${mensagemDeErroDoBanco}`);
  console.error(err.response?.data);
}
  };

  return (
    <div style={{ padding: '20px' }}>
      <form onSubmit={salvar} style={{ animation: 'fadeIn 0.5s' }}>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          
          {/* COLUNA CLIENTE */}
          <div style={boxStyle}>
            <h3 style={titleStyle}>👤 Dados do Cliente</h3>
            <input 
              placeholder="Nome Completo" 
              value={form.nome} 
              onChange={e => setForm({ ...form, nome: e.target.value })} 
              style={inputStyle} 
              required 
            />
            <input 
              placeholder="CPF ou CNPJ" 
              value={form.cpf_cnpj} 
              onChange={e => setForm({ ...form, cpf_cnpj: e.target.value })} 
              style={inputStyle} 
              required 
            />
            <input 
              placeholder="WhatsApp / Telefone" 
              value={form.telefone} 
              onChange={e => setForm({ ...form, telefone: e.target.value })} 
              style={inputStyle} 
            />
            <input 
              placeholder="E-mail" 
              type="email"
              value={form.email} 
              onChange={e => setForm({ ...form, email: e.target.value })} 
              style={inputStyle} 
            />
          </div>

          {/* COLUNA VEÍCULO */}
          <div style={{ ...boxStyle, borderLeft: '5px solid #28a745' }}>
            <h3 style={titleStyle}>🚘 Dados do Veículo</h3>
            
            <div style={placaContainer}>
              <div style={placaHeader}>BRASIL</div>
              <input 
                placeholder="PLACA" 
                value={form.placa} 
                onChange={e => setForm({ ...form, placa: e.target.value.toUpperCase() })} 
                style={placaInput} 
                maxLength="7" 
                required 
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
               <input 
                placeholder="Marca" 
                value={form.marca} 
                onChange={e => setForm({ ...form, marca: e.target.value })} 
                style={inputStyle} 
              />
               <input 
                placeholder="Modelo" 
                value={form.modelo} 
                onChange={e => setForm({ ...form, modelo: e.target.value })} 
                style={inputStyle} 
                required 
              />
               <input 
                placeholder="Ano" 
                type="number" 
                value={form.ano} 
                onChange={e => setForm({ ...form, ano: e.target.value })} 
                style={inputStyle} 
              />
               <input 
                placeholder="Cor" 
                value={form.cor} 
                onChange={e => setForm({ ...form, cor: e.target.value })} 
                style={inputStyle} 
              />
               <input 
                placeholder="KM Atual" 
                type="number" 
                value={form.km} 
                onChange={e => setForm({ ...form, km: e.target.value })} 
                style={inputStyle} 
              />
               <select 
                value={form.combustivel} 
                onChange={e => setForm({ ...form, combustivel: e.target.value })} 
                style={inputStyle}
              >
                <option value="Flex">Flex</option>
                <option value="Gasolina">Gasolina</option>
                <option value="Etanol">Etanol</option>
                <option value="Diesel">Diesel</option>
              </select>
            </div>
          </div>
        </div>

        <button type="submit" style={btnSucesso}>
          💾 SALVAR CLIENTE E VEÍCULO
        </button>
      </form>
    </div>
  );
};

// --- ESTILOS (Mantidos e Refinados) ---
const boxStyle = { 
  flex: '1', 
  minWidth: '320px', 
  padding: '25px', 
  backgroundColor: '#fff',
  border: '1px solid #eee', 
  borderRadius: '12px',
  boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
};

const inputStyle = { 
  width: '100%', 
  padding: '12px', 
  marginBottom: '10px', 
  borderRadius: '6px', 
  border: '1px solid #ddd', 
  boxSizing: 'border-box',
  fontSize: '14px'
};

const titleStyle = { marginBottom: '20px', color: '#2c3e50', fontSize: '18px', borderBottom: '1px solid #eee', paddingBottom: '10px' };

const btnSucesso = { 
  width: '100%', 
  padding: '18px', 
  backgroundColor: '#28a745', 
  color: 'white', 
  border: 'none', 
  borderRadius: '8px', 
  cursor: 'pointer', 
  fontWeight: 'bold', 
  fontSize: '16px',
  marginTop: '20px',
  transition: 'background 0.3s'
};

const placaContainer = { 
  width: '180px', 
  border: '4px solid #333', 
  borderRadius: '8px', 
  margin: '0 auto 20px', 
  overflow: 'hidden',
  backgroundColor: '#fff'
};

const placaHeader = { 
  backgroundColor: '#003399', 
  color: 'white', 
  fontSize: '10px', 
  textAlign: 'center', 
  padding: '3px',
  fontWeight: 'bold',
  letterSpacing: '1px'
};

const placaInput = { 
  width: '100%', 
  border: 'none', 
  textAlign: 'center', 
  fontSize: '28px', 
  fontWeight: 'bold', 
  fontFamily: 'monospace', 
  outline: 'none',
  padding: '5px 0'
};

export default CadastroAba;