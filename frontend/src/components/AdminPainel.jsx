import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CadastroAba from './Abas/CadastroAba';
import FrotaAba from './Abas/FrotaAba'; 
import UsuariosAba from './Abas/UsuariosAba';
import NovaOSAba from './Abas/NovaOSAba'; 
import GestaoOSAba from './Abas/GestaoOSAba'; 
import RelatoriosAba from './Abas/RelatoriosAba'; // 1. IMPORTADO COM SUCESSO

const AdminPainel = () => {
  const [abaAtiva, setAbaAtiva] = useState('cadastro');
  const navigate = useNavigate();

  const handleSair = () => {
    localStorage.clear(); 
    navigate('/'); 
  };

  const renderConteudo = () => {
    switch (abaAtiva) {
      case 'cadastro': return <CadastroAba />;
      case 'nova-os': return <NovaOSAba />;
      case 'gestao-os': return <GestaoOSAba />;
      case 'frota': return <FrotaAba />;
      case 'usuarios': return <UsuariosAba />;
      case 'relatorios': return <RelatoriosAba />; // 2. RENDERIZANDO A NOVA ABA
      default: return <CadastroAba />;
    }
  };

  const getTitulo = () => {
    switch(abaAtiva) {
      case 'cadastro': return '🆕 Novo Cadastro de Veículo';
      case 'nova-os': return '🛠️ Abrir Nova Ordem de Serviço';
      case 'gestao-os': return '📊 Painel de OS (Gestão da Oficina)';
      case 'frota': return '👤 Cadastro de Clientes';
      case 'usuarios': return '👥 Gerenciar Usuários do Sistema';
      case 'relatorios': return '📈 Relatórios e Impressão de OS'; // 3. TÍTULO ATUALIZADO
      default: return 'Painel Administrativo';
    }
  };

  return (
    <div style={containerStyle}>
      {/* SIDEBAR */}
      <aside style={sidebarStyle}>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h2 style={{ color: '#fff', margin: 0 }}>⚙️ Oficina Pro</h2>
          <p style={{ color: '#85929e', fontSize: '12px' }}>Administração</p>
        </div>
        
        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '5px', padding: '0 10px' }}>
          
          <button 
            style={abaAtiva === 'cadastro' ? btnAtivo : btnStyle} 
            onClick={() => setAbaAtiva('cadastro')}
          >
            🆕 NOVO CADASTRO
          </button>

          <button 
            style={abaAtiva === 'nova-os' ? btnAtivo : btnStyle} 
            onClick={() => setAbaAtiva('nova-os')}
          >
            🛠️ ABRIR NOVA OS
          </button>

          <button 
            style={abaAtiva === 'gestao-os' ? btnAtivo : btnStyle} 
            onClick={() => setAbaAtiva('gestao-os')}
          >
            📊 PAINEL DE OS
          </button>

          <button 
            style={abaAtiva === 'frota' ? btnAtivo : btnStyle} 
            onClick={() => setAbaAtiva('frota')}
          >
            👤 CADASTRO DE CLIENTE
          </button>

          <button 
            style={abaAtiva === 'usuarios' ? btnAtivo : btnStyle} 
            onClick={() => setAbaAtiva('usuarios')}
          >
            👥 GERENCIAR USUÁRIOS
          </button>

          {/* 4. NOVO BOTÃO DE RELATÓRIOS ADICIONADO AQUI */}
          <button 
            style={abaAtiva === 'relatorios' ? btnAtivo : btnStyle} 
            onClick={() => setAbaAtiva('relatorios')}
          >
            📈 RELATÓRIOS / IMPRIMIR
          </button>

        </nav>

        {/* BOTÃO SAIR */}
        <div style={{ padding: '20px', borderTop: '1px solid #3e4f5f' }}>
          <button onClick={handleSair} style={btnSair}>
            🚪 Sair do Sistema
          </button>
        </div>
      </aside>
      
      {/* CONTEÚDO PRINCIPAL */}
      <main style={mainStyle}>
        <div style={headerInterno}>
          <h3 style={{ margin: 0, color: '#2c3e50' }}>
            {getTitulo()}
          </h3>
          <span style={{ fontSize: '13px', color: '#7f8c8d' }}>
            Menu Principal / {abaAtiva.toUpperCase()}
          </span>
        </div>

        <div style={contentCard}>
          {renderConteudo()}
        </div>
      </main>
    </div>
  );
};

// --- ESTILOS MANTIDOS ---
const containerStyle = { display: 'flex', height: '100vh', backgroundColor: '#f0f2f5', fontFamily: 'sans-serif' };
const sidebarStyle = { width: '260px', backgroundColor: '#2c3e50', display: 'flex', flexDirection: 'column', boxShadow: '2px 0 5px rgba(0,0,0,0.1)' };
const mainStyle = { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' };
const headerInterno = { backgroundColor: '#fff', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #dee2e6' };
const contentCard = { flex: 1, padding: '30px', overflowY: 'auto' };

const btnStyle = { 
  padding: '14px 20px', cursor: 'pointer', border: 'none', borderRadius: '8px', 
  backgroundColor: 'transparent', color: '#bdc3c7', textAlign: 'left', 
  fontSize: '13px', transition: '0.2s', fontWeight: 'bold', letterSpacing: '0.5px'
};
const btnAtivo = { ...btnStyle, backgroundColor: '#3498db', color: '#fff' };

const btnSair = { 
  width: '100%', padding: '12px', cursor: 'pointer', border: '1px solid #e74c3c', 
  borderRadius: '8px', backgroundColor: 'transparent', color: '#e74c3c', 
  fontWeight: 'bold', transition: '0.3s' 
};

export default AdminPainel;