async function authFetch(url, options = {}) {
  const token = localStorage.getItem("token");

  if (!options.headers) {
    options.headers = {};
  }

  options.headers["Authorization"] = `Bearer ${token}`;

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw response;
    }
    return response;
  } catch (err) {
    if (err instanceof Response) {
      const mensagem = await getApiErrorMessage(err);
      throw new Error(mensagem);
    } else {
      throw new Error("Erro de conexão com o servidor.");
    }
  }
}

// Função para buscar dados da API e atualizar as informações da dashboard
async function fetchData() {
    try {
        // Faz a requisição para a API na URL especificada
        const response = await authFetch('http://localhost:8080/agenda');

        // Verifica se a resposta foi OK (status HTTP 200-299)
        if (!response.ok) {
            // Se não, lança um erro com o status da requisição
            throw new Error('Erro na requisição: ' + response.status);
        }

        // Converte a resposta JSON para objeto JavaScript
        const data = await response.json();
        console.log(data);

        // Quantidade total de agendamentos retornados
        const quantidadeAgendamentos = data.length;

        // Calcula o faturamento total somando o valor de todos os serviços de todos os agendamentos
        const faturamentoTotal = data.reduce((total, agendamento) => {
            // Soma os valores dos serviços do agendamento atual
            const totalServico = agendamento.servicos.reduce((servicoTotal, servico) => {
                return servicoTotal + servico.valor;
            }, 0);
            // Acumula no total geral
            return total + totalServico;
        }, 0);

        // Atualiza o elemento HTML com o total de agendamentos
        document.getElementById('agendamentos-count').textContent = quantidadeAgendamentos;
        // Atualiza o elemento HTML com o faturamento total formatado com 2 casas decimais
        document.getElementById('faturamento-total').textContent = `R$ ${faturamentoTotal.toFixed(2)}`;

        // Cria um Set com nomes de clientes para obter a quantidade de clientes únicos
        const clientesUnicos = new Set(data.map(agendamento => agendamento.cliente.nome));
        // Atualiza o elemento HTML com a quantidade de clientes únicos
        document.getElementById('clientes-count').textContent = clientesUnicos.size;

        // Obtém a data atual no formato YYYY-MM-DD para filtrar agendamentos do dia
        const hoje = new Date().toISOString().split('T')[0];
        // Filtra agendamentos cuja dataHora começa com a data de hoje
        const agendamentosHoje = data.filter(a => a.dataHora.startsWith(hoje));

        // Soma o valor total dos serviços dos agendamentos do dia
        const totalHoje = agendamentosHoje.reduce((total, agendamento) => {
            return total + agendamento.servicos.reduce((soma, s) => soma + s.valor, 0);
        }, 0);

        // Atualiza elementos HTML com a quantidade e faturamento dos agendamentos de hoje
        document.getElementById('agendamentos-hoje').textContent = agendamentosHoje.length;
        document.getElementById('faturamento-hoje').textContent = `R$ ${totalHoje.toFixed(2)}`;

        // Chama função para criar gráfico de pizza com os dados
        createGraph(data);
        // Chama função para criar gráfico de barras da receita por dia da semana
        createRevenueByDayGraph(data);
        // Renderiza os top 3 serviços mais agendados
        renderTopServices(data, 3);

        // Configura filtro de mês para o gráfico de faturamento mensal
        const inputMes = document.getElementById('filtro-mes');
        // Define o valor inicial do filtro para o mês atual (YYYY-MM)
        const mesAtual = new Date().toISOString().slice(0, 7);
        inputMes.value = mesAtual;
        // Cria o gráfico de faturamento mensal para o mês atual
        createMonthlyRevenueLineChart(data, mesAtual);

        // Atualiza o gráfico ao mudar o valor do filtro
        inputMes.addEventListener('change', () => {
            createMonthlyRevenueLineChart(data, inputMes.value);
        });

    } catch (error) {
        // Caso ocorra erro na requisição ou processamento, mostra no console
        console.error("Erro ao buscar dados:", error);
    }
}

