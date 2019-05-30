'use strict';

var gLastRes = null;

$(document).ready(init);

function init() {
    addListners();
    createQuestsTree();

}

function onStartGuessing() {
    $('.h1').text('Guess Who?');
    $('.game-start').hide();
    createQuestsTree();
    renderQuest();
    $('.quest').show();
}

function renderQuest() {
    $('.quest h2').text(gCurrQuest.txt);
}

function onUserResponse(res) {

    if (isChildless(gCurrQuest)) {
        if (res === 'yes') {
            $('.h1').text('You Got This!');
            onRestartGame();
        } else {
            $('.h1').text('I dont know...teach me!');
            $('.quest').hide()
            $('.new-quest').show()
        }
    } else {
        gLastRes = res;
        moveToNextQuest(res);
        renderQuest();
    }
}

function onAddGuess() {
    var valueNewGuess = $("input[name*='newGuess']").val();
    var valueNewQuest = $("input[name*='newQuest']").val();

    addGuess(valueNewQuest, valueNewGuess)
    onRestartGame();
}


function onRestartGame() {
    $('.quest').hide()
    $('.new-quest').hide();
    $('.game-start').show();
    gLastRes = null;

}

function addListners() {
    $('.game-start button').click(function() {
        onStartGuessing();
    });
    $('#onButtonYes').click(function() {
        onUserResponse('yes');
    })
    $('#onButtonNo').click(function() {
        onUserResponse('no');
    })

    $(".button-submit").click(function() {
        onAddGuess();
        $('.h1').text('Tnx , Go For Another Game');
    })

}