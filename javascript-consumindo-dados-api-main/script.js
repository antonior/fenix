async function buscaEndereco(cep) {
    mensagemErro = document.getElementById('erroCEP')
    mensagemErro.innerHTML = ''
    try {
        const consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        const consultaCEPConvertida = await consultaCEP.json()
        if (consultaCEPConvertida.erro) {
            return 'CEP não existente'
        }
        var cidade = document.getElementById('cidade')
        var logradouro = document.getElementById('endereco')
        var estado = document.getElementById('estado')
        var bairro = document.getElementById('bairro')

        cidade.value = consultaCEPConvertida.localidade
        logradouro.value = consultaCEPConvertida.logradouro
        estado.value = consultaCEPConvertida.uf
        bairro.value = consultaCEPConvertida.bairro

        console.log(consultaCEPConvertida)
        return consultaCEPConvertida
    }
    catch (error) {
        mensagemErro.innerHTML = '<p>CEP inválido</p>'
        console.log(error)
    }
    
}

var cep = document.getElementById('cep')
cep.addEventListener('focusout', () => buscaEndereco(cep.value))