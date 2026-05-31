import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import {
  Container,
  Header,
  ActionButton,
  TableContainer,
  Table,
  StatusBadge,
  ModalOverlay,
  ModalContent,
  FormGroup,
  FlexButtons
} from './styles';
import Button from '../../components/UI/Button';

const AdminPanel = () => {
  const { user, logout } = useAuth();
  const [osList, setOsList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mecanicos, setMecanicos] = useState([]);
  const [veiculosClientes, setVeiculosClientes] = useState([]);

  // Form states
  const [selectedVeiculo, setSelectedVeiculo] = useState(''); // Guarda o JSON stringificado do veículo para ter os IDs
  const [mecanicoId, setMecanicoId] = useState('');
  const [descricao, setDescricao] = useState('');

  const fetchOS = async () => {
    try {
      const data = await api.get('/os/listar?cargo=admin');
      setOsList(data);
    } catch (err) {
      console.error(err);
      alert('Erro ao carregar Ordens de Serviço');
    }
  };

  const fetchMecanicos = async () => {
    try {
      const data = await api.get('/usuarios');
      setMecanicos(data.filter(u => u.tipo === 'mecanico' && u.status === 'ativo'));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchVeiculosClientes = async () => {
    try {
      const data = await api.get('/clientes/veiculos-todos');
      setVeiculosClientes(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOS();
    fetchMecanicos();
    fetchVeiculosClientes();
  }, []);

  const handleCreateOS = async (e) => {
    e.preventDefault();
    if (!selectedVeiculo || !mecanicoId || !descricao) {
      return alert("Preencha todos os campos obrigatórios.");
    }

    const veiculoData = JSON.parse(selectedVeiculo);
    setLoading(true);
    try {
      await api.post('/os/criar', {
        cliente_id: veiculoData.cliente_id,
        veiculo_id: veiculoData.id,
        mecanico_id: mecanicoId,
        descricao_problema: descricao,
        status: 'Aberta'
      });
      alert('OS criada com sucesso!');
      setIsModalOpen(false);
      setDescricao('');
      setSelectedVeiculo('');
      setMecanicoId('');
      fetchOS();
    } catch (err) {
      alert(err.message || 'Erro ao criar OS');
    } finally {
      setLoading(false);
    }
  };

  const handleChangeStatus = async (osId, novoStatus) => {
    try {
      await api.put(`/os/${osId}/progresso`, {
        status: novoStatus
      });
      alert(`OS ${novoStatus} com sucesso!`);
      fetchOS();
    } catch (err) {
      alert('Erro ao alterar status da OS');
    }
  };

  return (
    <Container>
      <Header>
        <h1>Painel Administrativo - Olá, {user?.nome}</h1>
        <div>
          <ActionButton onClick={() => setIsModalOpen(true)} style={{ marginRight: '1rem' }}>
            + Nova OS
          </ActionButton>
          <ActionButton onClick={logout} style={{ background: '#ef4444' }}>
            Sair
          </ActionButton>
        </div>
      </Header>

      <TableContainer>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Veículo / Placa</th>
              <th>Status</th>
              <th>Descrição</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {osList.map(os => (
              <tr key={os.id}>
                <td>#{os.id}</td>
                <td>{os.nome_cliente || `Cliente ${os.cliente_id}`}</td>
                <td>{os.veiculo_modelo ? `${os.veiculo_modelo} - ${os.placa}` : `Veículo ${os.veiculo_id}`}</td>
                <td><StatusBadge status={os.status}>{os.status}</StatusBadge></td>
                <td>{os.descricao_problema}</td>
                <td>
                  {os.status === 'Aguardando Aprovação' && (
                    <>
                      <button onClick={() => handleChangeStatus(os.id, 'Em Andamento')} style={{ marginRight: '8px', color: '#f57c00' }}>
                        Rejeitar (Voltar para Andamento)
                      </button>
                      <button onClick={() => handleChangeStatus(os.id, 'Finalizada')} style={{ color: '#388e3c' }}>
                        Aprovar e Finalizar
                      </button>
                    </>
                  )}
                  {os.status === 'Finalizada' && (
                    <span style={{ color: '#666' }}>Sem ações pendentes</span>
                  )}
                </td>
              </tr>
            ))}
            {osList.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center' }}>Nenhuma OS encontrada.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </TableContainer>

      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <h2>Cadastrar Nova OS</h2>
            <form onSubmit={handleCreateOS}>
              <FormGroup>
                <label>Cliente e Veículo</label>
                <select value={selectedVeiculo} onChange={e => setSelectedVeiculo(e.target.value)} required>
                  <option value="">Selecione o Cliente/Veículo</option>
                  {veiculosClientes.map(v => (
                    <option key={v.id} value={JSON.stringify({ id: v.id, cliente_id: v.cliente_id })}>
                      {v.nome} - {v.marca} {v.modelo} ({v.placa})
                    </option>
                  ))}
                </select>
              </FormGroup>
              <FormGroup>
                <label>Mecânico Responsável</label>
                <select value={mecanicoId} onChange={e => setMecanicoId(e.target.value)} required>
                  <option value="">Selecione um mecânico</option>
                  {mecanicos.map(m => (
                    <option key={m.id} value={m.id}>{m.nome} - {m.especialidade}</option>
                  ))}
                </select>
              </FormGroup>
              <FormGroup>
                <label>Descrição do Problema</label>
                <input 
                  type="text" 
                  value={descricao} 
                  onChange={e => setDescricao(e.target.value)} 
                  required 
                />
              </FormGroup>
              <FlexButtons>
                <Button type="button" onClick={() => setIsModalOpen(false)} style={{ background: '#ccc' }}>Cancelar</Button>
                <Button type="submit" loading={loading} disabled={loading}>Criar OS</Button>
              </FlexButtons>
            </form>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default AdminPanel;
