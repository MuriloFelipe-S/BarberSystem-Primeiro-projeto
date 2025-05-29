async function authFetch(url, options = {}) {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Usuário não autenticado. Token ausente.");
  }

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

function inicializarClientesPage() {
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
    modalTitle.textContent = 'Novo Cliente';
    formButton.textContent = 'Salvar';
    modal.style.display = 'flex';
  };

  fecharModal.onclick = () => {
    modal.style.display = 'none';
  };

  window.onclick = e => {
    if (e.target === modal) modal.style.display = 'none';
  };

  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const telefone = document.getElementById('telefone').value.trim();

    if (!nome || !telefone) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos obrigatórios',
        text: 'Preencha todos os campos.',
        confirmButtonColor: '#ffc107'
      });
      return;
    }

    const cliente = { nome, telefone };
    const url = editandoId ? `http://localhost:8080/cliente/${editandoId}` : 'http://localhost:8080/cliente';
    const metodo = editandoId ? 'PUT' : 'POST';

    try {
      const response = await authFetch(url, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cliente)
      });

      Swal.fire({
        icon: 'success',
        title: 'Sucesso!',
        text: `Cliente ${editandoId ? 'atualizado' : 'cadastrado'} com sucesso.`,
        confirmButtonColor: '#007bff'
      });
      form.reset();
      modal.style.display = 'none';
      carregarClientes();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: error.message || 'Erro na comunicação com o servidor.',
        confirmButtonColor: '#dc3545'
      });
    }
  });

  async function carregarClientes() {
    try {
      const response = await authFetch("http://localhost:8080/cliente");
      const clientes = await response.json();
      const lista = document.getElementById('lista-clientes');
      lista.textContent = ''; // Limpa de forma segura

      clientes.forEach(c => {
        const li = document.createElement('li');

        const divInfo = document.createElement('div');
        divInfo.className = 'info';

        const strongNome = document.createElement('strong');
        strongNome.textContent = 'Nome: ';
        const spanNome = document.createElement('span');
        spanNome.textContent = c.nome;

        const strongTelefone = document.createElement('strong');
        strongTelefone.textContent = ' Telefone: ';
        const spanTelefone = document.createElement('span');
        spanTelefone.textContent = c.telefone;

        divInfo.appendChild(strongNome);
        divInfo.appendChild(spanNome);
        divInfo.appendChild(strongTelefone);
        divInfo.appendChild(spanTelefone);

        const divBotoes = document.createElement('div');
        divBotoes.className = 'botoes';

        const btnEditar = document.createElement('button');
        btnEditar.className = 'editar';
        btnEditar.textContent = '✎';
        btnEditar.addEventListener('click', () => editarCliente(c.idCliente, c.nome, c.telefone));

        const btnExcluir = document.createElement('button');
        btnExcluir.className = 'excluir';
        btnExcluir.textContent = '✕';
        btnExcluir.addEventListener('click', () => deletarCliente(c.idCliente));

        divBotoes.appendChild(btnEditar);
        divBotoes.appendChild(btnExcluir);

        li.appendChild(divInfo);
        li.appendChild(divBotoes);

        lista.appendChild(li);
      });
    } catch (error) {
      console.error('Erro ao carregar clientes:', error);
    }
  }

  async function deletarCliente(id) {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Deseja realmente excluir este cliente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await authFetch(`http://localhost:8080/cliente/${id}`, {
            method: "DELETE",
          });

          if (response.ok) {
            Swal.fire("Excluído!", "Cliente excluído com sucesso.", "success");
            carregarClientes();
          } else {
            throw new Error("Erro ao excluir cliente.");
          }
        } catch (error) {
          Swal.fire("Erro!", error.message || "Erro ao se comunicar com o servidor.", "error");
        }
      }
    });
  }

  function editarCliente(id, nome, telefone) {
    document.getElementById('nome').value = nome;
    document.getElementById('telefone').value = telefone;
    modalTitle.textContent = 'Atualizar Cliente';
    formButton.textContent = 'Atualizar';
    editandoId = id;
    modal.style.display = 'flex';
  }

  window.deletarCliente = deletarCliente;
  window.editarCliente = editarCliente;

  carregarClientes();
}

inicializarClientesPage();
