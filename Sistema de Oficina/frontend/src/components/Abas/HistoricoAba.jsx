import React, { useState } from 'react';
import api from '../../services/api';

const HistoricoAba = () => {
    const [busca, setBusca] = useState('');
    const [historico, setHistorico] = useState([]);

    const buscarHistorico = async () => {
        try {
            // Criaremos essa rota no backend
            const res = await api.get(`/os/historico?cliente=${busca}`);
            setHistorico(res.data);
        } catch (err) { alert("Erro ao buscar histórico"); }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>🕒 Histórico de Manutenções</h2>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <input 
                    placeholder="Nome do cliente ou Placa..." 
                    style={inputStyle} 
                    onChange={(e) => setBusca(e.target.value)}
                />
                <button onClick={buscarHistorico} style={btnBusca}>🔍 Pesquisar</button>
            </div>

            <table style={tabelaStyle}>
                <thead>
                    <tr style={{ backgroundColor: '#f8f9fa' }}>
                        <th>Data</th>
                        <th>Veículo</th>
                        <th>Serviços Realizados</th>
                        <th>Valor (R$)</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {historico.map(h => (
                        <tr key={h.id}>
                            <td>{new Date(h.data_entrada).toLocaleDateString()}</td>
                            <td><strong>{h.placa}</strong><br/>{h.modelo}</td>
                            <td>{h.servicos_executados || 'Nenhum detalhe'}</td>
                            <td>R$ {h.valor_total}</td>
                            <td>{h.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// Estilos rápidos
const inputStyle = { flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ddd' };
const btnBusca = { padding: '10px 20px', backgroundColor: '#2ecc71', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' };
const tabelaStyle = { width: '100%', borderCollapse: 'collapse', marginTop: '20px' };

export default HistoricoAba;