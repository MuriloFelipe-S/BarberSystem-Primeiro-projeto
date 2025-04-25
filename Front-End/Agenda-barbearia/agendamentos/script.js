if (typeof API_BASE_URL === 'undefined') {
  API_BASE_URL = 'http://localhost:8080';
}

async function getApiErrorMessage(response) {
  let errorMsg = "Erro ao se comunicar com o servidor.";
  try {
    const errorData = await response.json();
    errorMsg =
      errorData.message || errorData.error || JSON.stringify(errorData);
  } catch {
    try {
      errorMsg = await response.text();
      if (!errorMsg) {
        errorMsg = `Erro ${response.status}: ${
          response.statusText || "Falha na requisição"
        }`;
      }
    } catch {
      errorMsg = `Erro ${response.status}: ${
        response.statusText || "Falha na requisição"
      }`;
    }
  }
  return errorMsg;
}

function inicializarAgendamentosPage() {
  const modal = document.getElementById('modal');
  const abrirModal = document.getElementById('abrirModal');
  const fecharModal = document.querySelector('.close');
  const form = document.getElementById('form');
  const modalTitle = document.getElementById('modal-title');
  const formButton = form.querySelector('button');
  let editandoId = null;

  abrirModal.onclick = () => {
    form.reset();
    editandoId = null;
    modalTitle.textContent = 'Novo Agendamento';
    formButton.textContent = 'Salvar';
    modal.style.display = 'flex';
  };

  fecharModal.onclick = () => {
    modal.style.display = 'none';
  };

  window.onclick = e => {
    if (e.target == modal) modal.style.display = 'none';
  };

  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const cliente = document.getElementById('cliente').value;
    const barbeiro = document.getElementById('barbeiro').value;
    const servico = document.getElementById('servico').value;
    const dataHora = document.getElementById('dataHora').value;
    const status = document.getElementById('status').value;

    if (!cliente || !barbeiro || !servico || !dataHora || status === "") {
      Swal.fire({
        icon: 'warning',
        title: 'Campos obrigatórios',
        text: 'Preencha todos os campos corretamente.',
        confirmButtonColor: '#ffc107'
      });
      return;
    }

    const agendamento = {
      cliente: { idCliente: cliente },
      barbeiro: { idBarbeiro: barbeiro },
      servico: { idServico: servico },
      dataHora: dataHora + ":00",
      stats: status === 'true'
    };

    const url = editandoId
      ? `${API_BASE_URL}/agenda/${editandoId}`
      : `${API_BASE_URL}/agenda`;
    const metodo = editandoId ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(agendamento)
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          text: `Agendamento ${editandoId ? 'atualizado' : 'cadastrado'} com sucesso.`,
          confirmButtonColor: '#007bff'
        });
        form.reset();
        modal.style.display = 'none';
        carregarAgendamentos();
      } else {
        const errorMsg = await getApiErrorMessage(response);
        throw new Error(errorMsg);
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: error.message || 'Erro na comunicação com o servidor.',
        confirmButtonColor: '#dc3545'
      });
    }
  });

  async function carregarAgendamentos() {
    try {
      const resposta = await fetch(`${API_BASE_URL}/agenda`);
      const agendamentos = await resposta.json();
      const lista = document.getElementById('lista-agendamentos');
      lista.innerHTML = '';

      agendamentos.forEach(a => {
        const li = document.createElement('li');
        li.innerHTML = `
          <div class="info">
            <strong>Cliente:</strong> <span>${a.cliente.nome}</span>
            <strong>Serviço:</strong> <span>${a.servico.tipo}</span>
            <strong>Data:</strong> <span>${new Date(a.dataHora).toLocaleString()}</span>
            <strong>Status:</strong> <span>${a.stats ? 'Confirmado' : 'Pendente'}</span>
          </div>
          <div class="botoes">
            <button class="editar" onclick='editarAgendamento(${JSON.stringify(a)})'>✎</button>
            <button class="excluir" onclick="deletarAgendamento(${a.idAgendamento})">✕</button>
          </div>
        `;
        lista.appendChild(li);
      });
    } catch (error) {
      console.error('Erro ao carregar agendamentos:', error);
    }
  }

  async function carregarSelects() {
    try {
      const [clientesRes, barbeirosRes, servicosRes] = await Promise.all([
        fetch(`${API_BASE_URL}/cliente`),
        fetch(`${API_BASE_URL}/barbeiro`),
        fetch(`${API_BASE_URL}/servico`),
      ]);

      if (!clientesRes.ok)
        throw new Error(`Clientes: ${await getApiErrorMessage(clientesRes)}`);
      if (!barbeirosRes.ok)
        throw new Error(`Barbeiros: ${await getApiErrorMessage(barbeirosRes)}`);
      if (!servicosRes.ok)
        throw new Error(`Serviços: ${await getApiErrorMessage(servicosRes)}`);

      const [clientes, barbeiros, servicos] = await Promise.all([
        clientesRes.json(),
        barbeirosRes.json(),
        servicosRes.json(),
      ]);

      function popularSelect(selectElement, items, valueField, textField, placeholder) {
        selectElement.innerHTML = "";
        const placeholderOption = document.createElement("option");
        placeholderOption.value = "";
        placeholderOption.textContent = placeholder;
        placeholderOption.disabled = true;
        placeholderOption.selected = true;
        selectElement.appendChild(placeholderOption);

        items.forEach((item) => {
          const option = document.createElement("option");
          option.value = item[valueField];
          option.textContent = item[textField];
          selectElement.appendChild(option);
        });
      }

      popularSelect(document.getElementById("cliente"), clientes, "idCliente", "nome", "Selecione um Cliente...");
      popularSelect(document.getElementById("barbeiro"), barbeiros, "idBarbeiro", "nome", "Selecione um Barbeiro...");
      popularSelect(document.getElementById("servico"), servicos, "idServico", "tipo", "Selecione um Serviço...");
    } catch (error) {
      console.error("Erro ao carregar dados para os selects:", error);
      Swal.fire("Erro", `Erro nos dados do formulário: ${error.message}`, "error");
    }
  }

  async function deletarAgendamento(id) {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Deseja realmente excluir este agendamento?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${API_BASE_URL}/agenda/${id}`, {
            method: 'DELETE'
          });

          if (response.ok) {
            Swal.fire('Excluído!', 'Agendamento excluído com sucesso.', 'success');
            carregarAgendamentos();
          } else {
            const errorMsg = await getApiErrorMessage(response);
            throw new Error(errorMsg);
          }
        } catch (error) {
          Swal.fire('Erro!', error.message, 'error');
        }
      }
    });
  }

  function editarAgendamento(agendamento) {
    document.getElementById('cliente').value = agendamento.cliente.idCliente;
    document.getElementById('barbeiro').value = agendamento.barbeiro.idBarbeiro;
    document.getElementById('servico').value = agendamento.servico.idServico;
    document.getElementById('dataHora').value = agendamento.dataHora.substring(0, 16);
    document.getElementById('status').value = agendamento.stats ? 'true' : 'false';

    modalTitle.textContent = 'Atualizar Agendamento';
    formButton.textContent = 'Atualizar';
    editandoId = agendamento.idAgendamento;
    modal.style.display = 'flex';
  }

  window.deletarAgendamento = deletarAgendamento;
  window.editarAgendamento = editarAgendamento;

  carregarSelects();       // ← carrega selects no início
  carregarAgendamentos();  // ← carrega agendamentos no início
}

inicializarAgendamentosPage();
