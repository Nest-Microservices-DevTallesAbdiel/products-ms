<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

### STACK

- Para variables de entorno `npm i dotenv joi`
- Prisma `npm install prisma --save-dev`
- Microservicios `npm i --save @nestjs/microservices`


## Migraciones Prisma
Cada vez que se actualice el schema de nuestra base de datos, es decir,
el modelo de prisma, es necesario hacer la migración en consola con los siguientes comandos:

1. `npx prisma migrate dev --name <algo_relacionado_al_cambio_que_hicimos>`
2. `npx prisma generate`