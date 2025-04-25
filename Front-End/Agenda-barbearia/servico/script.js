// servico/script.js com correção definitiva de carregamento dinâmico e melhorias
function inicializarServicoPage() {
  const modal = document.getElementById('modal');
  const abrirModal = document.getElementById('abrirModal');
  const fecharModal = document.querySelector('.close');
  const form = document.getElementById('form');
  const modalTitle = document.getElementById('modal-title');
  const formButton = form.querySelector('button');
  let editandoId = null;

  function escapeHTML(str) {
    return str.replace(/[&<>"']/g, tag => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;',
      '"': '&quot;', "'": '&#39;'
    }[tag]));
  }

  abrirModal.onclick = () => {
    form.reset();
    editandoId = null;
    modalTitle.textContent = 'Cadastro de Serviço';
    formButton.textContent = 'Salvar';
    modal.style.display = 'flex';
  };

  fecharModal.onclick = () => {
    modal.style.display = 'none';
  };

  window.onclick = e => {
    if (e.target == modal) modal.style.display = 'none';
  };

  form.addEventListener('submit', async function(event) {
    event.preventDefault();

    const tipo = document.getElementById('tipo').value.trim();
    const valorStr = document.getElementById('valor').value;
    const valor = parseFloat(valorStr);

    if (tipo === '' || valorStr === '' || isNaN(valor) || valor < 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos inválidos',
        text: 'Preencha os dados corretamente antes de continuar.',
        confirmButtonColor: '#ffc107'
      });
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
        Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          text: `Serviço ${editandoId ? 'atualizado' : 'cadastrado'} com sucesso.`,
          confirmButtonColor: '#007bff'
        });
        form.reset();
        modal.style.display = 'none';
        carregarServicos();
      } else {
        throw new Error();
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

// Carregar serviços
async function carregarServicos() {
  try {
    const resposta = await fetch('http://localhost:8080/servico');

    // Verifica se a resposta é válida
    if (!resposta.ok) {
      throw new Error(`Erro na requisição: ${resposta.status} - ${resposta.statusText}`);
    }

    const textoResposta = await resposta.text(); // Obtém a resposta como texto
    let servicos;

    try {
      servicos = JSON.parse(textoResposta); // Tenta converter para JSON
    } catch (jsonError) {
      console.error('Erro ao converter resposta para JSON:', textoResposta);
      throw new Error('A resposta do servidor não é um JSON válido.');
    }

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
    Swal.fire({
      icon: 'error',
      title: 'Erro',
      text: 'Não foi possível carregar os serviços. Verifique o console para mais detalhes.',
      confirmButtonColor: '#dc3545'
    });
  }
}

  async function deletarServico(id) {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Deseja realmente excluir este serviço?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`http://localhost:8080/servico/${id}`, {
            method: 'DELETE'
          });

          if (response.ok) {
            Swal.fire('Excluído!', 'Serviço excluído com sucesso.', 'success');
            carregarServicos();
          } else {
            throw new Error();
          }
        } catch (error) {
          Swal.fire('Erro!', 'Erro ao se comunicar com o servidor.', 'error');
        }
      }
    });
  }

  function editarServico(id, tipo, valor) {
    document.getElementById('tipo').value = tipo;
    document.getElementById('valor').value = valor;
    modalTitle.textContent = 'Atualização de Serviço';
    formButton.textContent = 'Atualizar';
    editandoId = id;
    modal.style.display = 'flex';
  }

  // Expõe funções que são chamadas via onclick
  window.editarServico = editarServico;
  window.deletarServico = deletarServico;

  carregarServicos();
}

// ⚠️ Chamada imediata após o script ser injetado dinamicamente no SPA
inicializarServicoPage();
