// Capturando a referência da lista do histórico no DOM
const historicoLista = document.getElementById('historicoLista');

// a) Função para converter Temperatura
function converterTemperatura(valor, de, para) {
    // Validação: se o input for vazio ou não for um número (isNaN)
    if (valor === "" || isNaN(parseFloat(valor))) {
        document.getElementById('tempResultado').innerText = "Digite um valor válido";
        return;
    }

    const val = parseFloat(valor);
    let resultado;

    // Lógica de conversão baseada nos selects
    if (de === para) {
        resultado = val;
    } else if (de === "Celsius" && para === "Fahrenheit") {
        resultado = (val * 9/5) + 32;
    } else if (de === "Celsius" && para === "Kelvin") {
        resultado = val + 273.15;
    } else if (de === "Fahrenheit" && para === "Celsius") {
        resultado = (val - 32) * 5/9;
    } else if (de === "Fahrenheit" && para === "Kelvin") {
        resultado = (val - 32) * 5/9 + 273.15;
    } else if (de === "Kelvin" && para === "Celsius") {
        resultado = val - 273.15;
    } else if (de === "Kelvin" && para === "Fahrenheit") {
        resultado = (val - 273.15) * 9/5 + 32;
    }

    // Exibindo o resultado no display do Card
    document.getElementById('tempResultado').innerText = resultado.toFixed(2) + " " + para;
    
    // Registrando operação no histórico
    registrarHistorico(`Temperatura: ${val} ${de} para ${resultado.toFixed(2)} ${para}`);
}

// b) Função para converter Moeda
function converterMoeda(valor, de, para) {
    // Validação: se o input for vazio ou não for um número (isNaN)
    if (valor === "" || isNaN(parseFloat(valor))) {
        document.getElementById('moedaResultado').innerText = "Digite um valor válido";
        return;
    }

    const val = parseFloat(valor);
    
    // Objeto com taxas de câmbio fixas (relativas a uma base)
    const taxas = {
        BRL: 1,
        USD: 5.0,
        EUR: 5.5
    };

    // Fórmula: resultado = valor * taxas[de] / taxas[para]
    const resultado = val * taxas[de] / taxas[para];

    // Exibindo o resultado no display do Card
    document.getElementById('moedaResultado').innerText = resultado.toFixed(2) + " " + para;
    
    // Registrando operação no histórico
    registrarHistorico(`Moeda: ${val} ${de} para ${resultado.toFixed(2)} ${para}`);
}

// c) Função para converter Comprimento (NOVA)
function converterComprimento(valor, de, para) {
    // Validação: se o input for vazio ou não for um número (isNaN)
    if (valor === "" || isNaN(parseFloat(valor))) {
        document.getElementById('compResultado').innerText = "Digite um valor válido";
        return;
    }

    const val = parseFloat(valor);

    // Objeto com os fatores de conversão em relação a um padrão de referência
    const fatores = {
        m: 1,
        cm: 0.01,
        km: 1000
    };

    // Fórmula: resultado = valor * fatores[de] / fatores[para]
    const resultado = val * fatores[de] / fatores[para];

    // Exibindo o resultado no display do Card
    document.getElementById('compResultado').innerText = resultado.toFixed(2) + " " + para;

    // Registrando operação no histórico
    registrarHistorico(`Comprimento: ${val} ${de} para ${resultado.toFixed(2)} ${para}`);
}

// d) Função para registrar Histórico (NOVA)
function registrarHistorico(texto) {
    // Cria o elemento <li> dinamicamente
    const li = document.createElement('li');
    li.innerText = texto;

    // Adiciona o li no início da lista para manter a ordem decrescente do histórico
    historicoLista.prepend(li);

    // Limita a lista a no máximo 10 itens (remove o mais antigo se ultrapassar)
    if (historicoLista.children.length > 10) {
        historicoLista.removeChild(historicoLista.lastChild);
    }
}

// e) Event Listeners - conectando botões às funções
document.getElementById('tempBtn').addEventListener('click', function() {
    const valor = document.getElementById('tempInput').value;
    const de = document.getElementById('tempDe').value;
    const para = document.getElementById('tempPara').value;
    converterTemperatura(valor, de, para);
});

document.getElementById('moedaBtn').addEventListener('click', function() {
    const valor = document.getElementById('moedaInput').value;
    const de = document.getElementById('moedaDe').value;
    const para = document.getElementById('moedaPara').value;
    converterMoeda(valor, de, para);
});

document.getElementById('compBtn').addEventListener('click', function() {
    const valor = document.getElementById('compInput').value;
    const de = document.getElementById('compDe').value;
    const para = document.getElementById('compPara').value;
    converterComprimento(valor, de, para);
});