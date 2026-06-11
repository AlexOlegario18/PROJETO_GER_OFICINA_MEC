const { promisePool } = require('../config/db');
require('dotenv').config();

const seedDatabase = async () => {
  try {
    console.log('Iniciando população do banco de dados...\n');

    console.log('Limpando dados existentes...');
    await promisePool.query('SET FOREIGN_KEY_CHECKS=0');
    await promisePool.query('TRUNCATE TABLE ordens_servico');
    await promisePool.query('TRUNCATE TABLE veiculos');
    await promisePool.query('TRUNCATE TABLE clientes');
    await promisePool.query('TRUNCATE TABLE usuarios');
    await promisePool.query('SET FOREIGN_KEY_CHECKS=1');
    console.log('Dados limpos com sucesso!\n');

    console.log('Inserindo usuários...');
    const usuarios = [
      { nome: 'ADMINISTRADOR', usuario: 'admin', senha: '123', tipo: 'admin', especialidade: null },
      { nome: 'João Silva', usuario: 'joao@email.com', senha: '123', tipo: 'mecanico', especialidade: 'Geral' },
      { nome: 'Maria Santos', usuario: 'maria@email.com', senha: '123', tipo: 'mecanico', especialidade: 'Transmissão' },
      { nome: 'Pedro Oliveira', usuario: 'pedro@email.com', senha: '123', tipo: 'mecanico', especialidade: 'Motor' },
      { nome: 'Carlos Costa', usuario: 'carlos@email.com', senha: '123', tipo: 'mecanico', especialidade: 'Elétrica' }
    ];

    for (const usuario of usuarios) {
      await promisePool.query(
        'INSERT INTO usuarios (nome, usuario, senha, tipo, especialidade, status) VALUES (?, ?, ?, ?, ?, ?)',
        [usuario.nome, usuario.usuario, usuario.senha, usuario.tipo, usuario.especialidade, 'ativo']
      );
    }
    console.log(`${usuarios.length} usuários inseridos!\n`);

    console.log('Inserindo clientes...');
    const clientes = [
      {
        nome: 'João Pereira',
        cpf_cnpj: '123.456.789-00',
        telefone: '(35) 99999-1111',
        email: 'joao.pereira@email.com',
        endereco: 'Rua das Flores, 123 - Centro'
      },
      {
        nome: 'Maria Silva',
        cpf_cnpj: '987.654.321-00',
        telefone: '(35) 99999-2222',
        email: 'maria.silva@email.com',
        endereco: 'Av. Principal, 456 - Bairro'
      },
      {
        nome: 'Transportes XYZ LTDA',
        cpf_cnpj: '12.345.678/0001-99',
        telefone: '(35) 99999-3333',
        email: 'contato@transportesxyz.com.br',
        endereco: 'Rod. MG-429, Km 10 - Industrial'
      },
      {
        nome: 'Carlos Costa',
        cpf_cnpj: '456.789.123-00',
        telefone: '(35) 99999-4444',
        email: 'carlos.costa@email.com',
        endereco: 'Rua B, 789 - Zona Sul'
      },
      {
        nome: 'Empresa Logística ABC',
        cpf_cnpj: '98.765.432/0001-88',
        telefone: '(35) 99999-5555',
        email: 'logistica@abc.com.br',
        endereco: 'Av. Industrial, 1000 - Galpão'
      }
    ];

    for (const cliente of clientes) {
      await promisePool.query(
        'INSERT INTO clientes (nome, cpf_cnpj, telefone, email, endereco) VALUES (?, ?, ?, ?, ?)',
        [cliente.nome, cliente.cpf_cnpj, cliente.telefone, cliente.email, cliente.endereco]
      );
    }
    console.log(`${clientes.length} clientes inseridos!\n`);

    console.log('Inserindo veículos...');
    const veiculos = [
      {
        cliente_id: 1,
        placa: 'ABC-1234',
        marca: 'Volkswagen',
        modelo: 'Gol',
        ano: 2018,
        cor: 'Branco',
        km: 45000,
        combustivel: 'Flex'
      },
      {
        cliente_id: 1,
        placa: 'XYZ-5678',
        marca: 'Ford',
        modelo: 'Fiesta',
        ano: 2020,
        cor: 'Prata',
        km: 28000,
        combustivel: 'Gasolina'
      },
      {
        cliente_id: 2,
        placa: 'DEF-9012',
        marca: 'Chevrolet',
        modelo: 'Corsa',
        ano: 2019,
        cor: 'Preto',
        km: 52000,
        combustivel: 'Flex'
      },
      {
        cliente_id: 3,
        placa: 'GHI-3456',
        marca: 'Scania',
        modelo: 'Truck P360',
        ano: 2017,
        cor: 'Vermelho',
        km: 185000,
        combustivel: 'Diesel'
      },
      {
        cliente_id: 3,
        placa: 'JKL-7890',
        marca: 'Volvo',
        modelo: 'FH 400',
        ano: 2016,
        cor: 'Azul',
        km: 215000,
        combustivel: 'Diesel'
      },
      {
        cliente_id: 4,
        placa: 'MNO-1234',
        marca: 'Fiat',
        modelo: 'Palio',
        ano: 2021,
        cor: 'Cinza',
        km: 15000,
        combustivel: 'Flex'
      },
      {
        cliente_id: 5,
        placa: 'PQR-5678',
        marca: 'Renault',
        modelo: 'Master',
        ano: 2019,
        cor: 'Branco',
        km: 98000,
        combustivel: 'Diesel'
      }
    ];

    for (const veiculo of veiculos) {
      await promisePool.query(
        'INSERT INTO veiculos (cliente_id, placa, marca, modelo, ano, cor, km, combustivel) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [
          veiculo.cliente_id,
          veiculo.placa,
          veiculo.marca,
          veiculo.modelo,
          veiculo.ano,
          veiculo.cor,
          veiculo.km,
          veiculo.combustivel
        ]
      );
    }
    console.log(`${veiculos.length} veículos inseridos!\n`);

    console.log('Inserindo ordens de serviço...');
    const ordens = [
      {
        cliente_id: 1,
        veiculo_id: 1,
        mecanico_id: 2,
        descricao_problema: 'Barulho estranho no motor ao acelerar',
        servico_realizado: 'Limpeza de injetor e sincronismo checado',
        valor_pecas: 150.00,
        valor_mao_de_obra: 200.00,
        status: 'Finalizada',
        observacoes_mecanico: 'Problema resolvido. Motor funcionando normalmente.',
        servicos_executados: 'Limpeza de injetor, teste de pressão',
        pecas_substituidas: 'Nenhuma',
        data_entrada: new Date('2026-05-10'),
        data_saida: new Date('2026-05-11')
      },
      {
        cliente_id: 2,
        veiculo_id: 3,
        mecanico_id: 3,
        descricao_problema: 'Pneus desgastados e alinhamento desregulado',
        servico_realizado: 'Substituição de pneus e alinhamento',
        valor_pecas: 600.00,
        valor_mao_de_obra: 150.00,
        status: 'Finalizada',
        observacoes_mecanico: 'Alinhamento realizado com sucesso.',
        servicos_executados: 'Alinhamento, balanceamento de pneus',
        pecas_substituidas: '4 pneus 185/65 R15',
        data_entrada: new Date('2026-05-08'),
        data_saida: new Date('2026-05-09')
      },
      {
        cliente_id: 1,
        veiculo_id: 2,
        mecanico_id: 4,
        descricao_problema: 'Sistema elétrico com problemas - bateria descarrega rápido',
        servico_realizado: null,
        valor_pecas: 0.00,
        valor_mao_de_obra: 0.00,
        status: 'Em Andamento',
        observacoes_mecanico: 'Aguardando diagnóstico mais detalhado. Testando alternador.',
        servicos_executados: 'Teste inicial do sistema elétrico',
        pecas_substituidas: null,
        data_entrada: new Date('2026-05-15'),
        data_saida: null
      },
      {
        cliente_id: 3,
        veiculo_id: 4,
        mecanico_id: 2,
        descricao_problema: 'Vazamento de óleo no motor',
        servico_realizado: null,
        valor_pecas: 0.00,
        valor_mao_de_obra: 0.00,
        status: 'Aberta',
        observacoes_mecanico: 'Ordem recém aberta. Aguardando agendamento.',
        servicos_executados: null,
        pecas_substituidas: null,
        data_entrada: new Date('2026-05-16'),
        data_saida: null
      },
      {
        cliente_id: 4,
        veiculo_id: 6,
        mecanico_id: 5,
        descricao_problema: 'Revisão preventiva - troca de óleo e filtros',
        servico_realizado: 'Troca de óleo, filtro de ar e filtro de combustível',
        valor_pecas: 180.00,
        valor_mao_de_obra: 120.00,
        status: 'Finalizada',
        observacoes_mecanico: 'Revisão completa realizada. Veículo pronto.',
        servicos_executados: 'Troca de óleo, filtro de ar, filtro combustível',
        pecas_substituidas: '1L óleo 5W40, filtro ar, filtro combustível',
        data_entrada: new Date('2026-05-12'),
        data_saida: new Date('2026-05-12')
      },
      {
        cliente_id: 5,
        veiculo_id: 7,
        mecanico_id: 3,
        descricao_problema: 'Freios com desgaste - necessário troca de pastilhas',
        servico_realizado: null,
        valor_pecas: 0.00,
        valor_mao_de_obra: 0.00,
        status: 'Aberta',
        observacoes_mecanico: 'Esperando aprovação do cliente para peças importadas.',
        servicos_executados: null,
        pecas_substituidas: null,
        data_entrada: new Date('2026-05-14'),
        data_saida: null
      }
    ];

    for (const ordem of ordens) {
      await promisePool.query(
        `INSERT INTO ordens_servico 
         (cliente_id, veiculo_id, mecanico_id, descricao_problema, servico_realizado, 
          valor_pecas, valor_mao_de_obra, status, observacoes_mecanico, 
          servicos_executados, pecas_substituidas, data_entrada, data_saida) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          ordem.cliente_id,
          ordem.veiculo_id,
          ordem.mecanico_id,
          ordem.descricao_problema,
          ordem.servico_realizado,
          ordem.valor_pecas,
          ordem.valor_mao_de_obra,
          ordem.status,
          ordem.observacoes_mecanico,
          ordem.servicos_executados,
          ordem.pecas_substituidas,
          ordem.data_entrada,
          ordem.data_saida
        ]
      );
    }
    console.log(`${ordens.length} ordens de serviço inseridas!\n`);

    console.log('Database seeded com sucesso!');
    console.log('\nResumo:');
    console.log(`   - ${usuarios.length} usuários`);
    console.log(`   - ${clientes.length} clientes`);
    console.log(`   - ${veiculos.length} veículos`);
    console.log(`   - ${ordens.length} ordens de serviço`);
    console.log('\nSeu banco de dados está pronto para uso!\n');

    process.exit(0);
  } catch (error) {
    console.error('Erro ao popular o banco de dados:', error);
    process.exit(1);
  }
};

seedDatabase();
