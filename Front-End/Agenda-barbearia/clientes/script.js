// clientes/script.js
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
    if (e.target == modal) modal.style.display = 'none';
  };

  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const telefone = document.getElementById('telefone').value.trim();

    if (nome === '' || telefone === '') {
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
      const response = await fetch(url, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cliente)
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          text: `Cliente ${editandoId ? 'atualizado' : 'cadastrado'} com sucesso.`,
          confirmButtonColor: '#007bff'
        });
        form.reset();
        modal.style.display = 'none';
        carregarClientes();
      } else {
        // Caso o servidor retorne um erro, tenta extrair a mensagem de erro
        const errorData = await response.json();
        // Exibe um erro apropriado
        Swal.fire("Erro!", errorData.message || "Erro desconhecido", "error");
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Erro na comunicação com o servidor.',
        confirmButtonColor: '#dc3545'
      });
    }
  });

  async function carregarClientes() {
    try {
      const resposta = await fetch('http://localhost:8080/cliente');
      const clientes = await resposta.json();
      const lista = document.getElementById('lista-clientes');
      lista.innerHTML = '';

      clientes.forEach(c => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="info">
              <strong>Nome:</strong> <span>${c.nome}</span>
              <strong>Telefone:</strong> <span>${c.telefone}</span>
            </div>
            <div class="botoes">
              <button class="editar" onclick="editarCliente(${c.idCliente}, '${c.nome}', '${c.telefone}')">✎</button>
              <button class="excluir" onclick="deletarCliente(${c.idCliente})">✕</button>
            </div>
          `;
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
          const response = await fetch(`http://localhost:8080/cliente/${id}`, {
            method: 'DELETE'
          });

          if (response.ok) {
            Swal.fire('Excluído!', 'Cliente excluído com sucesso.', 'success');
            carregarClientes();
          } else {
            throw new Error();
          }
        } catch (error) {
          Swal.fire('Erro!', 'Erro ao se comunicar com o servidor.', 'error');
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
