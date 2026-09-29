// js/recuperar.js

document.getElementById('formRecuperar').addEventListener('submit', async (e) => {
  e.preventDefault();

  const emailInput = document.getElementById('email').value.trim();
  const btnEnviar = document.getElementById('btnEnviar');

  btnEnviar.textContent = 'Enviando...';
  btnEnviar.disabled = true;

  try {
    // 1. Verifica se o e-mail informado existe na tabela 'usuarios'
    const { data: usuario, error } = await supabase
      .from('usuarios')
      .select('email')
      .eq('email', emailInput)
      .maybeSingle();

    if (error) {
      console.error('Erro ao consultar banco:', error);
      alert('Erro ao verificar e-mail: ' + error.message);
      btnEnviar.textContent = 'Enviar Instruções';
      btnEnviar.disabled = false;
      return;
    }

    if (!usuario) {
      alert('E-mail não encontrado no sistema. Verifique o endereço digitado ou crie uma conta.');
      btnEnviar.textContent = 'Enviar Instruções';
      btnEnviar.disabled = false;
      return;
    }

    // 2. Se o e-mail existe na base de dados
    alert('Instruções para redefinição de senha foram enviadas para ' + emailInput + '!');
    window.location.href = 'index.html';

  } catch (err) {
    console.error('Erro na recuperação de senha:', err);
    alert('Erro de conexão: ' + (err.message || err));
    btnEnviar.textContent = 'Enviar Instruções';
    btnEnviar.disabled = false;
  }
});