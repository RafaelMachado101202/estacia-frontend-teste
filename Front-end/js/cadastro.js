// js/cadastro.js

document.getElementById('formCadastro').addEventListener('submit', async (e) => {
  e.preventDefault();

  const nomeInput = document.getElementById('nome').value.trim();
  const emailInput = document.getElementById('email').value.trim();
  const senhaInput = document.getElementById('senha').value.trim();
  const btnCadastrar = document.getElementById('btnCadastrar');

  btnCadastrar.textContent = 'Cadastrando...';
  btnCadastrar.disabled = true;

  try {
    // 1. Verifica se já existe um usuário cadastrado com este e-mail
    const { data: usuarioExistente } = await supabase
      .from('usuarios')
      .select('email')
      .eq('email', emailInput)
      .maybeSingle();

    if (usuarioExistente) {
      alert('Este e-mail já está cadastrado. Tente fazer o login.');
      btnCadastrar.textContent = 'Criar Conta';
      btnCadastrar.disabled = false;
      return;
    }

    // 2. Insere o novo usuário na tabela 'usuarios'
    const { data, error } = await supabase
      .from('usuarios')
      .insert([
        {
          nome_completo: nomeInput,
          email: emailInput,
          senha_hash: senhaInput
        }
      ]);

    if (error) {
      alert('Erro ao realizar o cadastro: ' + error.message);
      btnCadastrar.textContent = 'Criar Conta';
      btnCadastrar.disabled = false;
      return;
    }

    alert('Conta criada com sucesso!');
    // Redireciona para a tela de login
    window.location.href = 'index.html';

  } catch (err) {
    console.error('Erro no cadastro:', err);
    alert('Ocorreu um erro ao tentar cadastrar. Verifique o console.');
    btnCadastrar.textContent = 'Criar Conta';
    btnCadastrar.disabled = false;
  }
});