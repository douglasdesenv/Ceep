(function () {
    'use strict';
    $('#ajuda').click(function () {
        $.getJSON('https://ceep.herokuapp.com/cartoes/instrucoes', function (RES) {
            RES.instrucoes.forEach(function (cartao) {
                cartaoController.adicionaCartao(cartao.conteudo, cartao.cor);
            })

        });
        console.log('oi');
    });

})();