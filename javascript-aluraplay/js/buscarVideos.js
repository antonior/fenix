import { conectaAPI } from "./conectaAPI.js"
import constroiCard from "./mostrarVideos.js"

async function buscarVideo(evento) {
    evento.preventDefault()
    const termoDeBusca = document.querySelector('[data-pesquisa]').value
    const lista = document.querySelector('[data-lista]')
    lista.innerHTML = ''
    const listaApi = await conectaAPI.buscaVideo(termoDeBusca)
    listaApi.forEach(video => {
        const card = constroiCard(video.titulo, video.descricao, video.url, video.imagem)
        lista.appendChild(card)
    })

    if (listaApi.length === 0) {
        lista.innerHTML = '<h2 class="mensagem__titulo">Não foi possível encontrar nenhum vídeo com esse termo de busca</h2>'
    }
}

const botaoDePesquisa = document.querySelector('[data-botao-pesquisa]')

botaoDePesquisa.addEventListener('click', buscarVideo)