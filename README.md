# Crud Users
Aplicação feita para estudos básicos do Nestjs com Prisma ORM

## Tecnologias Utilizadas:
- [NestJS](https://nestjs.com/) - Framework backend
- [Prisma](https://www.prisma.io/) - Object Relational Mapping (ORM)
- [Postgresql](https://www.postgresql.org/) - Banco de dados
- [Swagger](https://swagger.io/) - API de Documentação

## Estruturação do projeto:
Esta são é apenas para documentar os comandos que utilizei para facilitar o desenvolvimento do projeto, **não precisam executá-los ao fazer clone da aplicação**.  
O comando ```npx i -g @nestjs/cli new crud_users``` utilizado para criação da estrutura básica do projeto.  
O comando ```npm install -D prisma``` usado para instalação da lib do prisma.  
O comando ```npx prisma init``` usado para criar o schema do prisma, onde é configurada as tabelas do banco de dados.  
O comando ```npx prisma migrate dev --name "init"``` utilizado para criar a primeira migration.  
O comando ```npx nest generate module prisma``` usado para criar o modulo do prisma que é responsável por organizar as chamados do serviço do prisma.  
O comando ```npx nest generate service prisma``` usado para criar o serviço do prisma onde contém a chamadas das funções da biblioteca.  
O comando ```npm install --save @nestjs/swagger swagger-ui-express``` usado para instalar a biblioteca do Swagger para criar a documentação das rotas.  
O comando ```npx nest generate resource``` usado para criar a estrutura do módulo de usuários (aqui é criado os arquivos de dto, interface, user.module, user.service, user.controller) todos já mapeados pelo Swagger através dos decorators.  


## Como executar o projeto:
Faça o clone do projeto.  
Execute o comando ```npm install``` para instalar as dependências.  
Renomear o arquivo de variáveis de ambiente com a string de conexão com as informações do seu banco de dados local: ```DATABASE_URL="postgresql://username:password@localhost:5432/databaseName?schema=public"```  
Execute o comando de criação da migration: ```npx prisma migrate dev```  
Executar o projeto: ```npm run start:dev```.  
Para acessar o Swagger da aplicação acessa a rota: http://localhost:3000/api  


## Referências:
O projeto foi criado com base no artigo [Building a REST API with NestJS and Prisma ORM](https://medium.com/@teten.nugraha/building-a-rest-api-with-nestjs-and-prisma-orm-e52c8e182ae3).  