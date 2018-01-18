(function () {
    'use strict';
    function mudaLayout() {
        const adicionouClass = mural.classList.toggle('mural--linhas');
        if (adicionouClass) {
            this.textContent = "Bloco";
        } else {
            this.textContent = "Linhas";
        }
    }

    const mural = document.querySelector('.mural')
    const botao = document.querySelector('#mudaLayout');
    // botao.onclick = mudaLayout; nao dá para usar mais de um evento
    botao.addEventListener('click', mudaLayout); // dá para usar mais de um evento 

})();
