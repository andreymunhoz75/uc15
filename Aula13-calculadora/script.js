// 1. Selecionar os elementos da pagina 
const input1 = document.querySelector("#numero1"); 
const input2 = document.querySelector("#numero2"); 
const display = document.querySelector("#display"); 
  
const btnSoma = document.querySelector("#btnSoma"); 
const btnSub  = document.querySelector("#btnSub"); 
const btnMult = document.querySelector("#btnMult"); 
const btnDiv  = document.querySelector("#btnDiv");
const btnPot = document.querySelector("#btnPot");
const btnRaiz = document.querySelector("#btnRaiz");
  
// 2. Evento de clique do botao soma 
btnSoma.addEventListener("click", () => { 
    const n1 = parseFloat(input1.value); 
    const n2 = parseFloat(input2.value); 
    const resultado = n1 + n2; 
    display.textContent = `Resultado: ${resultado}`; 
}); 
  
// 3. Evento de clique do botao subtracao 
btnSub.addEventListener("click", () => { 
    const n1 = parseFloat(input1.value); 
    const n2 = parseFloat(input2.value); 
    display.textContent = `Resultado: ${n1 - n2}`; 
}); 
  
// 4. Evento de clique do botao multiplicacao 
btnMult.addEventListener("click", () => { 
    const n1 = parseFloat(input1.value); 
    const n2 = parseFloat(input2.value); 
    display.textContent = `Resultado: ${n1 * n2}`; 
}); 
  
// 5. Evento de clique do botao divisao 
btnDiv.addEventListener("click", () => { 
    const n1 = parseFloat(input1.value); 
    const n2 = parseFloat(input2.value); 
    display.textContent = `Resultado: ${n1 / n2}`; 
});

btnPot.addEventListener("click", () => { 
    const n1 = parseFloat(input1.value); 
    const n2 = parseFloat(input2.value);
    let potencia = 1
    for(let i = 0; i < n2; ++i ){
        potencia *= n1;}
    display.textContent = `Resultado: ${potencia}`;    
})

btnRaiz.addEventListener("click", () => { 
    const n1 = parseFloat(input1.value); 
    const n2 = parseFloat(input2.value);
    const raiz = n1 ** (1/n2);
    display.textContent = `Resultado: ${raiz}`;    
})