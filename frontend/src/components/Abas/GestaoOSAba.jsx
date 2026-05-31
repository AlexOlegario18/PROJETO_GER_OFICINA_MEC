import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const GestaoOSAba = () => {
  const [ordens, setOrdens] = useState([]);
  const [busca, setBusca] = useState('');
  
  const userLogado = JSON.parse(localStorage.getItem('userLogado')) || {};
  const cargoUser = (userLogado.tipo || userLogado.cargo || '').toLowerCase();
  const ehAdmin = cargoUser === 'admin';

  useEffect(() => { 
    carregarOS(); 
  }, []);

  const carregarOS = async () => {
    try {
      const res = await api.get(`/os/listar`, {
        params: { 
          mecanico_id: userLogado.id, 
          cargo: cargoUser 
        }
      });
      setOrdens(res.data);
    } catch (err) { console.error("Erro ao buscar OS"); }
  };

  const salvarDados = async (os) => {
    try {
      const payload = {
        status: os.status,
        servicos_executados: os.servicos_executados || '',
        pecas_substituidas: os.pecas_substituidas || '',
        valor_total: parseFloat(os.valor_total) || 0
      };
      await api.put(`/os/${os.id}/progresso`, payload);
      alert("✅ Alterações salvas!");
      carregarOS();
    } catch (err) { alert("Erro ao salvar."); }
  };

// No GestaoOSAba.jsx

const mudarStatusRapido = async (os, novoStatus) => {
  try {
    // Tradução de segurança: se for o status de aprovação, manda 'pendente'
    let statusParaBanco = novoStatus;
    if (novoStatus.includes("Aprovação") || novoStatus.includes("aguardando")) {
      statusParaBanco = "pendente"; 
    }

    await api.put(`/os/${os.id}/progresso`, { 
      ...os, 
      status: statusParaBanco 
    });
    
    alert(`Status atualizado!`);
    carregarOS();
  } catch (err) { alert("Erro ao mudar status."); }
};

// ESTILOS QUE FORÇAM O ROXO
const badgeStatusGrande = (status) => {
  const s = (status || '').toLowerCase();
  
  // Se for 'pendente' ou 'aguardando', fica roxo
  if (s.includes('pendente') || s.includes('aguardando') || s.includes('aprova')) {
    return { backgroundColor: '#9b59b6', color: '#fff', padding: '5px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold' };
  }
  if (s.includes('andamento')) return { backgroundColor: '#f1c40f', color: '#000', padding: '5px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold' };
  if (s.includes('finalizada')) return { backgroundColor: '#2ecc71', color: '#fff', padding: '5px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold' };
  
  return { backgroundColor: '#3498db', color: '#fff', padding: '5px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold' };
};

  const excluirOS = async (id) => {
    if (!window.confirm("⚠️ Excluir permanentemente?")) return;
    try {
      await api.delete(`/os/${id}`);
      carregarOS();
    } catch (err) { alert("Erro ao excluir."); }
  };

  const handleInputChange = (id, campo, valor) => {
    setOrdens(prev => prev.map(os => os.id === id ? { ...os, [campo]: valor } : os));
  };

  const ordensFiltradas = ordens.filter(os => {
    const termo = busca.toLowerCase();
    return String(os.id).includes(termo) || 
           (os.nome_cliente || "").toLowerCase().includes(termo) || 
           (os.placa || "").toLowerCase().includes(termo);
  });

  return (
    <div style={{ padding: '20px', backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
      <div style={headerFlex}>
        <h2 style={{ color: '#2c3e50' }}>{ehAdmin ? "📋 Painel Administrativo" : "🛠️ Painel do Mecânico"}</h2>
        <input 
          type="text" placeholder="🔍 Buscar OS..." style={inputBusca}
          value={busca} onChange={(e) => setBusca(e.target.value)}
        />
      </div>
      
      <div style={gridOS}>
        {ordensFiltradas.map(os => (
          <div key={os.id} style={cardStyle(os.status)}>
            <div style={headerCard}>
              <div>
                <span style={{ fontSize: '11px', color: '#7f8c8d' }}>NÚMERO DA OS</span><br/>
                <strong style={{ fontSize: '20px' }}>#{os.id}</strong>
              </div>
              <div style={{ textAlign: 'right' }}>
                {/* Aqui a badge já usa a lógica do Roxo */}
                <div style={badgeStatusGrande(os.status)}>{os.status.toUpperCase()}</div>
                {ehAdmin && <button onClick={() => excluirOS(os.id)} style={btnExcluir}>🗑️ Excluir</button>}
              </div>
            </div>

            <div style={{ margin: '15px 0', padding: '10px', background: '#f9f9f9', borderRadius: '8px', fontSize: '14px' }}>
              <p>🚗 <strong>Veículo:</strong> {os.veiculo_modelo} ({os.placa})</p>
              <p>👤 <strong>Cliente:</strong> {os.nome_cliente}</p>
              
              <div style={caixaDescricao}>
                <strong style={{ fontSize: '11px', color: '#856404', display: 'block', marginBottom: '3px' }}>
                  📝 RECLAMAÇÃO / DESCRIÇÃO:
                </strong>
                <span style={{ color: '#555', fontStyle: 'italic' }}>
                  {os.descricao_problema || "Nenhuma descrição informada."}
                </span>
              </div>
            </div>

            <div style={areaTrabalho}>
              <label style={lbl}>🔧 SERVIÇOS EXECUTADOS:</label>
              <textarea 
                style={txtArea} value={os.servicos_executados || ''}
                onChange={(e) => handleInputChange(os.id, 'servicos_executados', e.target.value)}
                placeholder="Descreva o que foi feito no veículo..."
              />

              <label style={lbl}>📦 PEÇAS SUBSTITUÍDAS:</label>
              <input 
                style={inputEstilo} value={os.pecas_substituidas || ''}
                onChange={(e) => handleInputChange(os.id, 'pecas_substituidas', e.target.value)}
                placeholder="Ex: Óleo, Pastilha, Filtro..."
              />
              
              <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                <div style={{ flex: 1 }}>
                  <label style={lbl}>STATUS:</label>
                  {ehAdmin ? (
                    <select 
                      style={selectEstilo} value={os.status}
                      onChange={(e) => handleInputChange(os.id, 'status', e.target.value)}
                    >
                      <option value="Aberta">Aberta</option>
                      <option value="Em Andamento">Em Andamento</option>
                      <option value="Aguardando Aprovação">Aguardando Aprovação</option>
                      <option value="Finalizada">Finalizada</option>
                    </select>
                  ) : (
                    <div style={statusBadgeMecanico(os.status)}>{os.status}</div>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <label style={lbl}>VALOR TOTAL (R$):</label>
                  <input 
                    type="number" style={inputValor} value={os.valor_total || ''}
                    onChange={(e) => handleInputChange(os.id, 'valor_total', e.target.value)}
                  />
                </div>
              </div>

              <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {!ehAdmin && (
                   <>
                     {os.status === 'Aberta' && (
                        <button onClick={() => mudarStatusRapido(os, 'Em Andamento')} style={btnStart}>▶️ INICIAR SERVIÇO AGORA</button>
                     )}
                     
                     {os.status === 'Em Andamento' && (
                        <button onClick={() => mudarStatusRapido(os, 'Aguardando Aprovação')} style={btnWait}>📤 FINALIZAR E ENVIAR P/ ADMIN</button>
                     )}
                   </>
                )}
                <button onClick={() => salvarDados(os)} style={btnSave}>💾 SALVAR ALTERAÇÕES</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- ESTILOS AJUSTADOS ---

const badgeStatusGrande = (status) => {
  const s = (status || '').toLowerCase().trim();
  let cor = '#3498db'; 
  if (s.includes('andamento')) cor = '#f1c40f';
  else if (s.includes('aguardando') || s.includes('aprovação') || s.includes('aprovacao')) cor = '#9b59b6';
  else if (s.includes('finalizada')) cor = '#2ecc71';

  return { 
    backgroundColor: cor, 
    color: cor === '#f1c40f' ? '#000' : '#fff', 
    padding: '5px 12px', 
    borderRadius: '6px', 
    fontSize: '11px', 
    fontWeight: 'bold', 
    display: 'inline-block' 
  };
};

const cardStyle = (status) => {
  const s = (status || '').toLowerCase().trim();
  let corTopo = '#3498db';
  if (s.includes('andamento')) corTopo = '#f1c40f';
  else if (s.includes('aguardando') || s.includes('aprovação') || s.includes('aprovacao')) corTopo = '#9b59b6';
  else if (s.includes('finalizada')) corTopo = '#2ecc71';

  return { 
    background: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 6px 15px rgba(0,0,0,0.1)',
    borderTop: `8px solid ${corTopo}`
  };
};

const statusBadgeMecanico = (status) => {
    const s = (status || '').toLowerCase().trim();
    let bg = '#f8f9fa';
    let cor = '#333';
    if (s.includes('aguardando')) { bg = '#f4eef8'; cor = '#9b59b6'; }
    return { padding: '10px', background: bg, color: cor, borderRadius: '6px', border: '1px solid #ddd', fontWeight: 'bold', textAlign: 'center' };
};

const caixaDescricao = { marginTop: '10px', padding: '10px', backgroundColor: '#fffbe6', borderLeft: '4px solid #f1c40f', borderRadius: '4px' };
const selectEstilo = { width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd', fontWeight: 'bold' };
const inputValor = { width: '100%', padding: '10px', borderRadius: '6px', border: '2px solid #2ecc71', boxSizing: 'border-box', fontWeight: 'bold' };
const headerFlex = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' };
const inputBusca = { padding: '10px 15px', borderRadius: '20px', border: '1px solid #ccc', width: '300px' };
const gridOS = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' };
const headerCard = { display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '10px' };
const areaTrabalho = { marginTop: '10px' };
const lbl = { fontSize: '11px', fontWeight: 'bold', color: '#7f8c8d', display: 'block', marginTop: '10px', marginBottom: '5px' };
const txtArea = { width: '100%', borderRadius: '6px', border: '1px solid #ddd', padding: '10px', minHeight: '60px', boxSizing: 'border-box' };
const inputEstilo = { width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd', boxSizing: 'border-box' };
const btnExcluir = { background: 'none', color: '#e74c3c', border: 'none', cursor: 'pointer', fontSize: '12px', textDecoration: 'underline' };
const btnStart = { background: '#f1c40f', color: '#000', border: 'none', padding: '14px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' };
const btnWait = { background: '#9b59b6', color: '#fff', border: 'none', padding: '14px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' };
const btnSave = { background: '#2c3e50', color: '#fff', border: 'none', padding: '14px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' };

export default GestaoOSAba;