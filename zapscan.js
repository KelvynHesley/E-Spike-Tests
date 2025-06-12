// zapScan.js
const ZapClient = require('zaproxy');

// Defina a API key e o endereço do proxy do ZAP
const zapOptions = {
    apiKey: 'c21hslg9icrajq0q5pbj8houva',
    // Aqui você define explicitamente o endereço do ZAP: endereço e porta
    proxy: 'http://127.0.0.1:8080'
};

// Cria a instância do cliente ZAP
const zaproxy = new ZapClient(zapOptions);

async function iniciarScan() {
    // Define a URL alvo, que é o seu projeto Node rodando em 5173
    const scanParams = {
        url: 'http://127.0.0.1:5173',
        recurse: true
    };

    try {
        console.log('Iniciando Spider Scan...');
        // Inicia o Spider Scan e retorna a resposta da API do ZAP
        const respostaSpider = await zaproxy.spider.scan(scanParams);
        console.log('Spider Scan iniciado:', respostaSpider);

        // (Opcional) Monitore o progresso do scan
        let progresso = 0;
        while (progresso < 100) {
            const statusResponse = await zaproxy.spider.status();
            progresso = parseInt(statusResponse.status, 10);
            console.log(`Progresso do scan: ${progresso}%`);
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
        console.log('Spider Scan concluído!');
    } catch (error) {
        console.error('Erro ao executar o scan:', error);
    }
}

iniciarScan();