// Gráfico de barras: Receita total por dia da semana (Domingo a Sábado)
function createRevenueByDayGraph(data) {
    // Contexto do canvas do gráfico
    const ctx = document.getElementById('grafico-receita-dia').getContext('2d');
    // Inicializa um array com 7 posições para receita de cada dia da semana (0=Domingo, 6=Sábado)
    const receitaPorDia = [0, 0, 0, 0, 0, 0, 0];

    // Percorre todos os agendamentos
    data.forEach(agendamento => {
        const dataHora = new Date(agendamento.dataHora);
        const diaSemana = dataHora.getDay(); // Retorna índice do dia da semana
        // Soma o valor dos serviços desse agendamento
        const valorTotal = agendamento.servicos.reduce((acc, s) => acc + s.valor, 0);
        // Acumula o valor no dia da semana correspondente
        receitaPorDia[diaSemana] += valorTotal;
    });

    // Labels para o eixo X representando os dias da semana abreviados
    const labels = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

    // Se já existir um gráfico, destrói para evitar sobreposição
    if (window.revenueChart) window.revenueChart.destroy();

    // Cria o gráfico de barras com os dados de receita por dia
    window.revenueChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Receita por dia da semana (R$)',
                data: receitaPorDia,
                backgroundColor: '#007bff' // Cor azul para as barras
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { callback: val => `R$ ${val}` } // Formata ticks do eixo Y como valores monetários
                }
            }
        }
    });
}

// Gráfico de pizza (doughnut): Distribuição da quantidade de serviços por tipo
function createGraph(data) {
    const ctx = document.getElementById('grafico').getContext('2d');

    // Extrai todos os tipos de serviços de todos os agendamentos, criando uma lista só com os tipos
    const servicos = data.flatMap(agendamento =>
        agendamento.servicos.map(servico => servico.tipo)
    );

    // Conta a quantidade de cada tipo de serviço usando reduce em um objeto acumulador
    const quantidadePorServico = servicos.reduce((acc, tipo) => {
        acc[tipo] = (acc[tipo] || 0) + 1;
        return acc;
    }, {});

    // Obtém os nomes dos serviços (labels) e as quantidades (valores) para o gráfico
    const labels = Object.keys(quantidadePorServico);
    const dataValues = Object.values(quantidadePorServico);

    // Gera uma cor aleatória para cada serviço para as fatias do gráfico
    const backgroundColors = labels.map(() => {
        // Gera valores RGB entre 100 e 255 para cores mais claras e visíveis
        const r = Math.floor(Math.random() * 156) + 100;
        const g = Math.floor(Math.random() * 156) + 100;
        const b = Math.floor(Math.random() * 156) + 100;
        return `rgb(${r}, ${g}, ${b})`;
    });

    // Cria o gráfico doughnut (pizza)
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                label: 'Distribuição de Serviços',
                data: dataValues,
                backgroundColor: backgroundColors,
                borderColor: '#fff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#333',
                        font: { size: 14 }
                    }
                },
                tooltip: {
                    callbacks: {
                        // Personaliza o texto do tooltip para mostrar quantidade de agendamentos
                        label: context => `${context.label}: ${context.raw} agendamentos`
                    }
                }
            }
        }
    });

    // Atualiza o ranking lateral com a contagem dos serviços
    renderRanking(quantidadePorServico);
}

// Renderiza o ranking dos serviços, ordenando por quantidade de agendamentos
function renderRanking(servicosContagem) {
    const rankingContainer = document.getElementById('ranking-servicos');
    rankingContainer.innerHTML = ''; // Limpa o conteúdo anterior

    // Converte o objeto em array e ordena decrescente pela quantidade
    const ranking = Object.entries(servicosContagem)
        .sort((a, b) => b[1] - a[1]);

    // Cria elementos <li> para cada serviço e insere no container
    ranking.forEach(([tipo, quantidade]) => {
        const li = document.createElement('li');
        li.textContent = `${tipo} - ${quantidade}x`;
        rankingContainer.appendChild(li);
    });
}

