if (typeof API_BASE_URL === "undefined") {
  API_BASE_URL = "http://localhost:8080";
}

async function getApiErrorMessage(response) {
  let errorMsg = "Erro ao se comunicar com o servidor.";
  try {
    const errorData = await response.json();
    errorMsg = errorData.message || errorData.error || JSON.stringify(errorData);
  } catch {
    try {
      errorMsg = await response.text();
      if (!errorMsg) {
        errorMsg = `Erro ${response.status}: ${response.statusText || "Falha na requisição"}`;
      }
    } catch {
      errorMsg = `Erro ${response.status}: ${response.statusText || "Falha na requisição"}`;
    }
  }
  return errorMsg;
}

function escapeHTML(str) {
  return str.replace(/[&<>"']/g, tag => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;',
    '"': '&quot;', "'": '&#39;'
  }[tag]));
}

function inicializarAgendamentosPage() {
  const modal = document.getElementById("modal");
  const abrirModal = document.getElementById("abrirModal");
  const fecharModal = document.querySelector(".close");
  const form = document.getElementById("form");
  const modalTitle = document.getElementById("modal-title");
  const formButton = form.querySelector("button");
  let editandoId = null;

  abrirModal.onclick = () => {
    form.reset();
    editandoId = null;
    modalTitle.textContent = "Novo Agendamento";
    formButton.textContent = "Salvar";
    modal.style.display = "flex";
  };

  fecharModal.onclick = () => {
    modal.style.display = "none";
  };

  window.onclick = e => {
    if (e.target == modal) modal.style.display = "none";
  };

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const cliente = document.getElementById("cliente").value;
    const barbeiro = document.getElementById("barbeiro").value;
    const servicosSelecionados = document.querySelectorAll(".servico-item.selecionado");
    const dataHora = document.getElementById("dataHora").value;
    const status = document.getElementById("status").value;

    if (!cliente || !barbeiro || servicosSelecionados.length === 0 || !dataHora || status === "") {
      Swal.fire({
        icon: "warning",
        title: "Campos obrigatórios",
        text: "Preencha todos os campos corretamente.",
        confirmButtonColor: "#ffc107"
      });
      return;
    }

    const servicos = Array.from(servicosSelecionados).map(div => ({ idServico: div.dataset.id }));

    const agendamento = {
      cliente: { idCliente: cliente },
      barbeiro: { idBarbeiro: barbeiro },
      servicos,
      dataHora: dataHora + ":00",
      stats: status === "true"
    };

    const url = editandoId ? `${API_BASE_URL}/agenda/${editandoId}` : `${API_BASE_URL}/agenda`;
    const metodo = editandoId ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(agendamento)
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Sucesso!",
          text: `Agendamento ${editandoId ? "atualizado" : "cadastrado"} com sucesso.`,
          confirmButtonColor: "#007bff"
        });
        form.reset();
        modal.style.display = "none";
        await carregarAgendamentos();
      } else {
        throw new Error(await getApiErrorMessage(response));
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: error.message,
        confirmButtonColor: "#dc3545"
      });
    }
  });

  async function carregarAgendamentos() {
    try {
      const resposta = await fetch(`${API_BASE_URL}/agenda`);
      const agendamentos = await resposta.json();
      const lista = document.getElementById("lista-agendamentos");
      lista.innerHTML = "";

      agendamentos.forEach(a => {
        if (!a.cliente?.nome || !a.servicos?.length) {
          console.warn("Agendamento ignorado (incompleto):", a);
          return;
        }

        const li = document.createElement("li");
        li.innerHTML = `
          <div class="info">
            <strong>Cliente:</strong> <span>${escapeHTML(a.cliente.nome)}</span>
            <strong>Telefone:</strong> <span>${escapeHTML(a.cliente.telefone)}</span>
            <strong>Barbeiro:</strong> <span>${escapeHTML(a.barbeiro.nome)}</span>
            <strong>Serviços:</strong> <span>${a.servicos.map(s => escapeHTML(s.tipo)).join(", ")}</span>
            <strong>Data:</strong> <span>${new Date(a.dataHora).toLocaleString()}</span>
            <strong>Status:</strong> <span>${a.stats ? "Confirmado" : "Pendente"}</span>
          </div>
          <div class="botoes">
            <button class="editar" onclick='editarAgendamento(${JSON.stringify(a)})'>✎</button>
            <button class="excluir" onclick='deletarAgendamento(${a.idAgendamento})'>✕</button>
          </div>
        `;
        lista.appendChild(li);
      });
    } catch (error) {
      console.error("Erro ao carregar agendamentos:", error);
    }
  }

  async function carregarSelects() {
    try {
      const [clientesRes, barbeirosRes, servicosRes] = await Promise.all([
        fetch(`${API_BASE_URL}/cliente`),
        fetch(`${API_BASE_URL}/barbeiro`),
        fetch(`${API_BASE_URL}/servico`)
      ]);

      if (!clientesRes.ok) throw new Error(await getApiErrorMessage(clientesRes));
      if (!barbeirosRes.ok) throw new Error(await getApiErrorMessage(barbeirosRes));
      if (!servicosRes.ok) throw new Error(await getApiErrorMessage(servicosRes));

      const [clientes, barbeiros, servicos] = await Promise.all([
        clientesRes.json(),
        barbeirosRes.json(),
        servicosRes.json()
      ]);

      function popularSelect(select, dados, valueField, textField, placeholder) {
        select.innerHTML = "";
        const opt = document.createElement("option");
        opt.value = "";
        opt.textContent = placeholder;
        opt.disabled = true;
        opt.selected = true;
        select.appendChild(opt);

        dados.forEach(item => {
          const option = document.createElement("option");
          option.value = item[valueField];
          option.textContent = item[textField];
          select.appendChild(option);
        });
      }

      popularSelect(document.getElementById("cliente"), clientes, "idCliente", "nome", "Selecione um Cliente...");
      popularSelect(document.getElementById("barbeiro"), barbeiros, "idBarbeiro", "nome", "Selecione um Barbeiro...");

      const container = document.getElementById("servicos-container");
      container.innerHTML = "";
      servicos.forEach(servico => {
        const div = document.createElement("div");
        div.classList.add("servico-item");
        div.dataset.id = servico.idServico;
        div.textContent = servico.tipo;
        div.onclick = () => div.classList.toggle("selecionado");
        container.appendChild(div);
      });

    } catch (error) {
      console.error("Erro ao carregar selects:", error);
      Swal.fire("Erro", error.message, "error");
    }
  }

  async function deletarAgendamento(id) {
    const confirmacao = await Swal.fire({
      title: "Tem certeza?",
      text: "Deseja realmente excluir este agendamento?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sim, excluir",
      cancelButtonText: "Cancelar"
    });

    if (confirmacao.isConfirmed) {
      try {
        const response = await fetch(`${API_BASE_URL}/agenda/${id}`, { method: "DELETE" });
        if (response.ok) {
          Swal.fire("Excluído!", "Agendamento excluído com sucesso.", "success");
          await carregarAgendamentos();
        } else {
          throw new Error(await getApiErrorMessage(response));
        }
      } catch (error) {
        Swal.fire("Erro!", error.message, "error");
      }
    }
  }

  window.editarAgendamento = function (a) {
    document.getElementById("cliente").value = a.cliente.idCliente;
    document.getElementById("barbeiro").value = a.barbeiro.idBarbeiro;
    document.getElementById("dataHora").value = a.dataHora.substring(0, 16);
    document.getElementById("status").value = a.stats ? "true" : "false";

    document.querySelectorAll(".servico-item").forEach(div => {
      div.classList.toggle("selecionado", a.servicos?.some(s => s.idServico == div.dataset.id));
    });

    modalTitle.textContent = "Atualizar Agendamento";
    formButton.textContent = "Atualizar";
    editandoId = a.idAgendamento;
    modal.style.display = "flex";
  };

  window.deletarAgendamento = deletarAgendamento;

  carregarSelects();
  carregarAgendamentos();
}

inicializarAgendamentosPage();
