// script.js atualizado com roteamento por hash e carregamento robusto
const conteudo = document.getElementById('conteudo-dinamico');
const links = document.querySelectorAll('[data-page]');

function carregarPagina(pagina) {
  // Atualiza o hash na URL
  window.location.hash = pagina || 'servico';

  // Limpa conteúdo anterior e remove recursos antigos
  conteudo.innerHTML = '';
  document.querySelectorAll('link[data-dinamico], script[data-dinamico]').forEach(el => el.remove());

  // Ativa item do menu
  document.querySelectorAll('.side-item a').forEach(a => a.classList.remove('ativo'));
  const linkAtivo = document.querySelector(`[data-page="${pagina}"]`);
  if (linkAtivo) linkAtivo.classList.add('ativo');

  // Carrega HTML (usando caminho absoluto)
  fetch(`/${pagina}/index.html`)
    .then(res => {
      if (!res.ok) throw new Error(`Erro ${res.status} ao carregar ${pagina}`);
      return res.text();
    })
    .then(html => {
      conteudo.innerHTML = html;

      // Carrega CSS
      return new Promise((resolve) => {
        const estilo = document.createElement('link');
        estilo.rel = 'stylesheet';
        estilo.href = `/${pagina}/style.css`;
        estilo.setAttribute('data-dinamico', 'true');
        estilo.onload = () => {
          console.log(`CSS de ${pagina} carregado`);
          resolve();
        };
        estilo.onerror = (e) => {
          console.warn(`Erro ao carregar CSS de ${pagina}:`, e);
          resolve();
        };
        document.head.appendChild(estilo);
      });
    })
    .then(() => {
      // Carrega JS após o conteúdo estar pronto
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = `/${pagina}/script.js`;
        script.setAttribute('data-dinamico', 'true');
        script.defer = true;
        
        script.onload = () => {
          console.log(`${pagina} script carregado com sucesso`);
          resolve();
        };
        
        script.onerror = (err) => {
          console.error(`Erro ao carregar script de ${pagina}:`, err);
          resolve();
        };
        
        document.head.appendChild(script);
      });
    })
    .catch(err => {
      console.error(`Erro ao carregar ${pagina}:`, err);
      conteudo.innerHTML = `
        <div class="error-message">
          <h2>Erro ao carregar a página</h2>
          <p>${err.message}</p>
          <button onclick="location.reload()">Recarregar</button>
        </div>
      `;
    });
}

// Ouvinte para links do menu
links.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    carregarPagina(link.dataset.page);
  });
});

// Ouvinte para mudanças de hash
window.addEventListener('hashchange', () => {
  const pagina = window.location.hash.substring(1);
  if (pagina) carregarPagina(pagina);
});

// Carrega a página inicial baseada no hash ou padrão
function carregarPaginaInicial() {
  const pagina = window.location.hash.substring(1) || 'servico';
  carregarPagina(pagina);
}

// Inicialização quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', carregarPaginaInicial);

// Botão sidebar
document.getElementById('open_btn').addEventListener('click', function() {
  document.getElementById('sidebar').classList.toggle('open-sidebar');
});

// Força rolagem para o topo ao carregar nova página
window.addEventListener('load', () => window.scrollTo(0, 0));