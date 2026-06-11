import React, { useEffect, useState } from 'react';
import api from '../services/api';

const ListaVeiculos = () => {
  const [veiculos, setVeiculos] = useState([]);
  const [filtro, setFiltro] = useState('');

  // Busca os dados do backend assim que a tela abre
  useEffect(() => {
    const carregarVeiculos = async () => {
      try {
        const response = await api.get('/clientes/veiculos');
        setVeiculos(response.data);
      } catch (error) {
        console.error("Erro ao carregar veículos:", error);
      }
    };
    carregarVeiculos();
  }, []);

  // Filtra a lista conforme o que o usuário digita na busca (Placa ou Nome)
  const veiculosFiltrados = veiculos.filter(v => 
    v.placa.toLowerCase().includes(filtro.toLowerCase()) ||
    v.dono.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div style={{ padding: '10px', fontFamily: 'Arial' }}>
      <h3 style={{ color: '#2c3e50', marginBottom: '20px' }}>📋 Frota Cadastrada na Oficina</h3>
      
      <input 
        type="text" 
        placeholder="🔍 Filtrar por Placa ou Nome do Dono..." 
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        style={inputBuscaStyle}
      />

      <div style={{ overflowX: 'auto' }}>
        <table style={tableStyle}>
          <thead>
            <tr style={headerTableStyle}>
              <th style={thStyle}>Placa</th>
              <th style={thStyle}>Veículo / Ano</th>
              <th style={thStyle}>Cor & KM</th>
              <th style={thStyle}>Proprietário</th>
              <th style={thStyle}>Contato</th>
            </tr>
          </thead>
          <tbody>
            {veiculosFiltrados.map((v) => (
              <tr key={v.id} style={trBodyStyle}>
                <td style={tdStyle}>
                  <span style={badgePlaca}>{v.placa}</span>
                </td>
                <td style={tdStyle}>{v.marca} {v.modelo} <br/> <small style={{color: '#7f8c8d'}}>{v.ano}</small></td>
                <td style={tdStyle}>{v.cor} <br/> {v.km.toLocaleString()} km</td>
                <td style={tdStyle}><strong>{v.dono}</strong></td>
                <td style={tdStyle}>{v.telefone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {veiculosFiltrados.length === 0 && (
        <p style={{ textAlign: 'center', marginTop: '20px', color: '#95a5a6' }}>
          Nenhum veículo encontrado com este filtro.
        </p>
      )}
    </div>
  );
};

// --- ESTILOS PARA DEIXAR A TABELA MAIS LIMPA ---
const inputBuscaStyle = { 
  padding: '12px', 
  width: '100%', 
  marginBottom: '20px', 
  borderRadius: '8px', 
  border: '1px solid #dcdde1',
  fontSize: '14px',
  boxSizing: 'border-box'
};

const tableStyle = { 
  width: '100%', 
  borderCollapse: 'collapse', 
  backgroundColor: 'white',
  minWidth: '600px'
};

const headerTableStyle = { 
  backgroundColor: '#f8f9fa', 
  borderBottom: '2px solid #dee2e6',
  textAlign: 'left' 
};

const thStyle = { padding: '15px', color: '#444', fontWeight: 'bold', fontSize: '14px' };
const tdStyle = { padding: '15px', borderBottom: '1px solid #eee', fontSize: '14px', color: '#2f3640' };
const trBodyStyle = { transition: 'background 0.2s' };

const badgePlaca = {
  backgroundColor: '#2f3640',
  color: 'white',
  padding: '4px 8px',
  borderRadius: '4px',
  fontWeight: 'bold',
  letterSpacing: '1px',
  fontSize: '13px'
};

export default ListaVeiculos;