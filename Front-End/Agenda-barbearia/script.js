// Adiciona o evento de envio do formulário
document.getElementById('form').addEventListener('submit', async function(event) {
  event.preventDefault();

  const nome = document.getElementById('nome').value;
  let telefone = document.getElementById('telefone').value;

  // Remover qualquer caractere não numérico do telefone antes de enviá-lo
  telefone = telefone.replace(/\D/g, '');

  const cliente = {
    nome: nome,
    telefone: telefone // Envia o telefone sem formatação
  };

  try {
    const response = await fetch('http://localhost:8080/cliente', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cliente)
    });

    if (response.ok) {
      alert('Cliente cadastrado com sucesso!');
      document.getElementById('form').reset();
      carregarClientes();
    } else {
      alert('Erro ao cadastrar cliente.');
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    alert('Erro na comunicação com o servidor.');
  }
});

// Função para carregar os clientes cadastrados
async function carregarClientes() {
  try {
    const resposta = await fetch('http://localhost:8080/cliente');
    const clientes = await resposta.json();

    const lista = document.getElementById('lista-clientes');
    lista.innerHTML = ''; // Limpa a lista antes de adicionar os novos clientes

    clientes.forEach(c => {
      const telefoneFormatado = formatarTelefone(c.telefone);
      const li = document.createElement('li');
      li.innerHTML = `
        Nome:${c.nome}  Número: ${telefoneFormatado}
        <button onclick="deletarCliente(${c.idCliente})">Excluir</button>
      `;
      lista.appendChild(li);
    });
  } catch (error) {
    console.error('Erro ao carregar clientes:', error);
  }
}

// Função para deletar cliente
async function deletarCliente(id) {
  const confirmar = confirm("Tem certeza que deseja excluir este cliente?");
  if (!confirmar) return;

  try {
    const response = await fetch(`http://localhost:8080/cliente/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      alert("Cliente excluído com sucesso!");
      carregarClientes();
    } else {
      alert("Erro ao excluir cliente.");
    }
  } catch (error) {
    console.error("Erro ao tentar excluir cliente:", error);
    alert("Erro na comunicação com o servidor.");
  }
}

// Função para formatar o telefone para o padrão (xx) xxxxx-xxxx
function formatarTelefone(telefone) {
  return telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
}

// Máscara para o campo de telefone
document.getElementById('telefone').addEventListener('input', function(event) {
  let telefone = this.value.replace(/\D/g, ''); // Remove tudo o que não for número
  if (telefone.length <= 2) {
    telefone = `(${telefone}`;
  } else if (telefone.length <= 6) {
    telefone = `(${telefone.slice(0, 2)}) ${telefone.slice(2)}`;
  } else {
    telefone = `(${telefone.slice(0, 2)}) ${telefone.slice(2, 7)}-${telefone.slice(7, 11)}`;
  }
  this.value = telefone; // Atualiza o valor do campo com a máscara
});

// Carrega clientes ao iniciar a página
carregarClientes();
