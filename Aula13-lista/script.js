// Elementos do DOM
const contadorElement = document.getElementById('contador');
const listaElement = document.getElementById('lista');
const inputTarefaElement = document.getElementById('inputTarefa');
const btnAdicionarElement = document.getElementById('btnAdicionar');

// 01 Função atualizarContador() que lê lista.children.length e atualiza o textContent do elemento #contador. Chamar sempre que uma tarefa for adicionada ou removida.
function atualizarContador() {
    contadorElement.textContent = listaElement.children.length;
}

// 02 Extrair a lógica de adicionar tarefa para uma função reutilizável adicionarTarefa(). Registrar addEventListener de click no botão E addEventListener de keydown no inputTarefa verificando evento.key === 'Enter', ambos chamando adicionarTarefa().
function adicionarTarefa() {
    const textoTarefa = inputTarefaElement.value.trim();
    if (textoTarefa === '') return;

    const li = document.createElement('li');
    li.className = 'd-flex justify-content-between align-items-center mb-3 task-item bg-white';

    // Container para o checkbox e o texto
    const containerEsquerdo = document.createElement('div');
    containerEsquerdo.className = 'd-flex align-items-center flex-grow-1 me-3 text-break';

    // 03 Cada tarefa criada deve conter: um <input type="checkbox"> criado via createElement. No evento change do checkbox, alternar a classe concluida no <li>. O texto da tarefa deve ficar em um <span>.
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'form-check-input me-3 mt-0';
    checkbox.addEventListener('change', function () {
        li.classList.toggle('concluida');
    });

    const spanTexto = document.createElement('span');
    spanTexto.textContent = textoTarefa;
    spanTexto.className = 'task-text';

    containerEsquerdo.appendChild(checkbox);
    containerEsquerdo.appendChild(spanTexto);

    // 04 Cada tarefa deve ter dois botões: um botão X (btn btn-danger btn-sm) que remove o <li> e chama atualizarContador(); e um botão ✏️ Editar (btn btn-warning btn-sm) que substitui o <span> de texto por um <input> editável com o valor atual. Ao pressionar Enter ou ao disparar o evento blur, substituir o input de volta por um <span> com o valor atualizado.
    const containerBotoes = document.createElement('div');
    containerBotoes.className = 'd-flex gap-2 flex-shrink-0';

    const btnEditar = document.createElement('button');
    btnEditar.className = 'btn btn-warning btn-sm';
    btnEditar.textContent = ' Editar';

    btnEditar.addEventListener('click', function () {
        // Evita múltiplas edições simultâneas no mesmo item
        if (containerEsquerdo.contains(spanTexto)) {
            const inputEdicao = document.createElement('input');
            inputEdicao.type = 'text';
            inputEdicao.className = 'form-control form-control-sm';
            inputEdicao.value = spanTexto.textContent;

            // Flag para evitar que blur e enter chamem a função duas vezes
            let salvando = false;

            function salvarEdicao() {
                if (salvando) return;
                salvando = true;

                const novoTexto = inputEdicao.value.trim() || spanTexto.textContent;
                spanTexto.textContent = novoTexto;

                if (containerEsquerdo.contains(inputEdicao)) {
                    containerEsquerdo.replaceChild(spanTexto, inputEdicao);
                }
            }

            inputEdicao.addEventListener('blur', salvarEdicao);
            inputEdicao.addEventListener('keydown', function (evento) {
                if (evento.key === 'Enter') {
                    salvarEdicao();
                }
            });

            containerEsquerdo.replaceChild(inputEdicao, spanTexto);
            inputEdicao.focus();
        }
    });

    const btnRemover = document.createElement('button');
    btnRemover.className = 'btn btn-danger btn-sm';
    btnRemover.textContent = 'X';

    btnRemover.addEventListener('click', function () {
        li.remove();
        atualizarContador();
    });

    containerBotoes.appendChild(btnEditar);
    containerBotoes.appendChild(btnRemover);

    li.appendChild(containerEsquerdo);
    li.appendChild(containerBotoes);

    listaElement.appendChild(li);
    inputTarefaElement.value = '';

    atualizarContador();
}

// Registrando os eventos para adicionar tarefa
btnAdicionarElement.addEventListener('click', adicionarTarefa);

inputTarefaElement.addEventListener('keydown', function (evento) {
    if (evento.key === 'Enter') {
        adicionarTarefa();
    }
});