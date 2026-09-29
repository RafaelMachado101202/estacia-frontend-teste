// js/supabaseClient.js

// Substitua com os valores que você copiou do Supabase
const SUPABASE_URL = 'https://mktgawqrfggmfnqcwvsm.supabase.co/rest/v1/';
const SUPABASE_KEY = 'sb_publishable_SiOuuGYOJ08WYyczoUTvUA_6yasNb3Z';

// Inicializa a conexão global usando a biblioteca do Supabase
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);