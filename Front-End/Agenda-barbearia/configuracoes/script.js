document.addEventListener('DOMContentLoaded', () => {
  const darkModeToggle = document.getElementById('darkMode');
  const notificacoesToggle = document.getElementById('notificacoes');
  const salvarBtn = document.getElementById('salvarConfig');

  // Carregar configurações salvas
  const config = JSON.parse(localStorage.getItem('barbersys-config')) || {
    darkMode: false,
    notificacoes: false
  };

  darkModeToggle.checked = config.darkMode;
  notificacoesToggle.checked = config.notificacoes;

  // Aplicar tema se estiver ativado
  if (config.darkMode) {
    document.body.classList.add('dark');
  }

  salvarBtn.addEventListener('click', () => {
    const novaConfig = {
      darkMode: darkModeToggle.checked,
      notificacoes: notificacoesToggle.checked
    };

    localStorage.setItem('barbersys-config', JSON.stringify(novaConfig));

    if (novaConfig.darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }

    Swal.fire({
      icon: 'success',
      title: 'Configurações salvas com sucesso!',
      timer: 1500,
      showConfirmButton: false
    });
  });
});
