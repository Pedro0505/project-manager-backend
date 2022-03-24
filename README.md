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

## Validações:

- firstName
  - string
  - min(3)
  - required
- lastName
  - string
  - min(3)
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
