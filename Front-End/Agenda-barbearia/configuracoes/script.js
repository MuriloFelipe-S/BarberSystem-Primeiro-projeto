document.addEventListener("DOMContentLoaded", () => {
  // Utilitário para exibir feedback
  const showMessage = (mensagem, tipo = 'info') => {
    alert(`[${tipo.toUpperCase()}] ${mensagem}`);
  };

  // ========================
  // Formulário da Barbearia
  // ========================
  document.getElementById("form-barbearia").addEventListener("submit", (e) => {
    e.preventDefault();

    const dados = Object.fromEntries(new FormData(e.target));
    console.log("📋 Dados da Barbearia:", dados);

    // Aqui você pode fazer um POST/PUT para a API
    showMessage("Dados da barbearia salvos com sucesso!", "sucesso");
  });

  // ========================
  // Formulário de Horários
  // ========================
  document.getElementById("form-horarios").addEventListener("submit", (e) => {
    e.preventDefault();

    const form = e.target;
    const dados = {
      horaAbertura: form.horaAbertura.value,
      horaFechamento: form.horaFechamento.value,
      diasFunc: Array.from(form.diasFunc.selectedOptions).map(opt => opt.value)
    };

    console.log("⏰ Horários de funcionamento:", dados);
    showMessage("Horários salvos com sucesso!", "sucesso");
  });

  // ========================
  // Formulário de Preferências
  // ========================
  document.getElementById("form-preferencias").addEventListener("submit", (e) => {
    e.preventDefault();

    const form = e.target;
    const dados = {
      tema: form.tema.value,
      notificacoes: form.notificacoes.checked,
      idioma: form.idioma.value
    };

    console.log("⚙️ Preferências:", dados);
    showMessage("Preferências salvas com sucesso!", "sucesso");
  });

  // ========================
  // Formulário de Senha
  // ========================
  document.getElementById("form-senha").addEventListener("submit", (e) => {
    e.preventDefault();

    const form = e.target;
    const senhaAtual = form.senhaAtual.value;
    const novaSenha = form.novaSenha.value;
    const confirmarSenha = form.confirmarSenha.value;

    if (novaSenha !== confirmarSenha) {
      showMessage("As novas senhas não coincidem!", "erro");
      return;
    }

    const dados = {
      senhaAtual,
      novaSenha
    };

    console.log("🔐 Alterar Senha:", dados);
    showMessage("Senha alterada com sucesso!", "sucesso");
  });
});
