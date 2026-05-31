import React, { useState } from 'react';
import api from '../../services/api';

const RelatoriosAba = () => {
  const [lista, setLista] = useState([]);
  const [tipo, setTipo] = useState('');
  const [carregando, setCarregando] = useState(false);

  const buscarClientes = async () => {
    setCarregando(true);
    try {
      const res = await api.get('/clientes/veiculos-todos');
      setLista(res.data);
      setTipo('clientes');
    } catch (err) {
      alert("Erro ao carregar relatório de clientes.");
    } finally {
      setCarregando(false);
    }
  };

  const buscarOSFechadas = async () => {
    setCarregando(true);
    try {
      const userLogado = JSON.parse(localStorage.getItem('userLogado')) || {};
      const cargoUser = (userLogado.tipo || userLogado.cargo || '').toLowerCase();

      const res = await api.get('/os/listar', {
        params: {
          mecanico_id: userLogado.id,
          cargo: cargoUser
        }
      });

      // Filtro insensível a maiúsculas/minúsculas
      const fechadas = res.data.filter(os =>
        (os.status || '').toLowerCase().trim() === 'finalizada'
      );

      if (fechadas.length === 0) {
        alert("Nenhuma OS 'Finalizada' encontrada.");
      }

      setLista(fechadas);
      setTipo('os');
    } catch (err) {
      console.error("Erro ao buscar OS:", err);
      alert("Erro ao carregar relatório de OS.");
    } finally {
      setCarregando(false);
    }
  };

  const voltar = () => {
    setLista([]);
    setTipo('');
  };

  if (carregando) return <p style={{ textAlign: 'center', marginTop: '20px' }}>Buscando dados...</p>;

  return (
    <div style={{ padding: '20px' }}>

      {/* MENU DE BOTÕES */}
      <div className="no-print" style={{ marginBottom: '20px', textAlign: 'center' }}>
        {lista.length === 0 ? (
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            <button onClick={buscarClientes} style={btnStyle}>👥 Relatório de Clientes</button>
            <button onClick={buscarOSFechadas} style={btnStyle}>💰 Relatório de OS Finalizadas</button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '15px' }}>
            <button onClick={voltar} style={btnVoltar}>⬅️ Voltar</button>
            <button onClick={() => window.print()} style={btnPrint}>🖨️ Imprimir Relatório</button>
          </div>
        )}
      </div>

      {/* ÁREA DO RELATÓRIO */}
      {lista.length > 0 && (
        <div id="relatorio-final" style={{ backgroundColor: '#fff', padding: '20px' }}>
          <div style={{ textAlign: 'center', marginBottom: '20px', borderBottom: '2px solid #000' }}>
            <h2>OFICINA PRO - SISTEMA DE GESTÃO</h2>
            <p>RELATÓRIO EMITIDO EM: {new Date().toLocaleDateString('pt-BR')}</p>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f2f2f2' }}>
                {tipo === 'clientes' ? (
                  <>
                    <th style={thStyle}>Cliente</th>
                    <th style={thStyle}>Telefone</th>
                    <th style={thStyle}>Veículo</th>
                    <th style={thStyle}>Placa</th>
                  </>
                ) : (
                  <>
                    <th style={thStyle}>ID</th>
                    <th style={thStyle}>Veículo / Cliente</th>
                    <th style={thStyle}>Serviços Executados</th>
                    <th style={thStyle}>Total</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {lista.map((item, i) => (
                <tr key={i}>
                  {tipo === 'clientes' ? (
                    <>
                      <td style={tdStyle}>{item.nome_cliente}</td>
                      <td style={tdStyle}>{item.telefone_cliente}</td>
                      <td style={tdStyle}>{item.marca} {item.modelo}</td>
                      <td style={tdStyle}>{item.placa}</td>
                    </>
                  ) : (
                    <>
                      <td style={tdStyle}>#{item.id}</td>
                      <td style={tdStyle}>
                        <strong>{item.veiculo_modelo}</strong><br/>
                        <span>{item.nome_cliente}</span>
                      </td>
                      <td style={tdStyle}>
                        {item.servicos_executados || item.descricao_problema || "N/A"}
                      </td>
                      <td style={tdStyle}>
                        R$ {item.valor_total ? parseFloat(item.valor_total).toFixed(2) : "0.00"}
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// Estilos
const btnStyle = { padding: '12px 25px', backgroundColor: '#2c3e50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' };
const btnPrint = { padding: '12px 25px', backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' };
const btnVoltar = { padding: '12px 25px', backgroundColor: '#7f8c8d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' };
const thStyle = { border: '1px solid #000', padding: '10px', textAlign: 'left' };
const tdStyle = { border: '1px solid #000', padding: '10px', textAlign: 'left' };

export default RelatoriosAba;