// Renderiza os top N serviços mais agendados com medalhas
function renderTopServices(data, topN) {
    // Conta a quantidade total de cada tipo de serviço
    const contagemServicos = data.flatMap(agendamento => agendamento.servicos)
        .reduce((acc, servico) => {
            acc[servico.tipo] = (acc[servico.tipo] || 0) + 1;
            return acc;
        }, {});

    // Ordena os serviços pelo número de agendamentos e seleciona os top N
    const topServices = Object.entries(contagemServicos)
        .sort((a, b) => b[1] - a[1])
        .slice(0, topN);

    const container = document.getElementById('top-servicos');
    container.innerHTML = ''; // Limpa conteúdo anterior

    // Ordem personalizada das medalhas: 2º lugar prata, 1º ouro, 3º bronze
    const medalOrder = ["🥈", "🥇", "🥉"];
    const medalClasses = ['silver', 'gold', 'bronze'];

    // Para cada serviço do top N, cria um card com medalha, nome e quantidade
    topServices.forEach(([tipo, quantidade], index) => {
        const div = document.createElement('div');
        div.classList.add('top-card');

        const medalSpan = document.createElement('span');
        medalSpan.textContent = medalOrder[index] || '';
        medalSpan.classList.add('medal', medalClasses[index]);

        const tipoSpan = document.createElement('span');
        tipoSpan.textContent = tipo;

        const quantidadeSpan = document.createElement('span');
        quantidadeSpan.textContent = `${quantidade}x`;

        div.append(medalSpan, tipoSpan, quantidadeSpan);
        container.appendChild(div);
    });
}

// Gráfico de linha: Faturamento mensal por dia para o mês selecionado
function createMonthlyRevenueLineChart(data, mesAno) {
    const ctx = document.getElementById('grafico-faturamento-mensal').getContext('2d');

    // Extrai o ano e mês no formato YYYY-MM
    const [ano, mes] = mesAno.split('-');

    // Filtra agendamentos que começam com o mês e ano selecionados (YYYY-MM)
    const agendamentosMes = data.filter(a => a.dataHora.startsWith(mesAno));

    // Mapeia cada dia do mês para o total de faturamento
    const faturamentoPorDia = {};

    agendamentosMes.forEach(agendamento => {
        const dia = agendamento.dataHora.slice(8, 10); // pega dia DD
        const valorTotal = agendamento.servicos.reduce((acc, s) => acc + s.valor, 0);

        if (faturamentoPorDia[dia]) {
            faturamentoPorDia[dia] += valorTotal;
        } else {
            faturamentoPorDia[dia] = valorTotal;
        }
    });

    // Prepara arrays para labels (dias do mês) e valores (faturamento)
    const diasDoMes = [];
    const valoresFaturamento = [];

    // Calcula quantos dias tem o mês
    const numDias = new Date(ano, mes, 0).getDate();

    for (let i = 1; i <= numDias; i++) {
        // Formata o dia com 2 dígitos
        const diaStr = i.toString().padStart(2, '0');
        diasDoMes.push(diaStr);
        valoresFaturamento.push(faturamentoPorDia[diaStr] || 0);
    }

    // Destrói gráfico anterior para evitar sobreposição
    if (window.monthlyRevenueChart) window.monthlyRevenueChart.destroy();

    // Cria gráfico de linha com faturamento diário
    window.monthlyRevenueChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: diasDoMes,
            datasets: [{
                label: 'Faturamento Diário (R$)',
                data: valoresFaturamento,
                fill: false,
                borderColor: '#007bff',
                tension: 0.1,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: val => `R$ ${val.toFixed(2)}`
                    }
                }
            }
        }
    });
}

// Chama a função principal ao carregar a página para iniciar os dados da dashboard
fetchData();
