const charactersGrid = document.getElementById('characters-grid');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const modal = document.getElementById('characterModal');
const modalBody = document.getElementById('modal-body');
const closeModal = document.getElementById('closeModal');

const API_BASE = 'https://dragonball-api.com/api/characters';

// Função para buscar personagens
async function fetchCharacters(query = '') {
    charactersGrid.innerHTML = '<div class="loader">Invocando Shenlong...</div>';
    
    try {
        let url = query ? `${API_BASE}?name=${query}` : API_BASE;
        const response = await fetch(url);
        const data = await response.json();

        const characters = data.items || data;
        renderCharacters(characters);
    } catch (error) {
        console.error('Erro ao buscar personagens:', error);
        charactersGrid.innerHTML = `
            <div class="no-results">
                <h3>OPS! ALGO DEU ERRADO NO OUTRO MUNDO.</h3>
                <p>Verifique sua conexão ou tente novamente mais tarde.</p>
            </div>
        `;
    }
}

// Função para buscar detalhes de um personagem específico
async function showCharacterDetails(id) {
    modal.style.display = 'block';
    modalBody.innerHTML = '<div class="loader">Buscando transformações...</div>';
    
    try {
        const response = await fetch(`${API_BASE}/${id}`);
        const char = await response.json();

        let transformationsHtml = '';
        
        if (char.transformations && char.transformations.length > 0) {
            transformationsHtml = `
                <div class="modal-header">
                    <h2>${char.name}</h2>
                    <p>Transformações e Evoluções</p>
                </div>
                <div class="transformations-grid">
                    ${char.transformations.map(t => `
                        <div class="transformation-card">
                            <img src="${t.image}" alt="${t.name}">
                            <h3>${t.name}</h3>
                            <span class="ki-info">KI: ${t.ki}</span>
                        </div>
                    `).join('')}
                </div>
            `;
        } else {
            transformationsHtml = `
                <div class="modal-header">
                    <h2>${char.name}</h2>
                    <p>Este guerreiro ainda não revelou suas transformações.</p>
                </div>
                <div style="text-align: center; padding: 2rem;">
                    <img src="${char.image}" style="max-height: 300px; filter: drop-shadow(0 0 20px var(--dbz-orange));">
                </div>
            `;
        }

        modalBody.innerHTML = transformationsHtml;
    } catch (error) {
        modalBody.innerHTML = '<h3>Erro ao carregar detalhes.</h3>';
    }
}

// Função para renderizar os cards
function renderCharacters(characters) {
    charactersGrid.innerHTML = '';

    if (!characters || (Array.isArray(characters) && characters.length === 0)) {
        charactersGrid.innerHTML = `
            <div class="no-results">
                <h3>GUERREIRO NÃO ENCONTRADO!</h3>
                <p>Talvez ele esteja treinando no Planeta do Senhor Kaioh.</p>
            </div>
        `;
        return;
    }

    const charsArray = Array.isArray(characters) ? characters : [characters];

    charsArray.forEach((char, index) => {
        const card = document.createElement('div');
        card.className = 'character-card';
        card.style.animationDelay = `${index * 0.1}s`;
        
        // Adiciona evento de clique para ver detalhes
        card.onclick = () => showCharacterDetails(char.id);

        card.innerHTML = `
            <div class="card-image-container">
                <img src="${char.image}" alt="${char.name}" loading="lazy">
            </div>
            <div class="card-content">
                <span class="race-tag">${char.race}</span>
                <h2>${char.name}</h2>
                <div class="stats-grid">
                    <div class="stat-item">
                        <span class="stat-label">KI ATUAL</span>
                        <span class="stat-value">${char.ki}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">KI MÁXIMO</span>
                        <span class="stat-value">${char.maxKi}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">GÊNERO</span>
                        <span class="stat-value">${char.gender}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">AFILIAÇÃO</span>
                        <span class="stat-value">${char.affiliation}</span>
                    </div>
                </div>
            </div>
        `;

        charactersGrid.appendChild(card);
    });
}

// Fechar Modal
closeModal.onclick = () => modal.style.display = 'none';
window.onclick = (event) => {
    if (event.target == modal) modal.style.display = 'none';
}

// Event Listeners
searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    fetchCharacters(query);
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        fetchCharacters(query);
    }
});

// Carregamento inicial
document.addEventListener('DOMContentLoaded', () => {
    fetchCharacters();
});
