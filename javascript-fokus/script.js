const html = document.querySelector('html')
const banner = document.querySelector('.app__image')
const btnFoco = document.querySelector('.app__card-button--foco')
const btnCurto = document.querySelector('.app__card-button--curto')
const btnLongo = document.querySelector('.app__card-button--longo')
const titulo = document.querySelector('.app__title')
const btns = document.querySelectorAll('.app__card-button')
const btnStartPause = document.querySelector('#start-pause')
const btnIniciarOuPausar = document.querySelector('#start-pause span')
const imgIniciarOuPausar = document.querySelector('#start-pause img')
const tempoNaTela = document.querySelector('#timer')

const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('/sons/luna-rise-part-one.mp3')
musica.loop = true
const audioPlay = new Audio('/sons/play.wav')
const audioPause = new Audio('/sons/pause.mp3')
const audioFim = new Audio('/sons/beep.mp3')
let tempoDecorridoEmSegundos = 25*60
let intervaloId = null

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

btnFoco.addEventListener('click', () => {
    alterarcontexto('foco')
    btnFoco.classList.add('active')
    tempoDecorridoEmSegundos = 25*60
})

btnCurto.addEventListener('click', () => {
    alterarcontexto('descanso-curto')
    btnCurto.classList.add('active')
    tempoDecorridoEmSegundos = 5*60
})

btnLongo.addEventListener('click', () => {
    alterarcontexto('descanso-longo')
    btnLongo.classList.add('active')
    tempoDecorridoEmSegundos = 15*60
})

function alterarcontexto(contexto) {
    mostrarTempo()
    btns.forEach(btn => btn.classList.remove('active'))
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada? <br>
            <strong class="app__title-strong">Faça uma pausa curta.</strong>`
            break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superfície.,<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break;
    
        default:
            break;
    }
}

const contagemRegressiva = () => {
    tempoDecorridoEmSegundos--
    mostrarTempo()
    if (tempoDecorridoEmSegundos <= 0) {
        alert('Acabou o tempo!')
        zerar()
        audioFim.play()
        return
    }
}

btnStartPause.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if (intervaloId) {
        zerar()
        imgIniciarOuPausar.setAttribute('src', '/imagens/play_arrow.png')
        audioPause.play()
        return
    }
    imgIniciarOuPausar.setAttribute('src', '/imagens/pause.png')
    audioPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    btnIniciarOuPausar.textContent = 'Pausar'
}

function zerar() {
    clearInterval(intervaloId)
    intervaloId = null
    btnIniciarOuPausar.textContent = 'Começar'
}


function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-BR', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.textContent = tempoFormatado
}

mostrarTempo()