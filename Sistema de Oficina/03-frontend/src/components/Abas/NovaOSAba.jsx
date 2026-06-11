import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const NovaOSAba = () => {
  const [busca, setBusca] = useState('');
  const [sugestoes, setSugestoes] = useState([]);
  const [clienteSel, setClienteSel] = useState(null);
  const [veiculos, setVeiculos] = useState([]);
  const [mecanicos, setMecanicos] = useState([]); 
  
  const [form, setForm] = useState({
    veiculo_id: '',
    mecanico_id: '', 
    descricao_problema: '',
    valor_total: 0
  });

  // 1. Busca de Clientes (Sugestões)
  useEffect(() => {
    if (busca.length > 2 && !clienteSel) {
      const timer = setTimeout(async () => {
        try {
          const res = await api.get(`/clientes/sugestoes?busca=${busca}`);
          setSugestoes(res.data);
        } catch (err) { console.error(err); }
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setSugestoes([]);
    }
  }, [busca, clienteSel]);

  // 2. Carrega Mecânicos
  useEffect(() => {
    const carregarMecanicos = async () => {
      try {
        const res = await api.get('/auth/usuarios'); 
        const lista = res.data.filter(u => 
            u.tipo?.toLowerCase() === 'mecanico' || 
            u.cargo?.toLowerCase() === 'mecanico' ||
            u.funcao?.toLowerCase() === 'mecanico'
        );
        setMecanicos(lista);
      } catch (err) { console.error("Erro ao carregar mecânicos", err); }
    };
    carregarMecanicos();
  }, []);

  const selecionarCliente = async (cliente) => {
    setClienteSel(cliente);
    setBusca(cliente.nome);
    setSugestoes([]);
    try {
      const res = await api.get(`/clientes/${cliente.id}/veiculos`);
      setVeiculos(res.data);
      setForm(prev => ({ ...prev, veiculo_id: '' }));
    } catch (err) { console.error(err); }
  };

  const salvarOS = async (e) => {
    e.preventDefault();
    if (!clienteSel) return alert("Selecione um cliente!");
    if (!form.veiculo_id) return alert("Selecione um veículo!");
    if (!form.mecanico_id) return alert("Atribua um mecânico responsável!");

    try {
      // Montagem dos dados batendo com o que o seu osController espera
      const dadosOS = {
        cliente_id: Number(clienteSel.id),
        veiculo_id: Number(form.veiculo_id),
        mecanico_id: Number(form.mecanico_id),
        descricao_problema: form.descricao_problema,
        valor_total: parseFloat(form.valor_total) || 0, // Garantindo que é número
        status: 'Aberta' // Status inicial padrão unificado
      };

      await api.post('/os/criar', dadosOS);
      alert("✅ Ordem de Serviço aberta com sucesso!");
      
      // Resetar Form após sucesso
      setClienteSel(null); 
      setBusca(''); 
      setVeiculos([]);
      setForm({ veiculo_id: '', mecanico_id: '', descricao_problema: '', valor_total: 0 });
    } catch (err) { 
      // Se der erro, mostra no console para debugar
      const msgErro = err.response?.data?.error || "Erro desconhecido";
      console.error("❌ Erro ao criar OS:", msgErro);
      alert(`Erro ao criar OS: ${msgErro}`); 
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', animation: 'fadeIn 0.5s' }}>
      <h3 style={{ borderBottom: '2px solid #3498db', paddingBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
        <span>⚡ Abrir Nova Ordem de Serviço</span>
      </h3>
      
      <form onSubmit={salvarOS} style={{ marginTop: '20px', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <div style={{ position: 'relative', marginBottom: '20px' }}>
          <label style={labelStyle}>🔍 Buscar Cliente:</label>
          <input 
            style={inputStyle}
            value={busca}
            onChange={(e) => { setBusca(e.target.value); if(clienteSel) setClienteSel(null); }}
            placeholder="Digite o nome do cliente..."
            required
          />
          {sugestoes.length > 0 && (
            <ul style={dropdownStyle}>
              {sugestoes.map(s => (
                <li key={s.id} onClick={() => selecionarCliente(s)} style={itemStyle}>
                  <strong>{s.nome}</strong> - <small>{s.cpf_cnpj}</small>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>🚘 Veículo:</label>
            <select 
                style={inputStyle} 
                disabled={!veiculos.length}
                value={form.veiculo_id}
                onChange={e => setForm({...form, veiculo_id: e.target.value})}
                required
            >
                <option value="">{veiculos.length ? "Selecione a placa..." : "Busque o cliente primeiro"}</option>
                {veiculos.map(v => (
                <option key={v.id} value={v.id}>{v.placa} - {v.modelo}</option>
                ))}
            </select>
            </div>

            <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>👨‍🔧 Mecânico Responsável:</label>
            <select 
                style={inputStyle} 
                value={form.mecanico_id}
                onChange={e => setForm({...form, mecanico_id: e.target.value})}
                required
            >
                <option value="">Selecione o profissional...</option>
                {mecanicos.map(m => (
                <option key={m.id} value={m.id}>{m.nome}</option>
                ))}
            </select>
            </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>📝 Descrição do Problema / Serviço:</label>
          <textarea 
            style={{...inputStyle, height: '80px', resize: 'vertical'}}
            value={form.descricao_problema}
            onChange={e => setForm({...form, descricao_problema: e.target.value})}
            placeholder="Relato do cliente..."
            required
          />
        </div>

        <div style={{ marginBottom: '20px', width: '220px' }}>
          <label style={labelStyle}>💰 Orçamento Inicial (R$):</label>
          <input 
            type="number" 
            step="0.01"
            style={inputStyle}
            value={form.valor_total}
            onChange={e => setForm({...form, valor_total: e.target.value})}
          />
        </div>

        <button type="submit" style={btnStyle}>🚀 GERAR ORDEM DE SERVIÇO</button>
      </form>
    </div>
  );
};

// Estilos mantidos
const labelStyle = { display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#2c3e50', fontSize: '13px' };
const inputStyle = { width: '100%', padding: '12px', marginTop: '5px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '15px', boxSizing: 'border-box' };
const dropdownStyle = { position: 'absolute', width: '100%', background: '#fff', border: '1px solid #ddd', borderRadius: '6px', listStyle: 'none', padding: '0', zIndex: 10, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' };
const itemStyle = { padding: '10px', cursor: 'pointer', borderBottom: '1px solid #eee' };
const btnStyle = { width: '100%', padding: '15px', backgroundColor: '#27ae60', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', boxShadow: '0 4px 10px rgba(39, 174, 96, 0.3)' };

export default NovaOSAba;