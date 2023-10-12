import { conectaAPI } from "./conectaAPI.js"
const formulario = document.querySelector('[data-formulario]')

async function criarVideo(evento) {
    evento.preventDefault()
    const titulo = formulario.querySelector('[data-titulo]').value
    const descricao = Math.floor(Math.random() * 10).toString() + ' mil visualizações'
    const url = formulario.querySelector('[data-url]').value
    const imagem = formulario.querySelector('[data-imagem]').value

    try {
        await conectaAPI.criaVideo(titulo, descricao, url, imagem)
        window.location.href = '../pages/envio-concluido.html'
    } catch (error) {
        alert(error.message)
    }
}

formulario.addEventListener('submit', criarVideo)