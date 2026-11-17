document.addEventListener('DOMContentLoaded', () => {
    const dadosUsuario = localStorage.getItem('usuarioLogado');

    if (dadosUsuario) {
        try {
            const usuario = JSON.parse(dadosUsuario);

            // E-mail do Administrador Principal
            const emailAdministrador = 'francisconetoterceiro@gmail.com'; 
            
            let cargoExibido = '';
            let corCargo = '';

            if (usuario.email === emailAdministrador) {
                cargoExibido = 'Administrador do Sistema';
                corCargo = '#e67e22'; // Dourado/Laranja de destaque
            } else {
                cargoExibido = 'Técnico Autorizado';
                corCargo = '#2ecc71'; // Verde padrão
            }

            // Preenche os elementos com os dados reais do localStorage
            const elNome = document.getElementById('perfil-nome');
            const elEmail = document.getElementById('perfil-email');
            const elTipo = document.getElementById('perfil-tipo');
            const spanTopo = document.getElementById('nome-usuario-topo');

            if (elNome) elNome.textContent = usuario.nome;
            if (elEmail) elEmail.textContent = usuario.email;
            if (spanTopo) spanTopo.textContent = usuario.nome ? usuario.nome.split(' ')[0] : 'Técnico';
            
            if (elTipo) {
                elTipo.textContent = cargoExibido;
                elTipo.style.color = corCargo;
                elTipo.style.fontWeight = 'bold';
            }

        } catch (e) {
            console.error('Erro ao processar os dados do perfil:', e);
        }
    } else {
        alert('Sessão expirada ou não iniciada.');
        window.location.href = 'index.html';
    }
});