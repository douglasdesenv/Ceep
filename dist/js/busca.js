(function () {
    'use strict';
    $('#busca').on('input', function () {
        let digitado = $(this).val().trim();
        const $cartoes = $('.cartao');
        if (digitado) {
            $cartoes.hide().filter(function () {
                return $(this).find('.cartao-conteudo')
                    .text()
                    .match(new RegExp(digitado, 'i'));
            }).show();
        } else {
            $cartoes.show();
        }
    })

})();
