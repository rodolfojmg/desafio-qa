# language: pt

Funcionalidade: Controle de listas de importações
  Para realizar controle de importações da minha loja
  Eu como usuário do sistema
  Quero realizar o controle das vendas relacionada a minha loja

  @test
  Cenário: Consulta do valor bruno das importações
    Dado Que estou na tela de lista de importações
    Quando faço o calculo entre a coluna preço x qtde
    Então Visualizo que o valor total bruto das importações é "190"