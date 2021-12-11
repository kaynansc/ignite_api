<h2 align="center">
  <img src="https://i.imgur.com/oUAKMC5.png"/>
  <br/>
  <br/>
  API de aluguel de carros desenvolvida durante o bootcamp Ignite da Rocketseat.
</h2>

---
<br />

# 👨‍💻 Tecnologias utilizadas:
- Node.js (https://nodejs.org/en/)
- TypeScript (https://www.typescriptlang.org/docs/)
- Express.js (http://expressjs.com/)
- TSyringe (https://www.npmjs.com/package/tsyringe)
- BCrypt (https://www.npmjs.com/package/bcrypt)
- JWT (https://jwt.io/)
- Docker (https://docs.docker.com/)
- TypeORM (https://typeorm.io/#/)
- PostgreSQL (https://www.postgresql.org/)
- Babel (https://babeljs.io/)
- Nodemailer (https://nodemailer.com/about/)
- Jest (https://jestjs.io/)
- SuperTest (https://www.npmjs.com/package/supertest)
- Swagger (https://swagger.io/)
- Amazon AWS (https://aws.amazon.com/)
- Rate Limiter Flexible (https://www.npmjs.com/package/rate-limiter-flexible)
- Redis (https://redis.io/)
- Sentry (https://sentry.io/)


<br />
<br />

# ❗ Necessário para rodar o projeto
<li>Docker e Docker Compose

<br />
<br />

# ✅ Passo a passo para rodar o projeto:

### 1. Clonar o repositório
```
git clone https://github.com/kaynansc/ignite_api
```

### 2. Criar o arquivo .env e ormconfig.json com base nos arquivos de exemplo (.env.example e ormconfig.example.json)

### 3. Levantar os containers (postgres e redis)
```
docker-compose up -d
```

### 4. Rodar as migrations
```
npm run typeorm migration:run
```

### 5. Rodar a aplicação
```
npm run dev
```

<br />
<br />

# 📃 Documentação

- Verifique a documentação do swagger localmente em: http://localhost:3333/api-docs

<br />
<br />

# 📄 License
This project is under MIT license. See the [LICENSE](https://github.com/jhonnydelima/rentx/blob/main/LICENSE) file for more details.