import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// As tuas credenciais do Supabase
const SUPABASE_URL = 'https://dnvjenazpfkfosizifra.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRudmplbmF6cGZrZm9zaXppZnJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMwNDQ0NzQsImV4cCI6MjEwODYyMDQ3NH0.VAH-nZz5hryTcla0Dpz8qyKEpNxC-5CGuC2WZP017EE'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

document.addEventListener('DOMContentLoaded', async () => {
    // --- 1. PERSONALIZAR COM O NOME DO UTILIZADOR LOGADO ---
    const dadosUsuario = localStorage.getItem('usuarioLogado');
    let usuarioAtual = null;

    if (dadosUsuario) {
        try {
            usuarioAtual = JSON.parse(dadosUsuario);
            const primeiroNome = usuarioAtual.nome ? usuarioAtual.nome.split(' ')[0] : 'Técnico';

            const spanTopo = document.getElementById('nome-usuario-topo');
            const h2BoasVindas = document.getElementById('titulo-boas-vindas');

            if (spanTopo) spanTopo.textContent = primeiroNome;
            if (h2BoasVindas) h2BoasVindas.textContent = `Bem-vindo, ${primeiroNome}!`;
        } catch (e) {
            console.error('Erro ao ler os dados do utilizador:', e);
        }
    }

    // --- 2. VERIFICAR PENDENTES NO SUPABASE (SÓ PARA O ADMIN) ---
    const badgeContador = document.getElementById('badge-contador');
    const dropdownCorpo = document.querySelector('.dropdown-corpo');

    // Verifica se é o teu e-mail de administrador
    if (usuarioAtual && usuarioAtual.email === 'francisconetoterceiro@gmail.com') {
        try {
            // Busca utilizadores pendentes (aprovado = false)
            const { data: pendentes, error } = await supabase
                .from('tecnicos')
                .select('*')
                .eq('aprovado', false);

            if (!error && pendentes) {
                if (pendentes.length > 0) {
                    if (badgeContador) {
                        badgeContador.style.display = 'inline-block';
                        badgeContador.textContent = pendentes.length;
                    }

                    if (dropdownCorpo) {
                        // Limpa e reconstrói o corpo do dropdown com os pedidos reais
                        dropdownCorpo.innerHTML = '';

                        pendentes.forEach(tec => {
                            const itemDiv = document.createElement('div');
                            itemDiv.className = 'aviso-item-pop';
                            itemDiv.style.display = 'flex';
                            itemDiv.style.flexDirection = 'column';
                            itemDiv.style.gap = '8px';
                            itemDiv.style.padding = '12px';
                            itemDiv.style.borderBottom = '1px solid #eee';

                            itemDiv.innerHTML = `
                                <div>
                                    <p style="margin: 0; font-size: 0.9rem;"><strong>Novo Pedido:</strong> ${tec.nome}</p>
                                    <span style="font-size: 0.75rem; color: #666;">${tec.email}</span>
                                </div>
                                <button class="btn-aprovar-rapido" data-id="${tec.id}" style="background-color: #2ecc71; color: white; border: none; padding: 6px 10px; border-radius: 4px; cursor: pointer; font-size: 0.75rem; font-weight: bold;">
                                    Aprovar Acesso
                                </button>
                            `;
                            dropdownCorpo.appendChild(itemDiv);
                        });

                        // Adiciona a lógica para o botão de aprovar direto na notificação
                        document.querySelectorAll('.btn-aprovar-rapido').forEach(btn => {
                            btn.addEventListener('click', async (e) => {
                                const idTecnico = e.target.getAttribute('data-id');
                                
                                const { error: updateError } = await supabase
                                    .from('tecnicos')
                                    .update({ aprovado: true })
                                    .eq('id', idTecnico);

                                if (!updateError) {
                                    alert('Utilizador aprovado com sucesso!');
                                    location.reload(); // Atualiza a página para sumir da lista
                                } else {
                                    alert('Erro ao aprovar utilizador.');
                                }
                            });
                        });
                    }

                } else {
                    if (badgeContador) badgeContador.style.display = 'none';
                    if (dropdownCorpo) {
                        dropdownCorpo.innerHTML = '<p style="padding: 15px; text-align: center; color: #777; font-size: 0.85rem;">Nenhum pedido pendente.</p>';
                    }
                }
            }
        } catch (err) { // Corrigido de import para catch
            console.error('Erro ao buscar utilizadores pendentes:', err);
        }
    } else {
        // Se não for admin, esconde o badge de notificações
        if (badgeContador) badgeContador.style.display = 'none';
    }

    // --- 3. CONTROLO DO MENU LATERAL RETRÁTIL ---
    const botaoMenu = document.getElementById('botao-menu');
    const corpoDashboard = document.body;

    if (botaoMenu) {
        botaoMenu.addEventListener('click', () => {
            corpoDashboard.classList.toggle('sidebar-fechada');
        });
    }

    // --- 4. CONTROLO DO DROPDOWN DE NOTIFICAÇÕES ---
    const botaoSino = document.getElementById('botao-sino');
    const dropdownNotificacoes = document.getElementById('dropdown-notificacoes');

    if (botaoSino && dropdownNotificacoes) {
        botaoSino.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownNotificacoes.classList.toggle('escondido');
        });

        document.addEventListener('click', (e) => {
            if (!dropdownNotificacoes.contains(e.target) && !botaoSino.contains(e.target)) {
                dropdownNotificacoes.classList.add('escondido');
            }
        });
    }
});