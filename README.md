# LK Cursos - Website

Este projeto é um site one-page para a LK Cursos, especializada em preparatório para ENEM e concursos.

## Características

- Website responsivo com navegação suave entre seções
- Contador regressivo até a data do ENEM 2025
- Sistema de notificações push mensais com frases motivacionais
- Visual moderno com tema escuro e destaques em verde neon

## Tecnologias Utilizadas

- React
- Styled Components
- Tailwind CSS
- Service Worker para funcionalidade offline e notificações push
- IndexedDB para persistência de dados das notificações
- date-fns para manipulação de datas

## Configuração do Projeto

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/lk-cursos-website.git
cd lk-cursos-website
```

2. Instale as dependências
```bash
npm install
# ou
yarn install
```

3. Inicie o servidor de desenvolvimento
```bash
npm run dev
# ou
yarn dev
```

## Notificações Push

O site implementa um sistema de notificações push que envia uma mensagem motivacional aos usuários uma vez por mês. Aqui está como funciona:

### Geração de Chaves VAPID

Para um ambiente de produção, você precisará gerar chaves VAPID:

1. Instale o pacote web-push:
```bash
npm install -g web-push
```

2. Gere as chaves:
```bash
web-push generate-vapid-keys
```

3. Substitua a chave de aplicativo no arquivo `Notifications.tsx` pela sua chave pública VAPID.

### Lógica de Notificações

- Um job cron é disparado às 9h do dia 1º de cada mês (`0 9 1 * *`)
- Uma verificação é feita para garantir que o usuário não receba mais de uma notificação por mês
- Uma frase aleatória é selecionada do array de frases motivacionais
- Os dados da notificação são armazenados no IndexedDB para rastreamento

## Estrutura do Projeto

```
public/
  index.html
  sw.js         # Service Worker para notificações e cache
  logo.svg      # Logo da LK Cursos
  manifest.json # Manifesto para PWA
src/
  index.tsx     # Ponto de entrada da aplicação
  App.tsx       # Componente principal
  index.css     # Estilos globais
  components/
    Navbar.tsx       # Barra de navegação fixa
    Hero.tsx         # Seção principal com logo e lema
    OwlLogo.tsx      # Componente do logo da coruja
    Sobre.tsx        # Seção "Quem Somos"
    Countdown.tsx    # Contador regressivo para o ENEM
    Notifications.tsx # Gerenciamento de notificações push
```

## Deployment

Para fazer o build do projeto para produção:

```bash
npm run build
# ou
yarn build
```

Os arquivos otimizados estarão na pasta `dist/` pronta para ser implantada em qualquer servidor de hospedagem estática.

## Licença

Este projeto está licenciado sob a licença MIT.