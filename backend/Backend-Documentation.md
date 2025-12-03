## **Base URL**

`/api`

---

# **ROUTES & ENDPOINTS**

---

# **1. USER ROUTES (`/usuarios`)**

## **GET /usuarios/**

Retorna todos os usuários cadastrados.

**Response 200**

`[   {     "id_usuario": 1,     "nome": "João",     "email": "joao@mail.com",     "criado_em": "2024-02-20T..."   } ]`

---

## **POST /usuarios/**

Cria um novo usuário.

**Body**

`{   "nome": "João",   "email": "joao@mail.com",   "senha": "123456" }`

**Responses**

- **201** – Usuário criado
    
- **400** – Email já cadastrado
    

---

## **PUT /usuarios/:id**

Atualiza dados do usuário.

**Body**

`{   "nome": "Novo Nome",   "email": "novo@mail.com",   "senha": "opcional" }`

---

##  **DELETE /usuarios/:id**

Endpoint não utilizado pelo sistema (mantido por compatibilidade).

---

## **POST /usuarios/delete-with-password**

**Requer Token JWT**  
Deleta o usuário e seu jogador (CASCADE).

**Body**

`{   "password": "senhaDoUsuario" }`

**Response**

`{   "message": "Usuário e jogador deletados com sucesso" }`

---

## **POST /usuarios/login**

Autenticação de usuário.

**Body**

`{   "email": "email@mail.com",   "senha": "123456" }`

**Response**

`{   "user": {...},   "token": "<jwt token>" }`

---

## **GET /usuarios/me**

Requer Token  
Retorna dados do usuário logado.

**Response**

`{   "id_usuario": 1,   "nome": "João",   "email": "joao@mail.com" }`

---

# **2. PASSWORD RESET ROUTES (`/auth`)**

## **POST /auth/forgot-password**

Gera e envia código de redefinição de senha por email.

**Body**

`{ "email": "email@mail.com" }`

---

## **POST /auth/verify-code**

Verifica se o código enviado está correto.

**Body**

`{   "email": "email@mail.com",   "token": "123456" }`

---

## **POST /auth/reset-password**

Redefine senha através do código.

**Body**

`{   "email": "email@mail.com",   "token": "123456",   "newPassword": "novaSenha" }`

---

# **3. PLAYER ROUTES (`/jogador`)**

## **POST /jogador/cadastrar**

Sincroniza jogador Clash Royale e salva no banco.

**Body**

`{   "idUsuario": 1,   "clashId": "88P2PC90" }`

---

## **GET /jogador/me**

 Requer Token  
Retorna dados atualizados do jogador pela API oficial.

**Response**

`{   "id_usuario": 1,   "clash_id": "88P2PC90",   "nome": "Player",   "nivel": 42,   "trofeus": 5100,   "wins": 2000,   "losses": 1900,   "deck": [     { "name": "Knight", "elixir": 3, "icon": "url..." }   ] }`

---

# **4. EXTERNAL API ROUTES (`/api`)**

## **GET /api/player/:tag**

Busca informações diretamente da API do Clash Royale.

---

# **DATABASE: ENTITIES & RELATIONSHIPS**

---

# **Usuario**

| Campo      | Tipo     | Descrição     |
| ---------- | -------- | ------------- |
| id_usuario | Int PK   | Identificador |
| nome       | String   | Nome          |
| email      | String   | Único         |
| senha      | String   | Hash bcrypt   |
| criado_em  | DateTime |               |

### **Relações**

- 1:1 → Jogador
    
- 1:N → ResetToken
    

---

# **Jogador**

| Campo      | Tipo           |
| ---------- | -------------- |
| id_jogador | Int            |
| clash_id   | String (único) |
| nome       | String         |
| nivel      | Int            |
| trofeus    | Int            |
| pais       | String?        |
| id_usuario | Int (1:1)      |
| id_cla     | Int?           |

### Relações

- 1:1 → Usuario
    
