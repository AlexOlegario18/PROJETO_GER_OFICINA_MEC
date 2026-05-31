import React, { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const MecanicoPainel = () => {
  const navigate = useNavigate();
  const [ordens, setOrdens] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const nomeMecanico = localStorage.getItem('nomeUsuario');
  const idMecanico = localStorage.getItem('idUsuario');
  const tipoUsuario = localStorage.getItem('tipoUsuario');

  const carregarOrdens = useCallback(async () => {
    if (!idMecanico) return;
    try {
      setCarregando(true);
      const res = await api.get('/os/listar', {
        params: { mecanico_id: idMecanico, cargo: tipoUsuario }
      });
      setOrdens(res.data);
    } catch (err) {
      console.error("Erro ao carregar ordens", err);
    } finally {
      setCarregando(false);
    }
  }, [idMecanico, tipoUsuario]);

  useEffect(() => {
    if (!idMecanico) { navigate('/'); return; }
    carregarOrdens();
  }, [idMecanico, navigate, carregarOrdens]);

  const handleInputChange = (id, campo, valor) => {
    setOrdens(prev => prev.map(os => os.id === id ? { ...os, [campo]: valor } : os));
  };

  const atualizarOS = async (os, novoStatus = null) => {
    try {
      // TRUQUE PARA O BANCO ACEITAR: Usamos 'Aguardando' sem acentos se for o caso
      let statusParaEnviar = novoStatus || os.status || 'Aberta';
      
      if (statusParaEnviar.toLowerCase().includes('aguardando')) {
        statusParaEnviar = 'Aguardando'; 
      }

      const payload = {
        status: statusParaEnviar,
        servicos_executados: os.servicos_executados || '',
        pecas_substituidas: os.pecas_substituidas || '',
        observacoes_mecanico: os.observacoes_mecanico || ''
      };

      await api.put(`/os/${os.id}/progresso`, payload);
      alert(novoStatus ? `✅ Status: ${statusParaEnviar}` : "✅ Dados salvos!");
      await carregarOrdens();
    } catch (err) {
      alert("Erro ao atualizar OS");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ color: '#2c3e50' }}>👨‍🔧 Mecânico: <span style={{ color: '#3498db' }}>{nomeMecanico}</span></h2>
        <button onClick={handleLogout} style={btnSair}>Sair</button>
      </header>

      <div style={containerOrdens}>
        {carregando ? (
          <p style={{ textAlign: 'center' }}>Carregando...</p>
        ) : (
          <div style={gridOrdens}>
            {ordens.map(os => {
              // Lógica de detecção de status para as cores
              const s = (os.status || '').toLowerCase();
              const isPendente = s.includes('aguardando') || s.includes('pendente');
              const isAndamento = s.includes('andamento');
              const isFinalizada = s.includes('finalizada');

              return (
                <div key={os.id} style={cardOS(os.status)}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <strong>OS #{os.id}</strong>
                    <span style={statusBadge(os.status)}>
                      {isPendente ? "AGUARDANDO APROVAÇÃO" : os.status.toUpperCase()}
                    </span>
                  </div>
                  
                  <h4 style={{ margin: '0 0 10px 0' }}>{os.veiculo_modelo} - {os.placa}</h4>

                  <div style={caixaDescricao}>
                    <small style={{fontWeight: 'bold', color: '#856404'}}>PROBLEMA RELATADO:</small>
                    <p style={{margin: '5px 0 0 0', fontSize: '13px'}}>{os.descricao_problema}</p>
                  </div>
                  
                  <div style={formEvolucao}>
                    <label style={labelStyle}>O QUE FOI FEITO?</label>
                    <textarea 
                      style={textareaStyle}
                      value={os.servicos_executados || ''}
                      onChange={(e) => handleInputChange(os.id, 'servicos_executados', e.target.value)}
                    />

                    <label style={labelStyle}>PEÇAS:</label>
                    <input 
                      style={inputEstilo}
                      value={os.pecas_substituidas || ''}
                      onChange={(e) => handleInputChange(os.id, 'pecas_substituidas', e.target.value)}
                    />

                    <div style={{ marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {s.includes('aberta') && (
                        <button onClick={() => atualizarOS(os, 'Em Andamento')} style={btnIniciar}>▶️ INICIAR</button>
                      )}

                      {isAndamento && (
                        <>
                          <button onClick={() => atualizarOS(os, 'Aguardando')} style={btnFinalizar}>📤 ENVIAR P/ ADMIN</button>
                          <button onClick={() => atualizarOS(os)} style={btnSalvar}>💾 SALVAR RASCUNHO</button>
                        </>
                      )}

                      {isPendente && (
                        <div style={avisoAguardando}>
                          ⏳ AGUARDANDO APROVAÇÃO
                          <button onClick={() => atualizarOS(os)} style={{...btnSalvar, marginTop: '10px'}}>💾 Atualizar Dados</button>
                        </div>
                      )}

                      {isFinalizada && (
                         <div style={{ ...avisoAguardando, background: '#eafaf1', color: '#27ae60', border: '1px solid #27ae60' }}>
                           ✅ SERVIÇO FINALIZADO
                         </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

// --- ESTILOS FIXOS ---

const statusBadge = (status) => {
  const s = (status || '').toLowerCase();
  let cor = '#3498db'; 
  if (s.includes('andamento')) cor = '#f1c40f';
  else if (s.includes('aguardando') || s.includes('pendente')) cor = '#9b59b6';
  else if (s.includes('finalizada')) cor = '#27ae60';
  return { fontSize: '10px', padding: '5px 10px', borderRadius: '10px', backgroundColor: cor, color: s.includes('andamento') ? '#000' : '#fff', fontWeight: 'bold' };
};

const cardOS = (status) => {
  const s = (status || '').toLowerCase();
  let corTopo = '#3498db';
  if (s.includes('andamento')) corTopo = '#f1c40f';
  else if (s.includes('aguardando') || s.includes('pendente')) corTopo = '#9b59b6';
  else if (s.includes('finalizada')) corTopo = '#27ae60';
  return { border: '1px solid #ddd', padding: '15px', borderRadius: '10px', backgroundColor: '#fff', borderTop: `6px solid ${corTopo}`, marginBottom: '15px' };
};

const caixaDescricao = { padding: '10px', backgroundColor: '#fffbe6', borderRadius: '5px', marginBottom: '10px', borderLeft: '4px solid #f1c40f' };
const btnSair = { backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' };
const containerOrdens = { backgroundColor: 'white', padding: '15px', borderRadius: '10px' };
const gridOrdens = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' };
const formEvolucao = { background: '#f8f9fa', padding: '10px', borderRadius: '8px' };
const labelStyle = { display: 'block', fontSize: '11px', fontWeight: 'bold', marginTop: '8px' };
const textareaStyle = { width: '100%', height: '60px', padding: '8px', boxSizing: 'border-box' };
const inputEstilo = { width: '100%', padding: '8px', boxSizing: 'border-box' };
const btnIniciar = { width: '100%', padding: '10px', backgroundColor: '#f1c40f', fontWeight: 'bold', border: 'none', borderRadius: '5px', cursor: 'pointer' };
const btnFinalizar = { width: '100%', padding: '10px', backgroundColor: '#9b59b6', color: 'white', fontWeight: 'bold', border: 'none', borderRadius: '5px', cursor: 'pointer' };
const btnSalvar = { width: '100%', padding: '10px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' };
const avisoAguardando = { textAlign: 'center', color: '#9b59b6', fontWeight: 'bold', padding: '10px', background: '#f4eef8', borderRadius: '5px' };

export default MecanicoPainel;