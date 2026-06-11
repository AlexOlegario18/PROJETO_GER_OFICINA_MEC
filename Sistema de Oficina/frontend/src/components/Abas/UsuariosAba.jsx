import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const UsuariosAba = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [novoUsuario, setNovoUsuario] = useState({ nome: '', email: '', senha: '', role: 'admin', especialidade: 'Geral' });
  const [editando, setEditando] = useState(null); // Estado para edição
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const carregarUsuarios = async () => {
    try {
      const res = await api.get('/auth/usuarios');
      setUsuarios(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Erro ao carregar usuários:", err);
    }
  };

  const handleAlternarStatus = async (id, statusAtual) => {
    const novoStatus = statusAtual === 'ativo' ? 'inativo' : 'ativo';
    try {
      await api.put(`/auth/status/${id}`, { status: novoStatus });
      carregarUsuarios();
    } catch (err) {
      alert("Erro ao alterar status.");
    }
  };

  const handleExcluir = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir permanentemente?")) {
      try {
        await api.delete(`/auth/${id}`);
        carregarUsuarios();
      } catch (err) {
        alert("Erro ao excluir usuário.");
      }
    }
  };

  const handleCadastrar = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        nome: novoUsuario.nome,
        usuario: novoUsuario.email,
        senha: novoUsuario.senha,
        tipo: novoUsuario.role,
        especialidade: novoUsuario.especialidade
      };
      await api.post('/auth/cadastrar', payload);
      setMensagem("✅ Usuário criado!");
      setNovoUsuario({ nome: '', email: '', senha: '', role: 'admin', especialidade: 'Geral' });
      carregarUsuarios();
      setTimeout(() => setMensagem(''), 3000);
    } catch (err) {
      setMensagem("❌ Erro ao criar usuário.");
    }
  };

  // --- NOVA FUNÇÃO: SALVAR EDIÇÃO ---
  const handleSalvarEdicao = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/auth/usuarios/${editando.id}`, {
        nome: editando.nome,
        usuario: editando.usuario,
        senha: editando.senha || '', // Senha opcional
        tipo: editando.tipo,
        especialidade: editando.especialidade
      });
      alert("✅ Usuário atualizado!");
      setEditando(null);
      carregarUsuarios();
    } catch (err) {
      alert("❌ Erro ao atualizar dados.");
    }
  };

  return (
    <div style={{ animation: 'fadeIn 0.5s' }}>
      <h3 style={{ marginBottom: '20px' }}>👥 Gerenciamento de Usuários</h3>

      {/* SE ESTIVER EDITANDO, MOSTRA FORM DE EDIÇÃO */}
      {editando ? (
        <div style={cardForm}>
          <h4>✏️ Editar Usuário</h4>
          <form onSubmit={handleSalvarEdicao} style={gridForm}>
            <div style={inputGroup}>
              <label style={labelStyle}>Nome</label>
              <input style={inputStyle} value={editando.nome} onChange={e => setEditando({...editando, nome: e.target.value})} required />
            </div>
            <div style={inputGroup}>
              <label style={labelStyle}>Login (E-mail)</label>
              <input style={inputStyle} value={editando.usuario} onChange={e => setEditando({...editando, usuario: e.target.value})} required />
            </div>
            <div style={inputGroup}>
              <label style={labelStyle}>Nova Senha (deixe vazio para manter)</label>
              <input type="password" style={inputStyle} placeholder="******" onChange={e => setEditando({...editando, senha: e.target.value})} />
            </div>
            <div style={inputGroup}>
              <label style={labelStyle}>Tipo</label>
              <select style={inputStyle} value={editando.tipo} onChange={e => setEditando({...editando, tipo: e.target.value})}>
                <option value="admin">Administrador</option>
                <option value="mecanico">Mecânico</option>
              </select>
            </div>
            <div style={inputGroup}>
              <label style={labelStyle}>Especialidade</label>
              <input style={inputStyle} value={editando.especialidade} onChange={e => setEditando({...editando, especialidade: e.target.value})} />
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button type="submit" style={btnSalvar}>Gravar Alterações</button>
              <button type="button" onClick={() => setEditando(null)} style={btnCancelar}>Cancelar</button>
            </div>
          </form>
        </div>
      ) : (
        <>
          {/* Formulário de Cadastro (Original) */}
          <div style={cardForm}>
            <h4>Cadastrar Novo Usuário</h4>
            <form onSubmit={handleCadastrar} style={formStyle}>
              <input type="text" placeholder="Nome" required value={novoUsuario.nome} onChange={(e) => setNovoUsuario({...novoUsuario, nome: e.target.value})} style={inputStyle} />
              <input type="email" placeholder="E-mail" required value={novoUsuario.email} onChange={(e) => setNovoUsuario({...novoUsuario, email: e.target.value})} style={inputStyle} />
              <input type="password" placeholder="Senha" required value={novoUsuario.senha} onChange={(e) => setNovoUsuario({...novoUsuario, senha: e.target.value})} style={inputStyle} />
              <select value={novoUsuario.role} onChange={(e) => setNovoUsuario({...novoUsuario, role: e.target.value})} style={inputStyle}>
                <option value="admin">Administrador</option>
                <option value="mecanico">Mecânico</option>
              </select>
              <button type="submit" style={btnSalvar}>Criar Conta</button>
            </form>
            {mensagem && <p style={{ marginTop: '10px', color: mensagem.includes('✅') ? 'green' : 'red' }}>{mensagem}</p>}
          </div>

          {/* Tabela */}
          <div style={tabelaContainer}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8f9fa', textAlign: 'left' }}>
                  <th style={thTd}>Nome</th>
                  <th style={thTd}>Cargo/Tipo</th>
                  <th style={thTd}>Status</th>
                  <th style={thTd}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map(u => (
                  <tr key={u.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={thTd}>{u.nome}</td>
                    <td style={thTd}><span style={badgeRole}>{u.tipo}</span></td>
                    <td style={thTd}>
                       <span style={{ color: u.status === 'ativo' ? '#2ecc71' : '#e74c3c', fontWeight: 'bold' }}>
                        ● {u.status === 'ativo' ? 'Ativo' : 'Inativo'}
                       </span>
                    </td>
                    <td style={thTd}>
                      <button onClick={() => setEditando(u)} style={{ ...btnAcao, color: '#3498db' }}>✏️ Editar</button>
                      <button onClick={() => handleAlternarStatus(u.id, u.status)} style={{ ...btnAcao, color: u.status === 'ativo' ? '#f39c12' : '#27ae60', marginLeft: '10px' }}>
                        {u.status === 'ativo' ? '🚫 Desativar' : '✅ Ativar'}
                      </button>
                      <button onClick={() => handleExcluir(u.id)} style={{ ...btnAcao, color: '#e74c3c', marginLeft: '10px' }}>🗑️ Excluir</button>
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

// --- ESTILOS ---
const cardForm = { backgroundColor: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', marginBottom: '30px' };
const gridForm = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' };
const inputGroup = { display: 'flex', flexDirection: 'column' };
const labelStyle = { fontSize: '12px', fontWeight: 'bold', color: '#666', marginBottom: '4px' };
const formStyle = { display: 'flex', gap: '10px', flexWrap: 'wrap' };
const inputStyle = { padding: '10px', borderRadius: '6px', border: '1px solid #ddd', flex: '1', minWidth: '150px' };
const btnSalvar = { padding: '10px 20px', backgroundColor: '#2ecc71', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' };
const btnCancelar = { padding: '10px 20px', backgroundColor: '#95a5a6', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' };
const tabelaContainer = { backgroundColor: '#fff', padding: '15px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' };
const thTd = { padding: '12px', borderBottom: '1px solid #eee' };
const badgeRole = { backgroundColor: '#e1f5fe', color: '#01579b', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', textTransform: 'uppercase', fontWeight: 'bold' };
const btnAcao = { background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold', padding: '5px' };

export default UsuariosAba;