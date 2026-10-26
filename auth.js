// Importa o cliente do Supabase via CDN
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const SUPABASE_URL = 'https://dnvjenazpfkfosizifra.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRudmplbmF6cGZrZm9zaXppZnJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMwNDQ0NzQsImV4cCI6MjEwODYyMDQ3NH0.VAH-nZz5hryTcla0Dpz8qyKEpNxC-5CGuC2WZP017EE'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

document.addEventListener('DOMContentLoaded', () => {
    const formCadastro = document.getElementById('form-cadastro');
    const inputSenha = document.getElementById('senha');

    if (formCadastro) {
        formCadastro.addEventListener('submit', async (e) => {
            e.preventDefault();

            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const senha = inputSenha.value;

            // --- VALIDAÇÃO DA SENHA ---
            const MINIMO_CARACTERES = 6; // Podes mudar para 8 se preferires
            
            if (senha.length < MINIMO_CARACTERES) {
                // Deixa a borda do input vermelha para dar o alerta visual
                inputSenha.style.borderColor = 'red';
                alert(`A senha é muito curta! Deve ter pelo menos ${MINIMO_CARACTERES} caracteres.`);
                inputSenha.focus();
                return; // Para o envio aqui e não vai ao Supabase
            } else {
                // Se passar, limpa a borda vermelha caso tenha ficado marcada antes
                inputSenha.style.borderColor = '';
            }
            // --------------------------

            try {
                // Insere os dados na tabela 'tecnicos' com aprovado definido como false
                const { data, error } = await supabase
                    .from('tecnicos')
                    .insert([{ 
                        nome: nome, 
                        email: email, 
                        senha: senha,
                        aprovado: false 
                    }]);

                if (error) {
                    throw error;
                }

                // Redireciona para a página de aviso
                window.location.href = 'aguardando.html';

            } catch (error) {
                console.error('Erro ao cadastrar:', error.message);
                alert('Erro ao realizar o cadastro: ' + error.message);
            }
        });
    }
});