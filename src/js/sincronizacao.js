(function (ctr) {
    'use strict'; //identifica quando uma variavel é definida de forma repetida e mostra o erro no console
    const usuario = 'douglas-ss@hotmail.com';

    $('#sync').click(function () {
      $(document).trigger('precisaSincronizar');
    });

    $.getJSON('https://ceep.herokuapp.com/cartoes/carregar?callback=?', { usuario }, function (res) {
        res.cartoes.reverse().forEach(function (cartao) {
            ctr.adicionaCartao(cartao.conteudo, '');
        });
    });

    $(document).on('precisaSincronizar', function(){  //criando um evento
        $('#sync').removeClass('botaoSync--sincronizado');
        $('#sync').addClass('botaoSync--esperando');

        const cartoes = [];
        $('.cartao').each(function () {
            const cartao = {};
            cartao.conteudo = $(this).find('.cartao-conteudo').html();
            cartoes.push(cartao);
        });
        console.log(cartoes);

        const mural = { usuario, cartoes }  // se o nome da prorpiedade é igual ao valor, entao pode ser declarado como objeto short hand
        $.ajax({
            url: 'https://ceep.herokuapp.com/cartoes/salvar',
            method: 'post',
            data: mural,
            success: function (res) {
                console.log(res.quantidade + 'cartoes salvos em' + res.usuario),
                    console.log(res),
                    $('#sync').addClass('botaoSync--sincronizado');
            },
            error: function () {
                $('#sync').addClass('botaoSync--deuRuim');
            },
            complete: function () {
                $('#sync').removeClass('botaoSync--esperando');
            }
        });
    });
})(cartaoController); //importante para identificar quais modulos estáo sendo importados e para dar erro no console ao rodar