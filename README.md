# Histórico Clínico Integrado
- Responsável de Infraestrutura: Gabriel Milan (IPLANRIO)
- Administrador: Pedro Marques (DIT @ SMS)
- Responsável pelo Frontend: Victor Assis (IPLANRIO)

## O que é o HCI?
- O HCI tem como objetivo integrar os dados de saúde municipais de diferentes unidades de saúde, seja da atenção primária, hospitalar, etc.
- Existem diferentes tipos de prontuário sendo utilizados nas unidades, o que faz com que existam diferentes fonte, com formatos e dados diferentes.
- Precisamos ler dados destas fontes e integrá-los em um formato consistente, que atenda os profissionais da área de saúde.

### O Sistema
- O HCI possui três componentes:
  - API (desenvolvida em Fast API, Python 3.11);
  - Banco de Dados (PostgreSQL); e
  - Frontend (Next.js 14) 

## Preparação de Ambiente
1. Comece rodando `pnpm i` ba raiz do projeto.
2. Crie um arquivo  `.env.local` na raiz do projeto utilizando como exemplo o arquivo `.env.example`.
  
    Os secrets estão disponíveis nos links abaixo. Peça acesso a um administrador.
      - [reCaptcha](https://www.google.com/u/0/recaptcha/admin)
      - [Google Analytics](https://analytics.google.com/)
      - [Hotjar](https://insights.hotjar.com/)
3. Inicie a aplicação rodando `pnpm run dev`

## Scripts úteis
- `type-check`: Lista erros de typescript em todo o projeto
- `lint:fix`: Lista erros de lint

## Storybook
Este projeto está integrado ao [Storybook](https://storybook.js.org/). Qee é uma ferramenta de criação de componentes isolados que auxilia na documentação e teste dos componentes.

Há 3 scripts relacionados ao Storybook:
- `storybook`: Inicia o storybook localmente
- `build-storybook`: Builda o storybook
- `chromatic`: Publica a build do storybook com a ferramenta [chromatic](https://www.chromatic.com/).

Acesse a versão publicada do Storybook [aqui](https://staging--673621be6b8acfb1cfb34e7f.chromatic.com/). Futuramente e idealmente, devemos passar a publicar o Storybook utilizando as nossa infraestrutura interna.