// Importa o cliente do Supabase via CDN
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const SUPABASE_URL = 'https://uqogccyssnbdhxwdyiib.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_C16vP9ot1gHGKkmacHPQ1w_dJZbB1yz'

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

                // Redireciona direto para o login sem alertas chatos
                window.location.href = 'index.html';

            } catch (error) {
                console.error('Erro ao cadastrar:', error.message);
                alert('Erro ao realizar o cadastro: ' + error.message);
            }
        });
    }
});