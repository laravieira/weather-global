[![Cloudflare](https://github.com/laravieira/weather-global/actions/workflows/deploy.yml/badge.svg)](https://github.com/laravieira/weather-global/actions/workflows/deploy.yml)
[![Build](https://github.com/laravieira/weather-global/actions/workflows/build.yml/badge.svg)](https://github.com/laravieira/weather-global/actions/workflows/build.yml)
[![Test](https://github.com/laravieira/weather-global/actions/workflows/test.yml/badge.svg)](https://github.com/laravieira/weather-global/actions/workflows/test.yml)
[![Eslint](https://github.com/laravieira/weather-global/actions/workflows/eslint.yml/badge.svg)](https://github.com/laravieira/weather-global/actions/workflows/eslint.yml)

# [Weather Global](https://weather-global.laravieira.me)
Previsão do tempo mundial usando a API do Open-Meteo ([weather-global.laravieira.me](https://weather-global.laravieira.me))

![Weather Global screenshots](/.github/assets/Weather%20Global.jpg)

### Como executar lcoalmente
```bash
cp .env.example .env
npm install
npm run dev
```

### Notas técnicas
- [x] [Testes unitátios](/src/services/OpenMeteoService.test.ts) (Garante que a integração com a API do Open-Meteo esteja funcionando corretamente)
- [x] [ESLint](https://eslint.org/) (Linting atual, incluindo práticas atuais impostas, por exemplo, por [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks))
- [x] [hooks customizados](/src/hooks) (Permite criar lógicas específicas para o componente, como manipulação/sincronização do localStorage)
- [x] [App router](/src/app) (Use Next.js App Router para gerenciar rotas, com rotas dinâmicas para processamento de ids e localizações)
- [x] [Debounce na buscas](/src/hooks/useSWRMutationWithDebounce.ts) (hook customizado que estende a funcionalidade padrão do [SWR](https://swr.vercel.app/) para adicionar debounce na busca)
- [x] [Componentes SSR](/src/app/%5Bid%5D/page.tsx) (fetch de dados pelo lado do servidor usando componentes assíncronos)
- [x] [Separação da camada de API](/src/services) (Mantem o código de integração com o backend separado)
- [x] [MUI](https://mui.com/material-ui/all-components/) (Uso de biblioteca completa de componentes)
- [x] [Open-Meteo API](https://open-meteo.com/) (API de busca completa de locais por nome, por id e meteorologia por coordenadas)
- [x] [Github actions](/.github/workflows) (Automatização de build, testes, linting e deploy)
- [x] [Cloudflare Workers](https://developers.cloudflare.com/workers/) (Deploy fora da Vercel, onde Next não é suportado por padrão)
