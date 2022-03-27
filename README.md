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

#### POST /card

Exemplo de body:

```json
{
  "columnId": 3,
  "title": "Requeriment 1",
  "content": "Do tomorrow" 
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
  - required
- content
  - string
  - max(200)
- columnId
  - required
  - tem que existir o columnId correspondente
