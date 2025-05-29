// URL base da API (mude conforme o ambiente que estiver usando)
const API_URL = "http://localhost:8080";

// --------------------------------------------------------------
// ✅ Função que verifica se o token JWT está presente e válido
// --------------------------------------------------------------
function verificarToken() {
  const token = localStorage.getItem("token");

  // Se não existir token ou ele não começar com "ey" (formato típico de JWT), redireciona para login
  if (!token || !token.startsWith("ey")) {
    localStorage.removeItem("token");
    window.location.href = "../login/index.html";
    return false;
  }

  // Token existe, segue com o carregamento da página
  return true;
}

function atualizarUserRoleNoMenu() {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const payloadBase64 = token.split(".")[1];
    const payloadBase64Padded = payloadBase64.padEnd(
      payloadBase64.length + ((4 - (payloadBase64.length % 4)) % 4),
      "="
    );
    const payloadJson = atob(payloadBase64Padded.replace(/-/g, "+").replace(/_/g, "/"));
    const payload = JSON.parse(payloadJson);

    const role = payload.role || "USER";

    const userInfos = document.getElementById("user_infos");
    if (userInfos) {
      userInfos.innerHTML = `
        <span class="item-description">${role.toUpperCase()}</span>
      `;
    }
  } catch (error) {
    console.error("Erro ao decodificar token JWT:", error);
  }
}

// -------------------------------------------------------------------
// ✅ Função genérica para fazer chamadas à API com o token no header
// -------------------------------------------------------------------
async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  // Adiciona o token no cabeçalho da requisição (Authorization: Bearer <token>)
  const headers = options.headers || {};
  headers["Authorization"] = `Bearer ${token}`;

  // Define Content-Type padrão como application/json, exceto se já estiver definido
  if (!headers["Content-Type"] && !(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  // Faz a requisição com as opções fornecidas
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // Se o token for inválido (erro 401 ou 403), remove e redireciona para login
  if (response.status === 401 || response.status === 403) {
    localStorage.removeItem("token");
    window.location.href = "../login/index.html";
  }

  // Retorna a resposta da API
  return response;
}

// --------------------------------------------------------------------
// ✅ Evento principal: executa quando o DOM estiver carregado
// --------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  // Verifica se o token é válido antes de carregar qualquer conteúdo
  if (!verificarToken()) return;

  atualizarUserRoleNoMenu();

  // Elemento onde o conteúdo das páginas dinâmicas será carregado
  const conteudo = document.getElementById("conteudo-dinamico");

  // Links que possuem o atributo data-page (menu lateral)
  const links = document.querySelectorAll("[data-page]");

  // ---------------------------------------------------------------
  // ✅ Função que carrega dinamicamente o conteúdo de uma página
  // ---------------------------------------------------------------
  function carregarPagina(pagina) {
    // Remove a classe "ativo" de todos os links
    document
      .querySelectorAll(".menu-lateral a")
      .forEach((a) => a.classList.remove("ativo"));

    // Adiciona a classe "ativo" apenas no link selecionado
    const linkAtivo = document.querySelector(`[data-page="${pagina}"]`);
    if (linkAtivo) linkAtivo.classList.add("ativo");

    // Busca o HTML da página
    fetch(`../${pagina}/index.html`)
      .then((res) => res.text())
      .then((html) => {
        // Insere o HTML no conteúdo dinâmico
        conteudo.innerHTML = html;

        // Remove estilos antigos (CSS dinâmico)
        document
          .querySelectorAll("link[data-dinamico]")
          .forEach((e) => e.remove());

        // Adiciona o novo estilo da página atual
        const estilo = document.createElement("link");
        estilo.rel = "stylesheet";
        estilo.href = `../${pagina}/style.css`;
        estilo.setAttribute("data-dinamico", "true");
        document.head.appendChild(estilo);

        // Remove scripts antigos (JS dinâmico)
        document
          .querySelectorAll("script[data-dinamico]")
          .forEach((s) => s.remove());

        // Aguarda brevemente para garantir que o DOM foi atualizado
        setTimeout(() => {
          // Adiciona o script JS correspondente à página atual
          const script = document.createElement("script");
          script.src = `../${pagina}/script.js`;
          script.type = "text/javascript";
          script.setAttribute("data-dinamico", "true");
          document.body.appendChild(script);
        }, 50);
      })
      .catch((err) => {
        // Se der erro ao carregar, mostra mensagem e imprime no console
        conteudo.innerHTML = "<p>Erro ao carregar página.</p>";
        console.error(err);
      });
  }

  // ---------------------------------------------------------
  // ✅ Adiciona os eventos de clique aos botões do menu lateral
  // ---------------------------------------------------------
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault(); // Impede o comportamento padrão do link
      const pagina = link.dataset.page; // Ex: "cliente", "barbeiro"
      carregarPagina(pagina); // Chama a função que carrega a aba
    });
  });

  // ---------------------------------------------------------
  // ✅ Ao abrir o sistema, carrega a aba "serviço" como inicial
  // ---------------------------------------------------------
  function carregarPaginaInicial() {
    const linkInicial = document.querySelector('[data-page="servico"]');
    if (linkInicial) linkInicial.click();
  }
  carregarPaginaInicial();

  // ---------------------------------------------------------
  // ✅ Botão para abrir/fechar o menu lateral (sidebar)
  // ---------------------------------------------------------
  document.getElementById("open_btn").addEventListener("click", () => {
    document.getElementById("sidebar").classList.toggle("open-sidebar");
  });

  // ---------------------------------------------------------
  // ✅ Lógica do botão de logout
  // ---------------------------------------------------------
  const logoutBtn = document.getElementById("logout_btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("token"); // Remove o token do navegador
      window.location.href = "../login/index.html"; // Redireciona para o login
    });
  }
});

function checkAuth() {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Você precisa estar logado para acessar esta página.");
    window.location.href = "../login/index.html";
    return;
  }

  // Validar token com o back-end, se quiser reforçar a segurança
  fetch("http://localhost:8080/auth/validate", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Token inválido");
      }
      return res.json(); // ou apenas continuar
    })
    .catch(() => {
      alert("Sessão expirada. Faça login novamente.");
      localStorage.removeItem("token");
      window.location.href = "../login/index.html";
    });
}
