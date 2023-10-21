const inputCheck = document.querySelector('#modo-noturno')
const elemento = document.querySelector('body')

inputCheck.addEventListener('change', () => {
    const modo = inputCheck.checked ? 'dark' : 'light'
    elemento.setAttribute('data-bs-theme', modo)
})