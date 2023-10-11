function verificaSeOChutePossuiUmValorValido(chute) {
    const numero = parseInt(chute)
    
    if (isNaN(numero)) {
        elementoChute.innerHTML += '<div>Valor inválido</div>'
    }

    if (numero < menorValor || numero > maiorValor) {
        elementoChute.innerHTML += `
        <div>Fale um número entre ${menorValor} e ${maiorValor}</div>
        `
        return
    }

    if (numero === numeroSecreto) {
        elementoChute.innerHTML = `
        <h2>Parabéns! Você acertou!</h2>
        <h3>O número secreto era ${numeroSecreto}</h3>

        <button id="jogar-novamente" class="btn-jogar" onclick="window.location.reload()">Jogar novamente</button>
        `
        recognition.stop()
    } else if (numero > numeroSecreto) {
        elementoChute.innerHTML += `
        <div>O número secreto é menor <i class="fa-solid fa-arrow-down"></i></div>
        `
    } else {
        elementoChute.innerHTML += `
        <div>O número secreto é maior <i class="fa-solid fa-arrow-up"></i></div>
        `
    }
}