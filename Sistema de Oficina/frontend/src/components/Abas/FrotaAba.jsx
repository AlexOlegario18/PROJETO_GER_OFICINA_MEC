import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const FrotaAba = () => {
  const [clientes, setClientes] = useState([]);
  const [busca, setBusca] = useState('');
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const res = await api.get('/clientes/veiculos-todos');
      setClientes(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Erro ao buscar frota:", err);
    }
  };

  const handleExcluir = async (id) => {
    if (window.confirm("⚠️ Tem certeza? Isso excluirá o cliente e o veículo associado permanentemente!")) {
      try {
        await api.delete(`/clientes/${id}`);
        setClientes(clientes.filter(c => (c.id || c.cliente_id) !== id));
        alert("✅ Registro removido.");
      } catch (err) {
        alert("❌ Erro ao excluir: verifique as Ordens de Serviço.");
      }
    }
  };

  const handleAbrirEdicao = (cliente) => {
    // Garante que todas as propriedades fiquem mapeadas com fallback seguro caso venham nulas
    setEditando({ 
      ...cliente,
      ano: cliente.ano || '',
      cor: cliente.cor || '',
      km: cliente.km || '',
      combustivel: cliente.combustivel || '',
      email: cliente.email || '',
      endereco: cliente.endereco || '',
      cpf_cnpj: cliente.cpf_cnpj || cliente.cpf || ''
    });
  };

  const handleSalvarEdicao = async () => {
    try {
      const id = editando.cliente_id || editando.id;
      
      // Enviando o pacote garantindo os nomes que o backend espera receber
      await api.put(`/clientes/${id}`, {
        nome: editando.nome_cliente || editando.nome,
        cpf_cnpj: editando.cpf_cnpj,
        telefone: editando.telefone || editando.telefone_cliente,
        email: editando.email,
        endereco: editando.endereco,
        placa: editando.placa,
        marca: editando.marca, 
        modelo: editando.modelo,
        ano: editando.ano,
        cor: editando.cor,
        km: editando.km,
        combustivel: editando.combustivel
      });

      alert("✅ Cadastro completo atualizado!");
      setEditando(null);
      carregarDados();
    } catch (err) {
      console.error(err);
      alert("❌ Erro ao atualizar dados.");
    }
  };

  const clientesFiltrados = clientes.filter(c => {
    const nome = (c.nome_cliente || c.nome || "").toString().toLowerCase();
    const placa = (c.placa || "").toString().toLowerCase();
    return nome.includes(busca.toLowerCase()) || placa.includes(busca.toLowerCase());
  });

  return (
    <div style={{ animation: 'fadeIn 0.5s' }}>
      
      {editando ? (
        <div style={formEdicaoCard}>
          <h3 style={{marginTop: 0, color: '#2c3e50'}}>✏️ Editar Cadastro Completo</h3>
          
          <div style={gridForm}>
            {/* --- SEÇÃO CLIENTE --- */}
            <div style={{gridColumn: 'span 2', borderBottom: '1px solid #eee', paddingBottom: '5px', marginBottom: '5px'}}>
               <strong style={{color: '#3498db'}}>Dados do Cliente</strong>
            </div>

            <div>
              <label style={labelStyle}>Nome Completo</label>
              <input style={inputStyle} value={editando.nome_cliente || editando.nome || ''} onChange={e => setEditando({...editando, nome_cliente: e.target.value})} />
            </div>

            <div>
              <label style={labelStyle}>CPF / CNPJ</label>
              <input style={inputStyle} value={editando.cpf_cnpj || ''} onChange={e => setEditando({...editando, cpf_cnpj: e.target.value})} />
            </div>

            <div>
              <label style={labelStyle}>Whats / Telefone</label>
              <input style={inputStyle} value={editando.telefone || editando.telefone_cliente || ''} onChange={e => setEditando({...editando, telefone: e.target.value})} />
            </div>

            <div>
              <label style={labelStyle}>E-mail</label>
              <input style={inputStyle} value={editando.email || ''} onChange={e => setEditando({...editando, email: e.target.value})} />
            </div>

            <div style={{gridColumn: 'span 2'}}>
              <label style={labelStyle}>Endereço Completo</label>
              <input style={inputStyle} value={editando.endereco || ''} onChange={e => setEditando({...editando, endereco: e.target.value})} />
            </div>

            {/* --- SEÇÃO VEÍCULO --- */}
            <div style={{gridColumn: 'span 2', borderBottom: '1px solid #eee', paddingBottom: '5px', marginTop: '15px', marginBottom: '5px'}}>
               <strong style={{color: '#e67e22'}}>Dados do Veículo</strong>
            </div>

            <div>
              <label style={labelStyle}>Placa</label>
              <input style={{...inputStyle, textTransform: 'uppercase'}} value={editando.placa || ''} onChange={e => setEditando({...editando, placa: e.target.value.toUpperCase()})} />
            </div>

            <div>
              <label style={labelStyle}>Marca</label>
              <input style={inputStyle} value={editando.marca || ''} onChange={e => setEditando({...editando, marca: e.target.value})} />
            </div>

            <div>
              <label style={labelStyle}>Modelo</label>
              <input style={inputStyle} value={editando.modelo || ''} onChange={e => setEditando({...editando, modelo: e.target.value})} />
            </div>

            <div>
              <label style={labelStyle}>Ano</label>
              <input type="number" style={inputStyle} value={editando.ano || ''} onChange={e => setEditando({...editando, ano: e.target.value})} />
            </div>

            <div>
              <label style={labelStyle}>Cor</label>
              <input style={inputStyle} value={editando.cor || ''} onChange={e => setEditando({...editando, cor: e.target.value})} />
            </div>

            <div>
              <label style={labelStyle}>KM Atual</label>
              <input type="number" style={inputStyle} value={editando.km || ''} onChange={e => setEditando({...editando, km: e.target.value})} />
            </div>

            <div style={{gridColumn: 'span 2'}}>
              <label style={labelStyle}>Combustível</label>
              <select style={inputStyle} value={editando.combustivel || ''} onChange={e => setEditando({...editando, combustivel: e.target.value})}>
                <option value="">Selecione...</option>
                <option value="Flex">Flex</option>
                <option value="Gasolina">Gasolina</option>
                <option value="Etanol">Etanol</option>
                <option value="Diesel">Diesel</option>
                <option value="GNV">GNV / Híbrido</option>
              </select>
            </div>
          </div>

          <div style={{marginTop: '25px', display: 'flex', gap: '10px'}}>
            <button onClick={handleSalvarEdicao} style={btnSalvar}>💾 Gravar Alterações</button>
            <button onClick={() => setEditando(null)} style={btnCancelar}>Cancelar</button>
          </div>
        </div>
      ) : (
        <>
          <div style={headerStyle}>
            <h3>📋 Cadastro de Clientes </h3>
            <input 
              type="text" 
              placeholder="Buscar por nome ou placa..." 
              style={inputBusca}
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>

          <div style={tabelaContainer}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={thStyle}>
                  <th style={tdStyle}>Cliente</th>
                  <th style={tdStyle}>Veículo</th>
                  <th style={tdStyle}>Placa</th>
                  <th style={tdStyle}>Telefone</th>
                  <th style={tdStyle}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {clientesFiltrados.map(c => (
                  <tr key={c.id || c.cliente_id} style={linhaStyle}>
                    <td style={tdStyle}><strong>{c.nome_cliente || c.nome}</strong></td>
                    <td style={tdStyle}>{c.marca} {c.modelo} ({c.ano})</td>
                    <td style={tdStyle}><span style={badgePlaca}>{c.placa}</span></td>
                    <td style={tdStyle}>{c.telefone || c.telefone_cliente || 'N/A'}</td>
                    <td style={tdStyle}>
                      <button onClick={() => handleAbrirEdicao(c)} style={btnEditar}>✏️ Editar</button>
                      <button 
                        onClick={() => handleExcluir(c.id || c.cliente_id)} 
                        style={btnExcluir}
                      >
                        🗑️ Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

// Estilos mantidos conforme original
const formEdicaoCard = { backgroundColor: '#fff', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', marginBottom: '20px' };
const gridForm = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' };
const inputStyle = { width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd', marginTop: '5px', boxSizing: 'border-box', fontSize: '14px' };
const labelStyle = { fontSize: '11px', fontWeight: 'bold', color: '#7f8c8d', textTransform: 'uppercase' };
const btnSalvar = { backgroundColor: '#27ae60', color: 'white', border: 'none', padding: '12px 25px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' };
const btnCancelar = { backgroundColor: '#95a5a6', color: 'white', border: 'none', padding: '12px 25px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' };
const btnEditar = { background: 'none', border: 'none', color: '#3498db', cursor: 'pointer', fontWeight: 'bold', marginRight: '15px' };
const headerStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' };
const inputBusca = { padding: '10px', borderRadius: '8px', border: '1px solid #ddd', width: '300px', outline: 'none' };
const tabelaContainer = { backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', overflow: 'hidden' };
const thStyle = { backgroundColor: '#f8f9fa', textAlign: 'left', borderBottom: '2px solid #eee' };
const tdStyle = { padding: '15px', borderBottom: '1px solid #eee' };
const linhaStyle = { transition: '0.2s' };
const badgePlaca = { backgroundColor: '#2c3e50', color: '#fff', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', fontFamily: 'monospace' };
const btnExcluir = { background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' };

export default FrotaAba;