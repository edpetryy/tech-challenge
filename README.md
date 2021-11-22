Node 14 + Express + MonoDB + Docker + memory-cache

# Instalação

## Requisitos para instalação

    git
    node 14
    npm 6
    mongo

    docker
    docker-compose

## Configuração

Renomeie o arquivo `.env.example` para `.env`, ajuste os as configurações de acesso ao banco de
dados.

Rodar o comando

    npm install

Parar rodar a aplicação, executar `npm run dev`

## Executando no Docker

Rodar o comando

    docker-compose up

# Rotas

- POST:user - criação de um usuário; parâmetros via body: `name, login, password`
- POST:login - login na aplicação; parâmetros via body: `login, password`; retorna `user, token`
- GET:user/favorite - retorna a lista de favoritos; header com authorization: `Bearer token`;
  retorna `favorites`
- PATCH:user/favorite - retorna a lista de favoritos; header com authorization: `Bearer token` e
  body com: `video_id` ; retorna `favorites`
- GET:videos - retorna a lista de videos; parâmetros via query: `search, page, type, year`, com
  defaults: `search = "batman", type = "movie", page = "1"` ; retorna `video`
- GET:videos/:id - retorna o video com o id; retorna objeto video
