const cartaoController = (function () {
    'use strict';
    let contador = $('.cartao').length;
    const botoes = document.querySelectorAll('.opcoesDoCartao-remove');

    function removeCartao() {
        console.log(this);
        const id = this.dataset.ref;
        const cartao = document.querySelector(`#cartao_${id}`); // ou ('#cartao_' + id)
        cartao.classList.add('cartao--some');


        setTimeout(() => {
            cartao.remove();
            $(document).trigger('precisaSincronizar');
        }, 300) // arrow function com escopo estático
        // no muda o conteúdo, equivalente a:
        // setTimeout(function(){
        //  cartao.remove();
        // }, 400);

    }

    function decideTipoCartao(texto) {
        let tipoCartao = 'cartao--textoPequeno';

        const quebras = texto.split('<br>').length;
        const totalDeLetras = texto.replace(/<br>/g, '').length;
        let tamMaior = 0;

        texto
            .replace(/<br>/g, '')
            .split('')
            .forEach(function (palavra) {
                if (palavra.length > tamMaior) {
                    tamMaior = palavra.length;
                }
            })

        if (tamMaior < 9 && quebras < 5 && totalDeLetras < 55) {
            tipoCartao = 'cartao--textoGrande';
        } else if (tamMaior < 12 && quebras < 6 && totalDeLetras < 75) {
            tipoCartao = 'cartao--textoMedio';
        }

        return tipoCartao;
    }

    function adicionaCartao(texto, cor) {
        contador++;
        const botao = $('<button>')
            .addClass('opcoesDoCartao-remove')
            .text('Remover')
            .click(removeCartao)
            .attr('data-ref', contador);

        const paragrafo = $('<p>')
            .on('input', editaCartao)
            .attr('contenteditable', true)
            .addClass('cartao-conteudo')
            .html(texto);

        const opcoesDoCartao = $('<div>')
            .addClass('opcoesDoCartao')
            .append(botao);

        const tipoCartao = decideTipoCartao(texto);

        const cartao = $('<div>')
            .addClass('cartao')
            .addClass(tipoCartao)
            .css('background', cor)
            .attr('id', `cartao_${contador}`);

        cartao.append(opcoesDoCartao)
            .append(paragrafo)
            .prependTo('.mural');
    }
    
    var timer = 0;
    function editaCartao(){
        const paragrafo = $(this);
        clearTimeout(timer);
        timer = setTimeout(function(){
            $(document).trigger('precisaSincronizar');
            const tipo = decideTipoCartao(paragrafo.text());
            paragrafo.closest('.cartao').removeClass('cartao--textoPequeno cartao--textoMedio cartao--textoGrande').addClass(tipo);
        }, 1000);
    }

    for (botaoCartao of botoes) {
        botaoCartao.addEventListener('click', removeCartao);
    }

    return {adicionaCartao}

})();