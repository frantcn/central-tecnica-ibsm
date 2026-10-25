// Importa o cliente do Supabase via CDN
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// URL limpo do projeto (sem /rest/v1/)
const SUPABASE_URL ='https://uqogccyssnbdhxwdyiib.supabase.co'

// Chave 'anon public' clássica tirada da aba Legacy do teu painel
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxb2djY3lzc25iZGh4dndkeWliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI4ODU3MjIsImV4cCI6MjEwODQ2MTcyMn0.brVLqhohz_yeHtJRu1kEIHNgdMpjUztVzEomOQE813E'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

document.addEventListener('DOMContentLoaded', () => {
    const formCadastro = document.getElementById('form-cadastro');

    if (formCadastro) {
        formCadastro.addEventListener('submit', async (e) => {
            e.preventDefault(); // Evita que a página recarregue sozinha

            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;

            try {
                // Insere os dados na tabela 'tecnicos' no Supabase
                const { data, error } = await supabase
                    .from('tecnicos')
                    .insert([{ 
                        nome: nome, 
                        email: email, 
                        senha: senha,
                        aprovado: false // Novos cadastros entram pendentes de aprovação
                    }]);

                if (error) {
                    throw error;
                }

                // Redireciona direto para o login após salvar com sucesso
                window.location.href = 'index.html';

            } catch (error) {
                console.error('Erro ao cadastrar:', error.message);
                alert('Erro ao realizar o cadastro: ' + error.message);
            }
        });
    }
});