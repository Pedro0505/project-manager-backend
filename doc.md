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
  "password": "12345678"
}
```

#### POST /user/login

Exemplo de body:

```json
{
  "email": "johndoe@gmail.com",
  "password": "12345678"
}
```

#### POST /workspace

Exemplo de body:

```json
{
  "userId": "672cfaa7-0c19-46e4-92b0-b377019ac381",
  "workspaceName": "Projects"
}
```

#### POST /column

Exemplo de body:

```json
{
  "workspaceId": "bd07675d-1582-461d-98b8-55522642bfff",
  "title": "Project To Do List",
  "index": 6
}
```

#### PUT /column/:id

Exemplo de body:

> Pode ser passado qualquer combinação de parâmetros

```json
{
  "title": "Project To Do List Updated",
  "index": 8
}
```

#### POST /card

Exemplo de body:

```json
{
  "columnId": "7d80de56-618f-4329-81e8-8b20c0723b12",
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
  "columnId": "7d80de56-618f-4329-81e8-8b20c0723b12",
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
    "id": "186fced2-77a7-4545-9492-f8f18ed86ec8",
    "name": "Store Manager",
    "ownerId": "672cfaa7-0c19-46e4-92b0-b377019ac381"
  }
}
```

- Com `includeColumns=true`

Exemplo de resposta:

```json
{
  "data": {
    "id": "186fced2-77a7-4545-9492-f8f18ed86ec8",
    "name": "Store Manager",
    "ownerId": "672cfaa7-0c19-46e4-92b0-b377019ac381",
    "columns": [
      {
        "id": "7d80de56-618f-4329-81e8-8b20c0723b12",
        "title": "Para Fazer",
        "workspaceId": "186fced2-77a7-4545-9492-f8f18ed86ec8",
        "cards": [
          {
            "id": "d593be77-03ce-4749-9f71-98dff62dc182",
            "content": "Fazer req 10",
            "title": "Projeto Store Manager",
            "columnId": "7d80de56-618f-4329-81e8-8b20c0723b12"
          }
        ]
      },
      {
        "id": "7d80de56-618f-4399-81e8-8b20c8723c12",
        "title": "Fazendo",
        "workspaceId": "186fced2-77a7-4545-9492-f8f18ed86ec8",
        "cards": [
          {
            "id": "9d5297b4-562a-4858-867c-fd70929cc6a5",
            "content": "Fazer req 5",
            "title": "Projeto Blogs Api",
            "columnId": "7d80de56-618f-4399-81e8-8b20c8723c12"
          }
        ]
      },
      {
        "id": "781b54b4-263d-4851-9ff1-d5797ef6bc24",
        "title": "Finalizado",
        "workspaceId": "186fced2-77a7-4545-9492-f8f18ed86ec8",
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
  - string
  - required
  - tem que existir o userId correspondente

### WorkspaceColumn

- title
  - string
  - min(3)
  - max(60)
  - required
- workspaceId
  - string
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
  - string
  - required
  - tem que existir o columnId correspondente
