<h1 align="center">
    <img style="width: 55%" alt="Bank Account" src="https://user-images.githubusercontent.com/18368947/83980186-1799f200-a8ea-11ea-98c7-0cb5fc6daa80.jpeg" />
</h1>

## Projeto :bank:

- Bank Accounts API, projeto criado para aprendizado de utilização da linguagem [NodeJS](https://nodejs.org/en/ "NodeJS"), que visa simular as operações numa conta de banco (Criação, Exclusão, Transferências, Saques, Depósitos e Listagens) utilizando como forma de armazenamento arquivo [JSON](https://www.json.org/json-en.html "JSON")

## Tecnologias :computer:
- [NodeJS](https://nodejs.org/en/ "NodeJS")
- [Express](https://expressjs.com/ "Express")
- [Winston](https://github.com/winstonjs/winston "Winston") - Criação de Logs
- [Insomnia](https://insomnia.rest/ "Insomnia") - Efetuando testes das requisições

## Getting Started :white_check_mark:

- Passo 1: executar a instalação do [NodeJS](https://nodejs.org/en/ "NodeJS")
- Passo 2: git clone do projeto bank-account-api

		# Navegando até a pasta do projeto
		$ cd bank-account-api
		# Instalando todas as depêndencias necessárias
		$ npm install
		# Starting o backend da aplicação
		$ npm run dev

## Casos de Teste :hammer:
	# Requisição de criação
	POST - /accounts
	params: {
	  "name": "Rafael Sanzio",
	  "balance": 2500
	}

	# Requisições de listagens
	GET - /accounts #Listando todas as contas
	GET - /accounts/{id} #Retornando apenas uma conta

	# Requisição de exclusão
	DELETE - /accounts/{id}

	# Requisição de atualização
	PUT - /accounts/{id}
	params: {
	  "name": "Mateus Silveira",
	  "balance": 25000
	}

	# Requisição de transações (Saques e Depósitos)
	POST - /accounts/transaction
	params: {
	  "id": 1,
	  "value": 200 #Valor positivo para depósito e negativo para saque
	}

	# Requisição de transferência
	POST - /accounts/transfer
	params: {
	  "to": 4,
	  "from": 1,
	  "value": 5000
	}

<h1 align="center">
	<img alt="Desafio conceitos nodeJS" src="https://insomnia.rest/images/run.svg" />
</h1>


## Imagens :camera:
<h1 align="center">
    <img alt="Desafio conceitos nodeJS" src="https://user-images.githubusercontent.com/18368947/83980581-6006df00-a8ed-11ea-98f5-0bfef47fdd3c.png" />
</h1>

## Considerações :congratulations:
- Projeto desenvolvido no Bootcamp - Full Stack da [IGTI](https://www.igti.com.br/ "IGTI")  by:

 - <i class="fa fa-github" aria-hidden="true"></i> [Rafael Sanzio - GitHub](https://github.com/rafaelsanzio "Rafael Sanzio")
 - <i class="fa fa-linkedin" aria-hidden="true"></i> [Rafael Sanzio - LinkedIn](https://www.linkedin.com/in/rafael-sanzio-012778143/ "Rafael Sanzio")
