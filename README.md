<h2 align="center">
  <img src="https://i.imgur.com/oUAKMC5.png"/>
  <br/>
  <br/>
  API de aluguel de carros desenvolvida durante o bootcamp Ignite da Rocketseat.
</h2>

---
## Requisitos

### Cadastro de carro
**RF**
- Deve ser possível cadastrar um novo carro.

**RN**
- [x] Não deve ser possível cadastrar um carro com uma placa já existente.
- [x] O carro deve ser cadastrado, por padrão, como disponível.
- [x] O usuário responsável pelo cadastro deve ser um usuário administrador.

### Listagem de carros
**RF**
- Deve ser possível listar todos os carros disponíveis.
- Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
- Deve ser possível listar todos os carros disponíveis pelo nome da marca.
- Deve ser possível listar todos os carros disponíveis pelo nome do carro.

**RN**
- [x] O usuário não precisa estar logado no sistema.

### Cadastro de especificação de carro
**RF**
- Deve ser possível cadastrar uma especificação para um carro.

**RN**
- [x] Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
- [x] Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
- [x] O usuário responsável pelo cadastro deve ser um usuário administrador.

### Cadastro de imagens do carro
**RF**
- Deve ser possível cadastrar a imagem do carro.

**RNF**
- Utilizar o multer para upload dos arquivos.

**RN**
- [x] O usuário pode cadastrar mais de uma imagem para o mesmo carro.
- [x] O usuário responsável pelo cadastro deve ser um usuário administrador.

### Aluguel de carro
**RF**
- Deve ser possível cadastrar um aluguel.

**RN**
- [x] O aluguel deve ter duração mínima de 24 horas.
- [x] Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
- [x] Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
- [x] O usuário deve estar logado na aplicação.
- [x] Ao realizar um aluguel, o status do carro deverá ser alterado para indisponível.

### Devolução de carro

**RF**
- Deve ser possível realizar a devolução de um carro.

**RN**
- [x] Se o carro for devolvido com menos de 24 horas, deverá ser cobrado diária completa.
- [x] Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.
- [x] Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel.
- [x] Ao realizar a devolução, deverá ser calculado o total do aluguel.
- [x] Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcional aos dias de atraso.
- [x] Caso haja multa, deverá ser somado ao total do aluguel.
- [x] O usuário deve estar logado na aplicação.

### Listagem de alugueis para usuário

**RF**
- Deve ser possível realizar a busca de todos os alugueis para o usuário.

**RN**
- [x] O usuário deve estar logado na aplicação.

### Recuperar senha

**RF**
- Deve ser possível recuperar a senha informando o e-mail.
- O usuário deve receber um e-mail com o passo a passo para a recuperação da senha.
- O usuário deve conseguir inserir uma nova senha.

**RN**
- [x] O usuário precisa informar uma nova senha.
- [x] O link enviado para a recuperação deve expirar em 3 horas.

---
### Tecnologias utilizadas:
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

---
### How to run this project:

### 1. Clone this repository
```
$ git clone https://github.com/kaynansc/ignite_api
```

### 2. Running the application on your terminal
```
# Up containers
$ docker-compose up -d
#start the server
$ yarn dev
```

---
### Swagger Documentation

- Check the swagger documentation locally in: http://localhost:3333/api-docs

---
### 📄 License
This project is under MIT license. See the [LICENSE](https://github.com/jhonnydelima/rentx/blob/main/LICENSE) file for more details.