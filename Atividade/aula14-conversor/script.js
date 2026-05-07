// =========================================================
// FUNÇÃO: registrarHistorico (NOVA)
// Objetivo: Adicionar um item no topo da lista do histórico e limitar a 10 itens
// =========================================================
function registrarHistorico(texto) {
    const historicoLista = document.getElementById('historicoLista');
    
    // Cria o elemento li dinamicamente
    const li = document.createElement('li');
    li.textContent = texto;
    
    // Adiciona o li no início da lista
    historicoLista.prepend(li);
    
    // Limita a lista a no máximo 10 itens (remove o último se ultrapassar)
    if (historicoLista.children.length > 10) {
        historicoLista.removeChild(historicoLista.lastChild);
    }
}

// =========================================================
// FUNÇÃO: converterTemperatura (JÁ EXISTENTE - refatorada com histórico)
// Objetivo: Converter entre Celsius, Fahrenheit e Kelvin
// =========================================================
function converterTemperatura() {
    const valorInput = document.getElementById('tempInput').value;
    const de = document.getElementById('tempDe').value;
    const para = document.getElementById('tempPara').value;
    const divResultado = document.getElementById('tempResultado');
    
    const valor = parseFloat(valorInput);
    
    // Validação de entrada: se vazio ou não é um número
    if (valorInput === "" || isNaN(valor)) {
        divResultado.textContent = "Digite um valor válido";
        return;
    }
    
    let resultado;
    
    // Lógica de conversão
    if (de === para) {
        resultado = valor;
    } else if (de === 'celsius' && para === 'fahrenheit') {
        resultado = (valor * 9/5) + 32;
    } else if (de === 'celsius' && para === 'kelvin') {
        resultado = valor + 273.15;
    } else if (de === 'fahrenheit' && para === 'celsius') {
        resultado = (valor - 32) * 5/9;
    } else if (de === 'fahrenheit' && para === 'kelvin') {
        resultado = (valor - 32) * 5/9 + 273.15;
    } else if (de === 'kelvin' && para === 'celsius') {
        resultado = valor - 273.15;
    } else if (de === 'kelvin' && para === 'fahrenheit') {
        resultado = (valor - 273.15) * 9/5 + 32;
    }
    
    // Nomes legíveis para exibir no histórico
    const nomes = { celsius: "Celsius", fahrenheit: "Fahrenheit", kelvin: "Kelvin" };
    
    // Atualiza o display do resultado
    divResultado.textContent = `${resultado.toFixed(2)} ${nomes[para]}`;
    
    // Chama a função para registrar no histórico
    registrarHistorico(`Temperatura: ${valor} ${nomes[de]} para ${resultado.toFixed(2)} ${nomes[para]}`);
}

// =========================================================
// FUNÇÃO: converterMoeda (JÁ EXISTENTE - refatorada com histórico)
// Objetivo: Converter usando taxas de câmbio fixas
// =========================================================
function converterMoeda() {
    const valorInput = document.getElementById('moedaInput').value;
    const de = document.getElementById('moedaDe').value;
    const para = document.getElementById('moedaPara').value;
    const divResultado = document.getElementById('moedaResultado');
    
    const valor = parseFloat(valorInput);
    
    // Validação de entrada
    if (valorInput === "" || isNaN(valor)) {
        divResultado.textContent = "Digite um valor válido";
        return;
    }
    
    // Objeto com taxas de câmbio fixas tendo o Real (BRL) como moeda base = 1
    const taxas = {
        BRL: 1,
        USD: 5.0, // 1 USD equivale a 5 BRL
        EUR: 5.5  // 1 EUR equivale a 5.5 BRL
    };
    
    // Fórmula: resultado = valor * taxas[de] / taxas[para]
    const resultado = valor * taxas[de] / taxas[para];
    
    // Atualiza o display do resultado
    divResultado.textContent = `${resultado.toFixed(2)} ${para}`;
    
    // Chama a função para registrar no histórico
    registrarHistorico(`Moeda: ${valor.toFixed(2)} ${de} para ${resultado.toFixed(2)} ${para}`);
}

// =========================================================
// FUNÇÃO: converterComprimento (NOVA)
// Objetivo: Converter unidades de comprimento usando fator base
// =========================================================
function converterComprimento() {
    const valorInput = document.getElementById('compInput').value;
    const de = document.getElementById('compDe').value;
    const para = document.getElementById('compPara').value;
    const divResultado = document.getElementById('compResultado');
    
    const valor = parseFloat(valorInput);
    
    // Validação de entrada
    if (valorInput === "" || isNaN(valor)) {
        divResultado.textContent = "Digite um valor válido";
        return;
    }
    
    // Objeto de fatores: unidade base = Metro (m = 1)
    const fatores = {
        m: 1,
        cm: 0.01,  // 1 cm = 0.01 m
        km: 1000   // 1 km = 1000 m
    };
    
    // Fórmula: resultado = valor * fatores[de] / fatores[para]
    // Ex: 1m para cm -> 1 * 1 / 0.01 = 100
    const resultado = valor * fatores[de] / fatores[para];
    
    // Atualiza o display do resultado
    divResultado.textContent = `${resultado.toFixed(2)} ${para}`;
    
    // Chama a função para registrar no histórico
    registrarHistorico(`Comprimento: ${valor} ${de} para ${resultado.toFixed(2)} ${para}`);
}

// =========================================================
// EVENT LISTENERS
// Objetivo: Conectar cada botão à sua respectiva função ao carregar a página
// =========================================================
document.addEventListener('DOMContentLoaded', () => {
    // Botão de Temperatura
    document.getElementById('tempBtn').addEventListener('click', converterTemperatura);
    
    // Botão de Moeda
    document.getElementById('moedaBtn').addEventListener('click', converterMoeda);
    
    // Botão de Comprimento
    document.getElementById('compBtn').addEventListener('click', converterComprimento);
});
