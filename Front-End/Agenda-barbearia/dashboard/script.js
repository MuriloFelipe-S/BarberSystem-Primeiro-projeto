    // Função para buscar dados da API
    async function fetchData() {
        try {
            // Fazendo uma requisição para o endpoint '/agenda'
            const response = await fetch('http://localhost:8080/agenda');
            
            // Verificar se a requisição foi bem-sucedida
            if (!response.ok) {
                throw new Error('Erro na requisição: ' + response.status);
            }

            const data = await response.json();

            // Exibir os dados no console para ver o que está sendo retornado
            console.log(data);

            // Calculando a quantidade de agendamentos
            const quantidadeAgendamentos = data.length;

            // Calculando o faturamento total mensal
            const faturamentoTotal = data.reduce((total, agendamento) => {
                const totalServico = agendamento.servicos.reduce((servicoTotal, servico) => {
                    return servicoTotal + servico.valor; // Supondo que 'valor' é o campo do serviço
                }, 0);
                return total + totalServico;
            }, 0);

            // Atualizando os dados no dashboard
            document.getElementById('agendamentos-count').textContent = quantidadeAgendamentos;
            document.getElementById('faturamento-total').textContent = `R$ ${faturamentoTotal.toFixed(2)}`;

            // Chamando a função para criar o gráfico
            createGraph(data);

        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        }
    }

    // Função para criar gráfico
    function createGraph(data) {
        const ctx = document.getElementById('grafico').getContext('2d');

        // Agrupar os dados para o gráfico
        const servicos = data.flatMap(agendamento => agendamento.servicos.map(servico => servico.tipo));
        const quantidadePorServico = servicos.reduce((acc, servico) => {
            acc[servico] = (acc[servico] || 0) + 1;
            return acc;
        }, {});

        const labels = Object.keys(quantidadePorServico);
        const dataValues = Object.values(quantidadePorServico);

        // Criando o gráfico
        new Chart(ctx, {
            type: 'bar', // Tipo de gráfico (barra)
            data: {
                labels: labels,
                datasets: [{
                    label: 'Quantidade de Agendamentos por Serviço',
                    data: dataValues,
                    backgroundColor: 'rgba(52, 152, 219, 0.5)',
                    borderColor: 'rgba(52, 152, 219, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Chama a função para buscar os dados quando a página carregar
    fetchData();