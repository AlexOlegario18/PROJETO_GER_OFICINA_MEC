import React, { useState, useEffect, useCallback, useRef } from 'react';
import { api } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import {
  Container,
  Header,
  ActionButton,
  Grid,
  OSCard,
  StatusBadge,
  ModalOverlay,
  ModalContent,
  FormGroup,
  FlexButtons
} from './styles';
import Button from '../../components/UI/Button';
import { debounce } from '../../utils/debounce';

const MechanicPanel = () => {
  const { user, logout } = useAuth();
  const [osList, setOsList] = useState([]);
  const [selectedOs, setSelectedOs] = useState(null);
  const [loading, setLoading] = useState(false);

  // Form states
  const [servicos, setServicos] = useState('');
  const [pecas, setPecas] = useState('');

  const fetchOS = async () => {
    try {
      // Mecânico só busca suas OS
      const data = await api.get(`/os/listar?cargo=mecanico&mecanico_id=${user.id}`);
      setOsList(data);
    } catch (err) {
      console.error(err);
      alert('Erro ao carregar Ordens de Serviço');
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchOS();
    }
  }, [user]);

  // Debounce saving
  const debouncedSave = useRef(
    debounce(async (osId, dataToSave) => {
      try {
        await api.put(`/os/${osId}/progresso`, dataToSave);
        console.log('Progresso salvo automaticamente (debounced)');
      } catch (err) {
        console.error('Erro ao salvar progresso automaticamente', err);
      }
    }, 1000)
  ).current;

  const handleOpenOS = (os) => {
    setSelectedOs(os);
    setServicos(os.servicos_executados || '');
    setPecas(os.pecas_substituidas || '');
  };

  const handleChangeServicos = (e) => {
    const value = e.target.value;
    setServicos(value);
    
    // Auto-save via debounce
    if (selectedOs) {
      debouncedSave(selectedOs.id, {
        status: selectedOs.status === 'Aberta' ? 'Em Andamento' : selectedOs.status,
        servicos_executados: value,
        pecas_substituidas: pecas
      });
    }
  };

  const handleChangePecas = (e) => {
    const value = e.target.value;
    setPecas(value);
    
    // Auto-save via debounce
    if (selectedOs) {
      debouncedSave(selectedOs.id, {
        status: selectedOs.status === 'Aberta' ? 'Em Andamento' : selectedOs.status,
        servicos_executados: servicos,
        pecas_substituidas: value
      });
    }
  };

  const handleSendToApproval = async () => {
    setLoading(true);
    try {
      await api.put(`/os/${selectedOs.id}/progresso`, {
        status: 'Aguardando Aprovação',
        servicos_executados: servicos,
        pecas_substituidas: pecas
      });
      alert('OS enviada para aprovação do Administrador!');
      setSelectedOs(null);
      fetchOS();
    } catch (err) {
      alert('Erro ao enviar para aprovação');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Header>
        <h1>Painel do Mecânico - Olá, {user?.nome}</h1>
        <ActionButton onClick={logout} style={{ background: '#ef4444' }}>
          Sair
        </ActionButton>
      </Header>

      <h2>Minhas Ordens de Serviço</h2>
      
      <Grid>
        {osList.map(os => (
          <OSCard key={os.id} onClick={() => handleOpenOS(os)}>
            <h3>OS #{os.id}</h3>
            <p><strong>Veículo:</strong> {os.veiculo_modelo} - {os.placa}</p>
            <p><strong>Descrição:</strong> {os.descricao_problema}</p>
            <StatusBadge status={os.status}>{os.status}</StatusBadge>
          </OSCard>
        ))}
        {osList.length === 0 && (
          <p>Nenhuma ordem de serviço atribuída a você no momento.</p>
        )}
      </Grid>

      {selectedOs && (
        <ModalOverlay>
          <ModalContent>
            <h2>Editar OS #{selectedOs.id}</h2>
            <p><strong>Problema relatado:</strong> {selectedOs.descricao_problema}</p>
            
            <FormGroup>
              <label>Serviços Executados</label>
              <textarea 
                value={servicos} 
                onChange={handleChangeServicos} 
                placeholder="Descreva os serviços realizados..."
                disabled={selectedOs.status === 'Finalizada' || selectedOs.status === 'Aguardando Aprovação'}
              />
            </FormGroup>
            
            <FormGroup>
              <label>Peças Substituídas</label>
              <textarea 
                value={pecas} 
                onChange={handleChangePecas} 
                placeholder="Liste as peças substituídas..."
                disabled={selectedOs.status === 'Finalizada' || selectedOs.status === 'Aguardando Aprovação'}
              />
            </FormGroup>

            <FlexButtons>
              <Button type="button" onClick={() => setSelectedOs(null)} style={{ background: '#ccc' }}>
                Fechar
              </Button>
              
              {selectedOs.status !== 'Finalizada' && selectedOs.status !== 'Aguardando Aprovação' && (
                <Button 
                  onClick={handleSendToApproval} 
                  loading={loading} 
                  disabled={loading}
                  style={{ background: '#7b1fa2' }}
                >
                  Enviar p/ Aprovação
                </Button>
              )}
            </FlexButtons>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default MechanicPanel;
