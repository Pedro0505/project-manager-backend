# Project Manager - Back End

## Contexto

Project Manager é um clone FullStack do Trello. Nele você pode criar um board no estilo Kanban com todas as funcionalidades de CRUD dos cards, listas e workspaces; funcionalidades de drag and drop e autenticação com Auth0.

Feito pela equipe:

- [@matheusg18](https://github.com/matheusg18)
- [@Pedro0505](https://github.com/Pedro0505)

## Tecnologias Usadas

Back-End:

> NodeJS, Express, JWT, Prisma ORM, Typescript

Testes:

> Jest

DevOps:
> Docker, Heroku

DataBase:
> PostgreSql

## Executando a Aplicação

A execução local pode ser dada das seguintes formas: Docker ou Node 

<details>
  <summary><b>Iniciando o projeto com docker 🐳</b></summary><br>

  ***⚠️ Para garantir um bom funcionamento é necessário que tenha instalado o docker e o docker-compose nas versões 20.10.16 e 1.29 ou superior respectivamente⚠️***

  1. Clone o projeto

  ```bash
    git clone git@github.com:Pedro0505/project-manager-backend.git
  ```

  2. Entre no diretório do projeto

  ```bash
    cd project-manager-backend
  ```

  3. Suba os containers

  ```bash
    docker-compose -f docker-compose.dev.yml up --build -d
  ```

  5. Quando o processo dos containers estiver acabado acesse a aplicação usando o seguinte endereço

  ```bash
    http://localhost:3001
  ```

  6. Para derrubar os containers

  ```bash
    docker-compose -f docker-compose.test.yml down --rmi all --volumes --remove-orphans
  ```
</details>

<details>
  <summary><b>Node</b></summary><br>

  ***⚠️ Para rodar localmente é necessário ter o PostgreSql instalado localmente ⚠️***

  ***Obs: Para usar localmente deve ser preenchido com as informações necessárias no '.env', conforme está escrito no '.env.example'***

  Clone o projeto

  ```bash
    git clone git@github.com:Pedro0505/project-manager-backend.git
  ```

  Entre no diretório do projeto

  ```bash
    cd project-manager-backend
  ```

  Instale as dependências

  ```bash
    npm install
  ```

  Inicie o servidor

  ```bash
    npm start
  ```

  Acesse a aplicação usando o seguinte endereço

  ```bash
    localhost:3001
  ```
</details>
