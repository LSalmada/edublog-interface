# Edublog — Front-end

Aplicação web desenvolvida em React para publicação de posts. Desenvolvida como parte do Tech Challenge —
Fase 3 da pós-graduação em Arquitetura de Software.

## Capturas de tela

### Home

<img width="1505" height="795" alt="image" src="https://github.com/user-attachments/assets/708b33b7-0ef1-410c-9a2d-5bdf6ee6c664" />

### Admin

<img width="1508" height="795" alt="image" src="https://github.com/user-attachments/assets/e0459b35-cf57-4a7d-94fa-09a8f956fbcb" />

### Form

<img width="1508" height="789" alt="image" src="https://github.com/user-attachments/assets/ce0fdd53-a3e0-47d7-a17a-fcf62dfb5158" />

---

## Funcionalidades

### Usuários públicos

- Visualizar lista de posts
- Buscar posts por palavras-chave
- Ler conteúdo completo dos artigos

### Usuários autenticados

- Login de docentes
- Criar postagens
- Editar postagens
- Excluir postagens
- Gerenciar posts em painel administrativo

### Credenciais de acesso para testes

**Email:** `teacher@edublog.dev` **Senha:** `teacher123`

---

## Tecnologias utilizadas

- React + TypeScript
- Vite
- React Router
- Tailwind CSS + shadcn/ui
- React Markdown
- Context API
- Docker + Nginx
- GitHub Actions
- Fly.io (hospedagem)

---

## Arquitetura da aplicação

A aplicação segue o modelo **SPA (Single Page Application)** utilizando React para a interface e uma API externa para persistência dos dados.

Fluxo:

```txt
React Pages
      ↓
Hooks
      ↓
Services/API
      ↓
REST API
```

Estrutura principal:

```txt
src/
├── components/
├── contexts/
├── hooks/
├── pages/
├── routes/
├── services/
└── types/
```

---

## Instalação

Clone o projeto:

```bash
git clone <repositorio>
cd edublog-interface
```

Instale dependências:

```bash
npm install
```

Configure variáveis:

```env
VITE_API_BASE_URL=https://edublog-api.fly.dev
```

Execute:

```bash
npm run dev
```

Aplicação disponível em:

```txt
http://localhost:5173
```

---

## Docker

Build:

```bash
docker build -t edublog-interface .
```

Executar:

```bash
docker run -p 8080:80 edublog-interface
```

---

## Rotas

| Rota              | Acesso  |
| ----------------- | ------- |
| `/`               | Público |
| `/post/:id`       | Público |
| `/login`          | Público |
| `/admin`          | Privado |
| `/create-post`    | Privado |
| `/admin/post/:id` | Privado |

---

## Integração com API

Endpoints utilizados:

- `POST /auth/login`
- `GET /posts`
- `POST /posts`
- `PUT /posts/:id`
- `DELETE /posts/:id`

---

## Guia de uso

### Visitante

1. Acesse a página inicial
2. Busque artigos
3. Leia o conteúdo dos posts

### Docente

1. Realize login
2. Acesse o painel administrativo
3. Crie, edite ou remova postagens

---

## Deploy (Fly.io)

A aplicação é hospedada no [Fly.io](https://fly.io) em
`https://edublog-interface.fly.dev` e usa a mesma região do back-end (`gru` —
São Paulo). A configuração mora no `fly.toml` da raiz e a imagem é construída
no builder remoto do Fly a partir do `Dockerfile`.

### Setup inicial (uma única vez)

1. Instale e autentique-se no [flyctl](https://fly.io/docs/flyctl/install/):

   ```bash
   fly auth login
   ```

2. Crie o app no Fly.io (o nome deve bater com `app` no `fly.toml`):

   ```bash
   fly apps create edublog-interface
   ```

3. Gere um token de deploy e cadastre-o como secret no GitHub:

   ```bash
   fly tokens create deploy -x 8760h
   ```

   No repositório → **Settings → Secrets and variables → Actions**:
   - Secret `FLY_API_TOKEN` = valor retornado pelo comando acima.
   - (Opcional) Variable `VITE_API_BASE_URL` se quiser sobrescrever o default
     `https://edublog-api.fly.dev`.

### Deploy manual

```bash
fly deploy
```

O `flyctl` lê o `fly.toml`, envia o build pro builder remoto, gera a imagem e
publica uma nova versão.

### Deploy automático

Qualquer push na branch `main` que passe no pipeline do CI dispara o deploy.

---

## CI/CD

Pipeline automatizada com GitHub Actions (`.github/workflows/ci.yml`):

- **Em PR para `main`** — apenas valida o código:
  - Lint
  - Typecheck
  - Build
- **Em push para `main`** — além das validações, faz o deploy no Fly.io
  usando `flyctl deploy --remote-only`.

---

## Relato de experiências e desafios

Durante o desenvolvimento alguns desafios foram enfrentados:

- Implementação da autenticação via JWT
- Ajuste no backend
- Problema de CORS, a acão de delete não estava sendo permitida
- Integração entre React e API REST
- Responsividade da interface
- Implementação do editor Markdown
- Organização da arquitetura utilizando Context API e hooks

---

## Licença

Projeto acadêmico para fins educacionais.
