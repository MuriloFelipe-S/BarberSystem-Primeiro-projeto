const apiUrl = 'http://localhost:8080/clientes';

document.addEventListener('DOMContentLoaded', () => {
  listarClientes();

  const form = document.getElementById('clienteForm');
  const btnCadastrar = document.getElementById('btnCadastrar');
  const btnAtualizar = document.getElementById('btnAtualizar');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const clienteId = document.getElementById('clienteId').value;

    if (clienteId) {
      // Atualizar
      await fetch(`${apiUrl}/${clienteId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, telefone })
      });
      btnCadastrar.style.display = 'inline';
      btnAtualizar.style.display = 'none';
    } else {
      // Criar
      await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, telefone })
      });
    }

    form.reset();
    document.getElementById('clienteId').value = '';
    listarClientes();
  });

  btnAtualizar.addEventListener('click', () => {
    form.dispatchEvent(new Event('submit'));
  });
});

async function listarClientes() {
  const response = await fetch(apiUrl);
  const clientes = await response.json();
  const lista = document.getElementById('listaClientes');
  lista.innerHTML = '';

  clientes.forEach(cliente => {
    const li = document.createElement('li');
    li.textContent = `${cliente.nome} - ${cliente.telefone}`;

    const btnEditar = document.createElement('button');
    btnEditar.textContent = 'Editar';
    btnEditar.onclick = () => editarCliente(cliente);

    const btnExcluir = document.createElement('button');
    btnExcluir.textContent = 'Excluir';
    btnExcluir.onclick = () => deletarCliente(cliente.id);

    li.appendChild(btnEditar);
    li.appendChild(btnExcluir);
    lista.appendChild(li);
  });
}

function editarCliente(cliente) {
  document.getElementById('nome').value = cliente.nome;
  document.getElementById('telefone').value = cliente.telefone;
  document.getElementById('clienteId').value = cliente.id;
  document.getElementById('btnCadastrar').style.display = 'none';
  document.getElementById('btnAtualizar').style.display = 'inline';
}

async function deletarCliente(id) {
  if (confirm('Deseja realmente excluir este cliente?')) {
    await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
    listarClientes();
  }
}
