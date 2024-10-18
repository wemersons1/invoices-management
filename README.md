# Administrador de faturas

## Como instalar

Softwares obrigatórios:

- Docker
- docker-compose

É necessario copiar o arquivo .env.example e renomear para .env com as respectivas credenciais.

Dentro da pasta raiz do projeto você deve executar `docker-compose up --build`

Você está pronto para rodar agora.

- `Está disponível em http://localhost:3000`

## Endpoints disponíveis

- Login: POST localhost:3000/login
- Create User: POST localhost:3000/users
  - {"email": "test@teste.com", "password": "123456", "first_name": "Jhon", "last_name": "Doe"}
- Find user [Authentication required]: GET localhost:3000/users/{user_id}
- List user [Authentication required]: GET localhost:3000/users
- Update user [Authentication required]: PUT localhost:3000/users/{user_id}
  - {"email": "test@teste.com", "first_name": "Jhon", "last_name": "Doe"}
- Update image user [Authentication required]: PUT localhost:3000/users/image/{user_id}
  - "image": form data
- Delete user [Authentication required]: DELETE localhost:3000/users/{user_id}
