# AngularBase

Esse projeto foi gerado com [Angular CLI](https://github.com/angular/angular-cli) versão 16.2.6.

Com objetivo de reduzir o tempo de criação e configuração de projetos angular, criei essa base que por padrão já integra algumas bibliotecas que são utilizadas na maioria dos projetos.

`Importe os módulos do Material dentro de shared > material >  material.module invés de app.module`

## Angular base service

Implementei o angular base service nesse projeto, você poderá conferir dentro da pasta `services` > `base.service`. Este padrão cria os principais métodos para integração com uma `API REST` que podem ser herdados por serviços específicos.

Deixei como exemplo o `user.service`

    export class UserService extends BaseService<User> {

        constructor(override http: HttpClient) { 
            super(http, "users/");
        }
    }

Essas simples linhas de código implementam por debaixo dos panos os métodos: 
- Get
- Post
- Delete
- Update

Você pode criar seus proprios métodos específicos dentro do seu serviço ou então criar métodos que serão utilizados por todos os outros serviços no próprio Base Service


## Material Module

O projeto já utiliza o Material porém para utilização de alguns componentes você deve importar manualmente.

Uma forma de organizar melhor o projeto é reunir todas as importações do Material em um único lugar, por isso criei um módulo específico para isso no `shared` > `material` > `material.module`

## Json server

Para aplicações que ainda não possuem um backend pronto, é possível utilizar o `json server` para simular requisições, esse banco implementa todos os métodos HTTP e utiliza como base o arquivo `db.json` dentro do projeto, onde você deve criar suas entidades.

para instalar essa biblioteca você deve utilizar:

    npm install -g json-server

Para executar o banco utilize dentro do projeto:

    npm run backend 


Veja a documentação do [json server](https://www.npmjs.com/package/json-server)

## Executar o projeto


Instale as dependências com:

    npm run install


após isso utilize:

    ng serve

## Build

Execute `ng build` parar gerar o build do projeto. os arquivos de build serão inseridos dentro de `dist/`.