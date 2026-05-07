// Requisito 06: Array de inscrições no topo do arquivo
const inscricoes = [];

// Selecionando os elementos do DOM
const formulario = document.getElementById("formInscricao");
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const cpf = document.getElementById("cpf");
const telefone = document.getElementById("telefone");
const dataNascimento = document.getElementById("dataNascimento");
const tipoEvento = document.getElementById("tipoEvento");
const termos = document.getElementById("termos");
const btnEnviar = document.getElementById("btnEnviar");
const contadorInscricoes = document.getElementById("contadorInscricoes");

// Função utilitária para aplicar classes de validação do Bootstrap
function aplicarValidacaoVisual(elemento, isValid) {
    if (isValid) {
        elemento.classList.remove("is-invalid");
        elemento.classList.add("is-valid");
    } else {
        elemento.classList.remove("is-valid");
        elemento.classList.add("is-invalid");
    }
}

// 1. Validar Nome
function validarNome() {
    const isValid = nome.value.trim().length >= 3;
    aplicarValidacaoVisual(nome, isValid);
    return isValid;
}

// 2. Validar E-mail
function validarEmail() {
    const val = email.value.trim();
    const temArroba = val.includes("@");
    const temPontoDepoisArroba = temArroba && val.indexOf(".", val.indexOf("@")) > -1;
    
    const isValid = val.length > 0 && temArroba && temPontoDepoisArroba;
    aplicarValidacaoVisual(email, isValid);
    return isValid;
}

// 3. Validar Senha (Requisito 04)
function validarSenha() {
    const val = senha.value;
    
    // Regra 1: Mínimo 8 caracteres
    const regraTamanho = val.length >= 8;
    
    // Regra 2: Contém ao menos um número
    const regraNumero = /\d/.test(val);
    
    // Regra 3: Contém ao menos um caractere especial
    const especiais = "!@#$%&*";
    let regraEspecial = false;
    for (let i = 0; i < val.length; i++) {
        if (especiais.includes(val[i])) {
            regraEspecial = true;
            break;
        }
    }
    
    const isValid = regraTamanho && regraNumero && regraEspecial;
    aplicarValidacaoVisual(senha, isValid);
    return isValid;
}

// 4. Validar CPF
function validarCPF() {
    const val = cpf.value.trim();
    // Exatamente 11 caracteres e apenas números
    const isValid = val.length === 11 && !/\D/.test(val);
    aplicarValidacaoVisual(cpf, isValid);
    return isValid;
}

// 5. Validar Telefone (Requisito 02)
function validarTelefone() {
    // Remove tudo que não for dígito
    let apenasNumeros = telefone.value.replace(/\D/g, "");
    
    // Limita o valor interno para não passar de 11 caso o usuário cole textos grandes
    if (apenasNumeros.length > 11) {
        apenasNumeros = apenasNumeros.substring(0, 11);
    }
    telefone.value = apenasNumeros; // Atualiza o campo com valor limpo
    
    // Valida se tem exatamente 11 dígitos
    const isValid = apenasNumeros.length === 11;
    aplicarValidacaoVisual(telefone, isValid);
    return isValid;
}

// 6. Validar Data de Nascimento
function validarDataNascimento() {
    const isValid = dataNascimento.value !== "";
    aplicarValidacaoVisual(dataNascimento, isValid);
    return isValid;
}

// 7. Validar Área de Atuação (Requisito 03)
function validarTipoEvento() {
    const isValid = tipoEvento.value !== "";
    aplicarValidacaoVisual(tipoEvento, isValid);
    return isValid;
}

// 8. Validar Termos
function validarTermos() {
    const isValid = termos.checked;
    aplicarValidacaoVisual(termos, isValid);
    return isValid;
}

// FUNÇÃO CENTRAL: verificarFormulario()
function verificarFormulario() {
    // Chamar todas as funções de validação
    const vNome = validarNome();
    const vEmail = validarEmail();
    const vSenha = validarSenha();
    const vCpf = validarCPF();
    const vTelefone = validarTelefone();
    const vData = validarDataNascimento();
    const vTipo = validarTipoEvento();
    const vTermos = validarTermos();
    
    // Retornar true APENAS se TODAS retornarem true
    const isFormValid = vNome && vEmail && vSenha && vCpf && vTelefone && vData && vTipo && vTermos;
    
    // Habilitar ou desabilitar o botão
    btnEnviar.disabled = !isFormValid;
    
    return isFormValid;
}

// Adicionando os event listeners (input / change)
const camposInput = [nome, email, senha, cpf, telefone];
camposInput.forEach(campo => {
    campo.addEventListener("input", verificarFormulario);
});

const camposChange = [dataNascimento, tipoEvento, termos];
camposChange.forEach(campo => {
    campo.addEventListener("change", verificarFormulario);
});

// Ação do Botão Inscrever-me
btnEnviar.addEventListener("click", function() {
    // Verificação de segurança (embora o botão esteja disabled se inválido)
    if (verificarFormulario()) {
        
        // Obter texto da área selecionada
        const areaTexto = tipoEvento.options[tipoEvento.selectedIndex].text;
        
        // Criar objeto
        const novaInscricao = {
            nome: nome.value.trim(),
            email: email.value.trim(),
            tipoEvento: areaTexto,
            telefone: telefone.value,
            dataNascimento: dataNascimento.value
        };
        
        // Adicionar ao array
        inscricoes.push(novaInscricao);
        
        // Atualizar o contador no HTML
        contadorInscricoes.textContent = `Total: ${inscricoes.length} inscrição(ões)`;
        
        // Exibir a inscrição na lista visível
        const listaInscricoes = document.getElementById("listaInscricoes");
        if (listaInscricoes) {
            const li = document.createElement("li");
            li.className = "list-group-item d-flex justify-content-between align-items-start";
            li.innerHTML = `
                <div class="ms-2 me-auto">
                    <div class="fw-bold">${novaInscricao.nome}</div>
                    ${novaInscricao.email} &bull; ${novaInscricao.tipoEvento}
                </div>
            `;
            listaInscricoes.appendChild(li);
        }
        
        // Preencher o modal com os dados
        document.getElementById("modalNome").textContent = novaInscricao.nome;
        document.getElementById("modalEmail").textContent = novaInscricao.email;
        document.getElementById("modalArea").textContent = novaInscricao.tipoEvento;
        
        // Instanciar e exibir o modal (Requisito 05)
        const modalElement = document.getElementById("modalConfirmacao");
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
    }
});

// Ação para fechar e limpar o formulário (Requisito 05)
function limparFormulario() {
    // Limpa os valores
    formulario.reset();
    
    // Remove as classes de validação de todos os campos
    const todosCampos = [nome, email, senha, cpf, telefone, dataNascimento, tipoEvento, termos];
    todosCampos.forEach(campo => {
        campo.classList.remove("is-valid", "is-invalid");
    });
    
    // Desabilita o botão novamente
    btnEnviar.disabled = true;
}

// Adicionar evento ao fechamento do modal para limpar o formulário
const modalElement = document.getElementById("modalConfirmacao");
modalElement.addEventListener("hidden.bs.modal", limparFormulario);