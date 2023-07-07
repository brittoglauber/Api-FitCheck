# FitCheck

GymPass style app.

A FitCheck API é uma aplicação que permite o gerenciamento de check-ins em academias. Ela foi desenvolvida com foco na orientação a testes, utilizando Node.js 18 e Docker como requisitos para execução. A arquitetura foi projetada com técnicas para evitar acoplamentos indesejados.

## Requisitos
Certifique-se de atender aos seguintes requisitos antes de executar a FitCheck API:

Node.js 18 (ou versão posterior) instalado.··
Docker instalado.··

## Instalação e Execução

▫ Para instalar e executar a FitCheck API, siga as etapas abaixo:

▫ git clone https://github.com/seu-usuario/fitcheck-api.git

▫ cd fitcheck-api

▫ npm install

▫ docker-compose up

### A api estará disponível em http://localhost:3333 

## Scripts de inicialização

    "dev": "tsx watch src/server.ts", 
    "build": "tsup src --out-dir build",
    "start": "node build/server.js",
    "test": "vitest run --dir src/use-cases",
    "test:create-prisma-environment": "npm link ./prisma/vitest-environment-prisma",
    "test:install-prisma-environment": "npm link vitest-environment-prisma",
    "test:watch": "vitest --dir src/use-cases",
    "pretest:e2e": "run-s test:create-prisma-environment test:install-prisma-environment",
    "test:e2e": "vitest run --dir src/http",
    "test:e2e:watch": "vitest --dir src/http",
    "test:coverage": "vitest run --coverage",
    "test:ui": "vitest --ui"

dev - Inicia o servidor em ambiente de desenvolvimento

build - Faz o build para rodar em produção, vai criar uma pasta chamada build na raiz do projeto

start - Inicia o servidor em ambiente de produção, esta opção não vai rodar o projeto com typescript, portanto ela é mais performática

test - Roda todos os teste unitários de casos de uso

test:e2e:watch - Roda testes end-to-end 

# Endpoints
### A FitCheck API oferece os seguintes endpoints:

• POST /users: Cria um novo usuário.

• POST /sessions: Autentica um usuário, retorna um jwt.

• PATCH /token/refresh: Cria um refresh token.

• GET /me Visualiza perfil do usário.

• GET /gym/search Localiza uma academia.

• GET /gym/nearby Localiza academias próximas, em que ele consegue fazer check-in.

• POST /gyms Cria uma academia.

• GET /check-ins/history Retorna histórico de checkins.

• GET /check-ins/metrics Retorna quantidade de checkins feitos pelo usuário.

• POST /gyms/:gymId/check-ins Cria uma checkin.

• PATCH /check-ins/:checkInId/validate Valida um checkin.

# Arquitetura
### A arquitetura da FitCheck API foi projetada com o objetivo de evitar acoplamentos indesejados e promover a manutenibilidade. Algumas técnicas e conceitos aplicados incluem:

• Separação em camadas: A aplicação é dividida em camadas lógicas, como a camada de roteamento, a camada de controle e a camada de acesso a dados. Isso permite uma melhor organização e facilita a manutenção.

• Injeção de dependência: As dependências são injetadas nas classes e funções, permitindo maior flexibilidade e facilitando a substituição de implementações.

• Testabilidade: A aplicação foi desenvolvida com foco em testes, garantindo a cobertura adequada por meio de testes unitários, de integração e end-to-end.

# Contribuição
Se você deseja contribuir com a FitCheck API, fique à vontade para abrir issues ou enviar pull requests para o repositório do projeto. Sua contribuição é muito bem-vinda!



