# Edublog — Front-end

Aplicação web desenvolvida em React para publicação e leitura de conteúdos sobre tecnologia e programação. O sistema consome uma API REST e fornece funcionalidades para docentes e estudantes.

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

---

## Tecnologias utilizadas

- React + TypeScript
- Vite
- React Router
- Tailwind CSS + shadcn/ui
- React Markdown
- Context API
- Docker
- GitHub Actions

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

## CI/CD

Pipeline automatizada com GitHub Actions:

- Lint
- Typecheck
- Build
- Docker

---

## Relato de experiências e desafios

Durante o desenvolvimento alguns desafios foram enfrentados:

- Implementação da autenticação via JWT
- Integração entre React e API REST
- Responsividade da interface
- Implementação do editor Markdown
- Organização da arquitetura utilizando Context API e hooks

---

## Licença

Projeto acadêmico para fins educacionais.
