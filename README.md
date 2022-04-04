# Project Manager

## Endpoints

### User

#### POST /user/register

Exemplo de body:

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "johndoe@gmail.com",
  "password": "123"
}
```

#### POST /user/login

Exemplo de body:

```json
{
  "email": "johndoe@gmail.com",
  "password": "123"
}
```

#### POST /workspace

Exemplo de body:

```json
{
  "userId": 1,
  "workspaceName": "Projects"
}
```

#### POST /column

Exemplo de body:

```json
{
  "workspaceId": 1,
  "title": "Project To Do List"
}
```

#### PUT /column/:id

Exemplo de body:

```json
{
  "title": "Project To Do List Updated"
}
```

#### POST /card

Exemplo de body:

```json
{
  "columnId": 3,
  "index": 4,
  "title": "Requeriment 1",
  "content": "Do tomorrow"
}
```

#### PUT /card/:id

Exemplo de body:

> Pode ser passado qualquer combinação de parâmetros

```json
{
  "columnId": 2,
  "index": 2,
  "title": "Requeriment 1",
  "content": "Do Today"
}
```

#### GET /workspace/:id

Exemplo de resposta:

```json
{
  "data": {
    "id": 2,
    "name": "Store Manager",
    "ownerId": 2,
    "columns": [
      {
        "id": 1,
        "title": "Para Fazer",
        "workspaceId": 2,
        "cards": [
          {
            "id": 1,
            "content": "Fazer req 10",
            "title": "Projeto Store Manager",
            "columnId": 1
          }
        ]
      },
      {
        "id": 2,
        "title": "Fazendo",
        "workspaceId": 2,
        "cards": [
          {
            "id": 2,
            "content": "Fazer req 5",
            "title": "Projeto Blogs Api",
            "columnId": 2
          }
        ]
      },
      {
        "id": 3,
        "title": "Finalizado",
        "workspaceId": 2,
        "cards": []
      }
    ]
  }
}
```

## Validações:

### User

- firstName
  - string
  - min(3)
  - max(60)
  - required
- lastName
  - string
  - min(3)
  - max(60)
  - required
- email
  - string
  - formato de email
  - único
  - required
- password
  - string
  - min(6)
  - required

### Workspace

- name
  - string
  - min(3)
  - max(60)
  - required
- ownerId
  - required
  - tem que existir o userId correspondente

### WorkspaceColumn

- title
  - string
  - min(3)
  - max(60)
  - required
- workspaceId
  - required
  - tem que existir o workspaceId correspondente

### WorkspaceCard

- title
  - string
  - min(3)
  - max(60)
- index
  - number
- content
  - string
  - max(200)
- columnId
  - required
  - tem que existir o columnId correspondente
