import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const SUPABASE_URL = 'https://dnvjenazpfkfosizifra.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRudmplbmF6cGZrZm9zaXppZnJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMwNDQ0NzQsImV4cCI6MjEwODYyMDQ3NH0.VAH-nZz5hryTcla0Dpz8qyKEpNxC-5CGuC2WZP017EE'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

document.addEventListener('DOMContentLoaded', () => {
    const formLogin = document.getElementById('form-login');

    if (formLogin) {
        formLogin.addEventListener('submit', async (e) => {
            e.preventDefault();

            const emailInput = document.getElementById('email').value.trim();
            const senhaInput = document.getElementById('password').value.trim();

            if (!emailInput || !senhaInput) {
                alert('Por favor, preenche todos os campos.');
                return;
            }

            try {
                // Consulta a tabela 'tecnicos' procurando pelo e-mail e senha
                const { data, error } = await supabase
                    .from('tecnicos')
                    .select('*')
                    .eq('email', emailInput)
                    .eq('senha', senhaInput)
                    .single();

                if (error || !data) {
                    alert('E-mail ou senha incorretos.');
                    return;
                }

                // Verifica se o utilizador está aprovado (true/false)
                if (data.aprovado === true) {
                    // Guarda os dados do utilizador logado
                    localStorage.setItem('usuarioLogado', JSON.stringify(data));
                    
                    // Entra na página principal do site
                    window.location.href = 'principal.html';
                } else {
                    // Se estiver pendente (false), manda para a página de espera
                    window.location.href = 'aguardando.html';
                }

            } catch (err) {
                console.error('Erro ao tentar fazer login:', err);
                alert('Ocorreu um erro ao comunicar com o servidor.');
            }
        });
    }
});