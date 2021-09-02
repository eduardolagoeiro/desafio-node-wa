## API criada para o desafio node wa

### deployado em:

https://desafio-node-wa.herokuapp.com

### rodar via docker
```
docker-compose up
```

### rodar modo desenvolvimento (garanta que tenha um banco mongo local e as variáveis no .env)

```
npm run dev
```

Utilizei express com mongoose para desenvolver as rotas com persistência para o CRUD.

## Contexto
Estamos desenvolvendo uma aplicação para as seguintes situações:
- Laboratório:
  - cadastrar um novo laboratório;
    ```
    curl -X POST \
    https://desafio-node-wa.herokuapp.com/lab \
    -d '{
      "name": "{{NAME}}",
      "address": "{{ADDRESS}}"
    }'
    ```

  - obter uma lista de laboratórios ativos;
    ```
    curl -X GET 'https://desafio-node-wa.herokuapp.com/lab?where%5Bstatus%5D=active'
    ```

  - atualizar um laboratório existente;
    ```
    curl -X PATCH \
      https://desafio-node-wa.herokuapp.com/lab/{{ID}} \
      -d '{
      "name": "{{NAME}}"
    }'
    ```

  - remover logicamente um laboratório ativo.

    A remoção lógica de inatividade é feita pela atualização do campo status com valor inactive    

    ```
    curl -X PATCH \
      https://desafio-node-wa.herokuapp.com/lab/{{ID}} \
      -d '{
      "status": "inactive"
    }'
    ```

- Exames:
  - cadastrar um novo exame;
    ```
    curl -X POST \
      https://desafio-node-wa.herokuapp.com/exam \
      -d '{
      "name": "{{NAME}}",
      "type": "{{TYPE}}"
    }'
    ```

  - obter uma lista de exames ativos;
    ```
    curl -X GET 'https://desafio-node-wa.herokuapp.com/exam?where%5Bstatus%5D=active'
    ```

  - atualizar um exame existente;
    ```
    curl -X PATCH \
    https://desafio-node-wa.herokuapp.com/lab/ID \
    -d '{
      "name": "{{NAME}}"
    }'
    ```
    
  - remover logicamente um exame ativo.

    A remoção lógica de inatividade é feita pela atualização do campo status com valor inactive    

    ```
    curl -X PATCH \
    https://desafio-node-wa.herokuapp.com/lab/ID \
    -d '{
      "status": "inactive"
    }'
    ```
    
- Associação:
  - associar um exame ativo à um laboratório ativo;
    ```
    curl -X PUT https://desafio-node-wa.herokuapp.com/exam/{{EXAM_ID}}/labs/{{LAB_ID}}
    ```
    
  - desassociar um exame ativo de um laboratório ativo;
    ```
    curl -X DELETE https://desafio-node-wa.herokuapp.com/exam/{{EXAM_ID}}/labs/{{LAB_ID}}
    ```
    
  **Importante:**
  - ~~Um exame pode estar associado a mais de um laboratório;~~
  
    Relacionamento muitos para um está feito corretamente

  - ~~O cadastro de um laboratório/exame é considerado ativo e recebe um `id` gerado automaticamente.~~ (feito)

## Funcionalidades extras
- ~~Possibilidade de executar cadastro, atualização e remoção em lote;~~

    Cadastro: Pode passar um array ou um objeto no body do post

    Atualização: temos uma rota com id e sem id, a sem id permite atualização em lote

- ~~Endpoint que faz a busca por nome do exame e retorna todos os laboratórios associados a esse exame~~ 

    Por se tratar de um serviço REST deixei a rota pelo id

    ```
    curl -X GET https://desafio-node-wa.herokuapp.com/exam/{{ID}}/labs
    ```

    Porém como era uma funcionalidade requisitada permito a população dos laboratórios e por uma query pelo nome (retornando potencialmente mais de um exame já que não há regra de unicidade no nome do exame)

    ```
    curl -X GET 'https://desafio-node-wa.herokuapp.com/exam?where%5Bname%5D={{NAME}}&populate=labs' \
    ```

## Diferenciais
- ~~Publicação do ambiente em um serviço cloud de hospedagens~~ (https://desafio-node-wa.herokuapp.com)
- ~~Configurar a aplicação para rodar em um container~~ (dockerizado)
- Documentação da API (pendente)
