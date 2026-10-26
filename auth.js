// Importa o cliente do Supabase via CDN
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Credenciais do novo projeto Supabase
const SUPABASE_URL = 'https://dnvjenazpfkfosizifra.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRudmplbmF6cGZrZm9zaXppZnJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMwNDQ0NzQsImV4cCI6MjEwODYyMDQ3NH0.VAH-nZz5hryTcla0Dpz8qyKEpNxC-5CGuC2WZP017EE'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

document.addEventListener('DOMContentLoaded', () => {
    const formCadastro = document.getElementById('form-cadastro');

    if (formCadastro) {
        formCadastro.addEventListener('submit', async (e) => {
            e.preventDefault();

            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;

            try {
                // Insere os dados na tabela 'tecnicos' com aprovado definido como false por defeito
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

                // Redireciona o utilizador para a página de aviso de aprovação pendente
                window.location.href = 'aguardando.html';

            } catch (error) {
                console.error('Erro ao cadastrar:', error.message);
                alert('Erro ao realizar o cadastro: ' + error.message);
            }
        });
    }
});