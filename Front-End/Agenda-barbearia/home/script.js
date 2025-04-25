// script.js atualizado com correções para garantir que scripts de páginas dinâmicas sejam carregados corretamente após substituição do conteúdo
const conteudo = document.getElementById('conteudo-dinamico');
const links = document.querySelectorAll('[data-page]');

function carregarPagina(pagina) {
  document.querySelectorAll('.menu-lateral a').forEach(a => a.classList.remove('ativo'));
  const linkAtivo = document.querySelector(`[data-page="${pagina}"]`);
  if (linkAtivo) linkAtivo.classList.add('ativo');

  fetch(`../${pagina}/index.html`)
    .then(res => res.text())
    .then(html => {
      conteudo.innerHTML = html;

      // Remove CSS antigo
      document.querySelectorAll('link[data-dinamico]').forEach(e => e.remove());

      const estilo = document.createElement('link');
      estilo.rel = 'stylesheet';
      estilo.href = `../${pagina}/style.css`;
      estilo.setAttribute('data-dinamico', 'true');
      document.head.appendChild(estilo);

      // Remove scripts antigos
      document.querySelectorAll('script[data-dinamico]').forEach(s => s.remove());

      // Aguarda o DOM ser montado para garantir que o script pegue os elementos corretos
      setTimeout(() => {
        const script = document.createElement('script');
        script.src = `../${pagina}/script.js`;
        script.type = 'text/javascript';
        script.setAttribute('data-dinamico', 'true');
        script.onload = () => console.log(`${pagina} script carregado com sucesso.`);
        script.onerror = err => console.error(`Erro ao carregar o script de ${pagina}:`, err);
        document.body.appendChild(script);
      }, 50);
    })
    .catch(err => {
      conteudo.innerHTML = '<p>Erro ao carregar página.</p>';
      console.error(err);
    });
}

links.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const pagina = link.dataset.page;
    carregarPagina(pagina);
  });
});

function carregarPaginaInicial() {
  const linkInicial = document.querySelector('[data-page="servico"]');
  if (linkInicial) linkInicial.click();
}
carregarPaginaInicial();