- N:1 → Cla
    
- 1:N → Deck
    
- 1:N → Log_Acao
    
- 1:N → Partida (jogador1 / jogador2)
    
- N:M → Torneio (via Torneio_Jogador)
    
- 1:1 → Estatistica_Jogador
    

---

# **ResetToken**

| Campo     | Tipo     |
| --------- | -------- |
| id        | Int      |
| token     | String   |
| expiresAt | DateTime |
| usuarioId | Int      |

### Relação

- N:1 → Usuario (CASCADE)
    

---

# **Cla**

| Campo     | Tipo   |
| --------- | ------ |
| id_cla    | Int    |
| nome      | String |
| descricao | String |
| nivel     | Int    |
| regiao    | String |

### Relação

- 1:N → Jogador
    

---

# **Carta**

| Campo        | Tipo   |
| ------------ | ------ |
| id_carta     | Int    |
| nome         | String |
| tipo         | String |
| raridade     | String |
| elixir       | Int    |
| nivel_maximo | Int    |
| tipoCartaId  | Int?   |

### Relações

- N:M → Deck (via Deck_Carta)
    
- N:1 → Tipo_Carta
    

---

# **Deck**

| Campo      | Tipo   |
| ---------- | ------ |
| id_deck    | Int    |
| nome       | String |
| id_jogador | Int    |

### Relações

- N:1 → Jogador
    
- N:M → Carta (via Deck_Carta)
    

---

# **Deck_Carta (pivot)**

Chave composta:

`(id_deck, id_carta)`

| Campo       | Tipo |
| ----------- | ---- |
| id_deck     | Int  |
| id_carta    | Int  |
| nivel_carta | Int  |

---

# **Partida**

| Campo       | Tipo     |
| ----------- | -------- |
| id_partida  | Int      |
| data_hora   | DateTime |
| resultado   | String   |
| duracao     | Int      |
| id_jogador1 | Int      |
| id_jogador2 | Int      |
| id_arena    | Int      |

### Relações

- N:1 → Jogador (Jogador1)
    
- N:1 → Jogador (Jogador2)
    
- N:1 → Arena
    

---

# **Arena**

| Campo              | Tipo   |
| ------------------ | ------ |
| id_arena           | Int    |
| nome               | String |
| nivel_minimo       | Int    |
| trofeus_requeridos | Int    |

---

# **Torneio & Torneio_Jogador**

## **Torneio**

| Campo       | Tipo     |
| ----------- | -------- |
| id_torneio  | Int      |
| nome        | String   |
| premiacao   | String   |
| data_inicio | DateTime |
| data_fim    | DateTime |

---

## **Torneio_Jogador** _(Pivot)_

| Campo      | Tipo |
| ---------- | ---- |
| id_torneio | Int  |
| id_jogador | Int  |
| colocacao  | Int  |
| pontuacao  | Int  |

### Relação

- N:M Jogador ↔ Torneio
    

---

# **Estatistica_Jogador**

| Campo          | Tipo        |
| -------------- | ----------- |
| id_estatistica | Int         |
| id_jogador     | Int (único) |
| vitorias       | Int         |
| derrotas       | Int         |
| empates        | Int         |
| taxa_vitoria   | Float       |

---

# **Log_Acao**

| Campo      | Tipo     |
| ---------- | -------- |
| id_log     | Int      |
| id_jogador | Int      |
| acao       | String   |
| data_hora  | DateTime |
| detalhes   | String   |

---

# **Mapa Geral das Relações**

`Usuario 1—1 Jogador Usuario 1—N ResetToken Jogador N—1 Cla Jogador 1—1 Estatistica_Jogador Jogador 1—N Deck Jogador 1—N Log_Acao Jogador 1—N Partida (Jogador1 e Jogador2) Jogador N—M Torneio (Torneio_Jogador) Deck N—M Carta (Deck_Carta) Carta N—1 Tipo_Carta Partida N—1 Arena`