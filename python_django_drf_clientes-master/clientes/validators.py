import re
from validate_docbr import CPF

def cpf_valido(cpf):
    return CPF.validate(cpf)

def nome_valido(nome):
    return nome.isalpha()
        
def rg_valido(rg):
    return len(rg) == 9

def celular_valido(celular):
    modelo = "[0-9]{2} [0-9]{5}-[0-9]{4}"
    return re.findall(modelo, celular)