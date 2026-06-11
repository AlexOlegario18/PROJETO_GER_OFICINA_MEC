import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './ui/Button';
import Card from './ui/Card';
import CadastroAba from './Abas/CadastroAba';
import FrotaAba from './Abas/FrotaAba';
import UsuariosAba from './Abas/UsuariosAba';
import NovaOSAba from './Abas/NovaOSAba';
import GestaoOSAba from './Abas/GestaoOSAba';
import RelatoriosAba from './Abas/RelatoriosAba';

const AdminPainel = () => {
  const [abaAtiva, setAbaAtiva] = useState('cadastro');
  const navigate = useNavigate();

  const handleSair = () => {
    localStorage.clear();
    navigate('/');
  };

  const renderConteudo = () => {
    switch (abaAtiva) {
      case 'cadastro':
        return <CadastroAba />;
      case 'nova-os':
        return <NovaOSAba />;
      case 'gestao-os':
        return <GestaoOSAba />;
      case 'frota':
        return <FrotaAba />;
      case 'usuarios':
        return <UsuariosAba />;
      case 'relatorios':
        return <RelatoriosAba />;
      default:
        return <CadastroAba />;
    }
  };

  const getTitulo = () => {
    switch (abaAtiva) {
      case 'cadastro':
        return 'Novo Cadastro de Veículo';
      case 'nova-os':
        return 'Abrir Nova Ordem de Serviço';
      case 'gestao-os':
        return 'Painel de OS';
      case 'frota':
        return 'Cadastro de Clientes';
      case 'usuarios':
        return 'Gerenciar Usuários';
      case 'relatorios':
        return 'Relatórios e Impressão de OS';
      default:
        return 'Painel Administrativo';
    }
  };

  const menuItems = [
    { key: 'cadastro', label: 'Novo Cadastro', icon: '⊕' },
    { key: 'nova-os', label: 'Abrir Nova OS', icon: '🔧' },
    { key: 'gestao-os', label: 'Painel de OS', icon: '☑' },
    { key: 'frota', label: 'Cadastro de Cliente', icon: '🚗' },
    { key: 'usuarios', label: 'Gerenciar Usuários', icon: '👥' },
    { key: 'relatorios', label: 'Relatórios / Imprimir', icon: '📊' },
  ];

  return (
    <div className="admin-shell">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2 className="sidebar-title">Oficina Pro</h2>
          <p className="sidebar-subtitle">Administração</p>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.key}
              type="button"
              className={`sidebar-button ${abaAtiva === item.key ? 'active' : ''}`}
              onClick={() => setAbaAtiva(item.key)}
            >
              <span style={{ fontSize: '18px', marginRight: '8px' }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <Button variant="danger" className="button--full-width" onClick={handleSair}>
            🚪 Sair do Sistema
          </Button>
        </div>
      </aside>

      <main className="admin-main">
        <div className="admin-header">
          <div>
            <h3 className="admin-title">{getTitulo()}</h3>
            <p className="admin-subtitle">Menu Principal / {abaAtiva.toUpperCase()}</p>
          </div>
        </div>

        <div className="admin-content">
          <Card className="admin-card">{renderConteudo()}</Card>
        </div>
      </main>
    </div>
  );
};

export default AdminPainel;

