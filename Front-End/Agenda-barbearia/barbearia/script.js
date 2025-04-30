let agendamentosOriginais = [];

async function inicializarBarbeariaPage() {
  try {
    const resposta = await fetch('http://localhost:8080/agenda');
    const agendamentos = await resposta.json();
    agendamentosOriginais = agendamentos; // Guarda para filtro depois
    gerarRelatorio(agendamentos);

    document.getElementById('filtroMes').addEventListener('change', aplicarFiltro);
    document.getElementById('btnExportar').addEventListener('click', exportarRelatorioPDF);

  } catch (error) {
    console.error('Erro ao carregar relatório:', error);
  }
}

function gerarRelatorio(agendamentos) {
  const faturamentoPorBarbeiro = {};
  let faturamentoTotal = 0;
  let totalAgendamentos = 0;

  agendamentos.forEach(agendamento => {
    if (agendamento.stats) {
      totalAgendamentos++;

      const nomeBarbeiro = agendamento.barbeiro.nome;
      const valorServico = agendamento.servico.valor;
      const comissao = agendamento.barbeiro.comissao;
      const valorBarbeiro = (valorServico * comissao) / 100;

      if (!faturamentoPorBarbeiro[nomeBarbeiro]) {
        faturamentoPorBarbeiro[nomeBarbeiro] = 0;
      }
      faturamentoPorBarbeiro[nomeBarbeiro] += valorBarbeiro;

      faturamentoTotal += valorServico;
    }
  });

  document.getElementById('total-agendamentos').textContent = `Total de Agendamentos Confirmados: ${totalAgendamentos}`;
  document.getElementById('total-faturamento').textContent = `Faturamento Bruto: R$ ${faturamentoTotal.toFixed(2).replace('.', ',')}`;

  gerarGraficoFaturamento(faturamentoPorBarbeiro);
}

function gerarGraficoFaturamento(dados) {
  const ctx = document.getElementById('graficoFaturamento').getContext('2d');
  
  if (window.graficoFaturamento) {
    window.graficoFaturamento.destroy();
  }

  const barbeiros = Object.keys(dados);
  const faturamentos = Object.values(dados);

  window.graficoFaturamento = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: barbeiros,
      datasets: [{
        label: 'Faturamento (R$)',
        data: faturamentos,
        backgroundColor: '#007bff',
        borderColor: '#0056b3',
        borderWidth: 1,
        borderRadius: 8
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return 'R$ ' + value.toFixed(2).replace('.', ',');
            }
          }
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });
}

function aplicarFiltro() {
  const mesSelecionado = document.getElementById('filtroMes').value;
  if (!mesSelecionado) {
    gerarRelatorio(agendamentosOriginais);
    return;
  }

  const filtrados = agendamentosOriginais.filter(agendamento => {
    const mesAgendamento = new Date(agendamento.dataHora).getMonth() + 1;
    return parseInt(mesSelecionado) === mesAgendamento;
  });

  gerarRelatorio(filtrados);
}

function exportarRelatorioPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.text("Relatório da Barbearia", 10, 10);
  doc.text(document.getElementById('total-agendamentos').textContent, 10, 20);
  doc.text(document.getElementById('total-faturamento').textContent, 10, 30);

  doc.save("relatorio-barbearia.pdf");
}

inicializarBarbeariaPage();
