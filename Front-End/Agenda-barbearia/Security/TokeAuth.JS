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
      "Authorization": `Bearer ${token}`
    }
  })
    .then(res => {
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

