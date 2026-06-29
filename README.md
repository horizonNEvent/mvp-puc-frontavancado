# GameVault — Catálogo de Jogos

MVP da disciplina **Desenvolvimento Front-end Avançado** (PUC-Rio).

GameVault é um catálogo de jogos onde o usuário pode **navegar pelos jogos**, **buscar e filtrar** por gênero, **ver os detalhes** de cada título e **gerenciar o catálogo** com um CRUD completo: **criar, editar (nome, imagem e nota) e excluir** jogos.

> As "requisições ao servidor" são **simuladas** através da leitura de um arquivo JSON local (`src/data/games.json`). As alterações feitas no CRUD ficam salvas no navegador (localStorage), para não se perderem ao recarregar a página.

## Funcionalidades

- **Catálogo** com cards de jogos (imagem, nota e gênero)
- **Busca** por nome e **filtro** por gênero
- **Página de detalhe** com imagem, descrição completa e plataformas
- **CRUD completo** na página "Gerenciar Jogos":
  - **Criar** novo jogo
  - **Editar** nome, **link da imagem**, nota e demais dados
  - **Excluir** (com modal de confirmação)
- **Imagem via URL** (com pré-visualização no formulário e fallback caso a imagem falhe)
- **Persistência** dos dados no navegador (localStorage)
- **Indicadores de carregamento**, mensagens de sucesso/erro e estados vazios
- **Tooltips** explicativas e **Modal** reutilizável
- **Layout responsivo** (desktop, tablet e celular)
- **Página 404** para rotas inexistentes

---

## Tecnologias

- [React 18](https://react.dev/) — biblioteca de interface baseada em componentes
- [React Router 6](https://reactrouter.com/) — navegação entre páginas
- [Vite](https://vitejs.dev/) — ambiente de desenvolvimento e build
- [Node.js](https://nodejs.org/) — ambiente de execução
- CSS puro (com variáveis de tema)

---

## Estrutura do projeto

```
mvp-puc-frontavancado/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx                 # Ponto de entrada (Router + Provider)
    ├── App.jsx                  # Definição das rotas
    ├── index.css                # Estilos globais e tema
    ├── components/              # Componentes reutilizáveis
    │   ├── Header.jsx
    │   ├── GameCard.jsx
    │   ├── Button.jsx
    │   ├── Alert.jsx
    │   ├── SearchBar.jsx
    │   ├── Tooltip.jsx
    │   ├── Loader.jsx
    │   ├── Modal.jsx            # Janela reutilizável (form e confirmação)
    │   ├── GameForm.jsx         # Formulário de criar/editar jogo
    │   └── SplineDice.jsx       # Embed 3D Spline (dados) — página Aleatório
    ├── pages/                   # Páginas da aplicação
    │   ├── Catalog.jsx          # Página 1 - Catálogo
    │   ├── GameDetail.jsx       # Página 2 - Detalhe
    │   ├── Manage.jsx           # Página 3 - Gerenciar Jogos (CRUD)
    │   ├── Random.jsx           # Página 4 - Jogo Aleatório
    │   └── NotFound.jsx         # Página 404
    ├── context/
    │   └── GamesContext.jsx     # Estado global dos jogos + CRUD + persistência
    ├── services/
    │   └── gamesService.js      # Simula as requisições ao servidor
    └── data/
        └── games.json           # Dados iniciais (banco simulado)
```
---

## Instalação e execução

### Pré-requisitos
- [Node.js](https://nodejs.org/) instalado (versão 18 ou superior)

---

### Passo a passo

1. **Clone o repositório**
   ```bash
   git clone https://github.com/horizonNEvent/mvp-puc-frontavancado.git
   cd mvp-puc-frontavancado
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Rode o projeto em modo de desenvolvimento**
   ```bash
   npm run dev
   ```

4. **Abra no navegador** o endereço exibido no terminal (geralmente):
   ```
   http://localhost:5173
   ```

---

### Build de produção (opcional)
```bash
npm run build      # gera a versão otimizada na pasta /dist
npm run preview    # pré-visualiza o build localmente
```

> **Dica:** as alterações do CRUD ficam salvas no localStorage. Para restaurar os jogos originais do `games.json`, limpe o armazenamento do site no navegador (DevTools → Application → Local Storage → remover a chave `gamevault:games:v2`).

---

## Rotas da aplicação

| Rota | Página | Descrição |
|------|--------|-----------|
| `/` | Catálogo | Lista de jogos com busca e filtro |
| `/jogo/:id` | Detalhe | Informações completas de um jogo |
| `/gerenciar` | Gerenciar Jogos | CRUD: criar, editar e excluir jogos |
| `/aleatorio` | Jogo Aleatório | Sorteia um jogo com animação de dados (Spline) |
| `*` | 404 | Página de erro para rotas inexistentes |

---

## Autor

**horizonNEvent** — Projeto desenvolvido para a disciplina de Desenvolvimento Front-end Avançado — PUC-Rio.
