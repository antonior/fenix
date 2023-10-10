function tocaSom(idElementoAudio) {
    const elemento = document.querySelector(idElementoAudio);

    if (elemento && elemento.localName == 'audio') {
        elemento.play();
    }
    else {
        console.log('Elemento de audio não encontrado');
    }
}

listaDeTeclas = document.querySelectorAll('.tecla');

for (let tecla of listaDeTeclas) {
    const instrumento = tecla.classList[1];
    const idAudio = `#som_${instrumento}`;
    tecla.onclick = () => tocaSom(idAudio);

    //on onkeydown, add class 'ativa' to the tecla
    tecla.onkeydown = (event) => {
        if (event.code == 'Space' || event.code == 'Enter') {
            tecla.classList.add('ativa');
        }
    }
    //on onkeyup, remove class 'ativa' from the tecla
    tecla.onkeyup = (event) => {
        if (event.code == 'Space' || event.code == 'Enter') {
            tecla.classList.remove('ativa');
        }
    }
}