# language: pt

Funcionalidade: Controle de listas de importações
  Para realizar controle de importações da minha loja
  Eu como usuário do sistema
  Quero realizar o controle das vendas relacionada a minha loja

  @testSuccess
  Cenário: Acessar pagina de importações
    Dado que estou na tela de lista de importações
    Então visualizo que estou na página de importações

  @testSuccess
  Cenário: Visualizar importação realizada
    Dado que estou na tela de lista de importações
    Então visualizo que o "João Silva" realizou uma importação

  @testError
  Cenário: Não visualizar tabela de importações
    Dado que estou na tela de lista de importações
    Então não visualizo a tabla de importações