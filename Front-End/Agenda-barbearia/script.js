const modal = document.getElementById('modal');
const abrirModal = document.getElementById('abrirModal');
const fecharModal = document.querySelector('.close');
const form = document.getElementById('form');
let editandoId = null;

// Abrir modal
abrirModal.onclick = () => {
  form.reset();
  editandoId = null;
  modal.style.display = 'flex';
};

// Fechar modal
fecharModal.onclick = () => {
  modal.style.display = 'none';
};

// Fechar modal clicando fora
window.onclick = e => {
  if (e.target == modal) modal.style.display = 'none';
};

// Enviar formulário
form.addEventListener('submit', async function(event) {
  event.preventDefault();

  const tipo = document.getElementById('tipo').value.trim();
  const valor = parseFloat(document.getElementById('valor').value);

  if (!tipo || isNaN(valor) || valor < 0) {
    alert("Preencha os dados corretamente.");
    return;
  }

  const servico = { tipo, valor };

  const url = editandoId ? `http://localhost:8080/servico/${editandoId}` : 'http://localhost:8080/servico';
  const metodo = editandoId ? 'PUT' : 'POST';

  try {
    const response = await fetch(url, {
      method: metodo,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(servico)
    });

    if (response.ok) {
      alert(`Serviço ${editandoId ? 'atualizado' : 'cadastrado'} com sucesso!`);
      form.reset();
      modal.style.display = 'none';
      carregarServicos();
    } else {
      alert('Erro ao salvar serviço.');
    }
  } catch (error) {
    alert('Erro na comunicação com o servidor.');
  }
});

// Carregar serviços
async function carregarServicos() {
  try {
    const resposta = await fetch('http://localhost:8080/servico');
    const servicos = await resposta.json();
    const lista = document.getElementById('lista-servicos');
    lista.innerHTML = '';

    servicos.forEach(s => {
      const li = document.createElement('li');

      li.innerHTML = `
        <div class="info">
          <div class="icon">💈</div>
          <h3>${s.tipo}</h3>
          <p class="valor">R$ ${s.valor.toFixed(2).replace('.', ',')}</p>
        </div>
        <div class="botoes">
          <button class="editar" onclick="editarServico(${s.idServico}, '${s.tipo}', ${s.valor})">✎</button>
          <button class="excluir" onclick="deletarServico(${s.idServico})">✕</button>
        </div>
      `;

      lista.appendChild(li);
    });
  } catch (error) {
    console.error('Erro ao carregar serviços:', error);
  }
}

// Deletar serviço
async function deletarServico(id) {
  const confirmar = confirm("Deseja excluir este serviço?");
  if (!confirmar) return;

  try {
    const response = await fetch(`http://localhost:8080/servico/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      alert("Serviço excluído com sucesso!");
      carregarServicos();
    } else {
      alert("Erro ao excluir serviço.");
    }
  } catch (error) {
    alert("Erro ao se comunicar com o servidor.");
  }
}

// Editar serviço
function editarServico(id, tipo, valor) {
  document.getElementById('tipo').value = tipo;
  document.getElementById('valor').value = valor;
  form.querySelector('button').textContent = 'Atualizar';
  editandoId = id;
  modal.style.display = 'flex';
}

// Inicia carregando os serviços
carregarServicos();
