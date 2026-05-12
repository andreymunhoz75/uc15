const personagens = [
    { 
        nome: "Kliff", 
        classe: "Guerreiro Mercenário", 
        level: 45, 
        habilidades: ["Lâmina de Pywel", "Investida Brutal", "Grito de Guerra"], 
        status: { hp: 1200, mana: 300, ataque: 150 } 
    }, 
    { 
        nome: "Macduff", 
        classe: "Líder de Bando", 
        level: 50, 
        habilidades: ["Tática de Cerco", "Golpe Devastador", "Fúria Nórdica"], 
        status: { hp: 1500, mana: 200, ataque: 180 } 
    }, 
    { 
        nome: "Tear", 
        classe: "Assassina Sombria", 
        level: 42, 
        habilidades: ["Passo Fantasmagórico", "Adagas Envenenadas", "Execução"], 
        status: { hp: 800, mana: 450, ataque: 210 } 
    }  
];

  
// Selecao do container onde os cards serao injetados 
const catalogo = document.querySelector("#catalogoPersonagens");

// Renderizacao mista: 
//   createElement para o card (estrutura externa) 
//   innerHTML para o conteudo interno (mais legivel) 
  
function renderizarCatalogo() { 
    catalogo.innerHTML = "";  // limpa antes de redesenhar 
  
    // Atualiza o contador dinamicamente
    const contador = document.querySelector("#contadorPersonagens");
    if (contador) {
        contador.textContent = `Total de personagens: ${personagens.length}`;
    }

    personagens.forEach(personagem => { 
        // 1. Cria o container do card com createElement 
        const colDiv = document.createElement("div"); 
        colDiv.className = "col-md-4"; 
  
        // Cálculo do Poder Total (hp + mana + ataque)
        const poderTotal = personagem.status.hp + personagem.status.mana + personagem.status.ataque;

        // 2. Define o conteudo interno com innerHTML e template string 
        colDiv.innerHTML = ` 
            <div class="card h-100 shadow-sm character-card"> 
                <div class="card-body"> 
                    <h3 class="card-title h5">${personagem.nome}</h3> 
                    <p class="text-muted mb-2">${personagem.classe} — Level ${personagem.level}</p> 
  
                    <h6 class="mt-3 mb-1">Habilidades</h6> 
                    <p class="small mb-3">${personagem.habilidades.join(", ")}</p> 
  
                    <h6 class="mb-1">Status</h6> 
                    <ul class="list-unstyled small mb-0"> 
                        <li><strong>HP:</strong> ${personagem.status.hp}</li> 
                        <li><strong>Mana:</strong> ${personagem.status.mana}</li> 
                        <li><strong>Ataque:</strong> ${personagem.status.ataque}</li> 
                    </ul> 
                    <hr>
                    <div class="poder-total fw-bold">
                        Poder Total: <span class="badge bg-danger">${poderTotal}</span>
                    </div>
                </div> 
            </div> 
        `; 
  
        // 3. Adiciona o card ao catalogo 
        catalogo.appendChild(colDiv); 
    }); 
} 
  
// Renderizar pela primeira vez ao carregar a pagina 
renderizarCatalogo(); 

// Selecao dos campos do formulario 
const campoNome = document.querySelector("#campoNome"); 
const campoClasse = document.querySelector("#campoClasse"); 
const campoLevel = document.querySelector("#campoLevel"); 
const campoHabilidades = document.querySelector("#campoHabilidades"); 
const campoHp = document.querySelector("#campoHp"); 
const campoMana = document.querySelector("#campoMana"); 
const campoAtaque = document.querySelector("#campoAtaque"); 
const btnAdicionar = document.querySelector("#btnAdicionarPersonagem"); 
  
function adicionarPersonagem() { 
    // Validacao basica 
    if (campoNome.value.trim() === "" || campoClasse.value.trim() === "") { 
        alert("Nome e classe sao obrigatorios."); 
        return; 
    } 
  
    // Trata as habilidades: split com virgula e trim em cada item 
    const habilidadesArray = campoHabilidades.value 
        .split(",") 
        .map(h => h.trim()) 
        .filter(h => h !== ""); 
  
    // Monta o objeto completo com objeto aninhado em status 
    const novoPersonagem = { 
        nome: campoNome.value.trim(), 
        classe: campoClasse.value.trim(), 
        level: parseInt(campoLevel.value) || 1, 
        habilidades: habilidadesArray, 
        status: { 
            hp: parseInt(campoHp.value) || 100, 
            mana: parseInt(campoMana.value) || 50, 
            ataque: parseInt(campoAtaque.value) || 50 
        } 
    }; 
  
    // Adiciona ao array e re-renderiza 
    personagens.push(novoPersonagem); 
    renderizarCatalogo(); 
  
    // Limpa o formulario 
    campoNome.value = ""; 
    campoClasse.value = ""; 
    campoLevel.value = ""; 
    campoHabilidades.value = ""; 
    campoHp.value = ""; 
    campoMana.value = ""; 
    campoAtaque.value = ""; 
    campoNome.focus(); 
} 
  
btnAdicionar.addEventListener("click", adicionarPersonagem); 