(function () {
    'use strict';
    $('.novoCartao').submit(function (e) {
        e.preventDefault();
        const campoTexto = $('.novoCartao-conteudo');
        const texto = campoTexto.val().trim().replace(/\n/g, '<br>');

        if (texto) {
            cartaoController.adicionaCartao(texto, "");
            $(document).trigger('precisaSincronizar');
            campoTexto.val('').focus();
        }
    });

})();
