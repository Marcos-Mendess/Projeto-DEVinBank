# DEVinBank
Aplicação com endpoints CRUD utilizando express.js e documentação criada pela biblioteca swagger.

Url para acesso a documentação da api -> http://localhost:3333/api-docs/

# Endpoints

## Users

## Get /v1/users/:id
Endpoint para retornar informações sobre determinado usuário, é necessário enviar o parâmetro id via url.

**Parameters**

|          Name | Required |  Type   | Description                                                                                                                                                           |
| -------------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `id` | required | string  | Id de determinado usuário.|| 

**Response body example**
```
{
  "id": 1,
  "name": "Marcos",
  "email:": "marcos123@hotmail.com"
} 
or
{
  "error": "Não possui usuário na lista com esse id"
}
```


## Patch /v1/users/:id
Endpoint para atualizar determinado usuário a partir do id, é necessário enviar o id via parâmetro da requisição e o nome e e-mail do novo usuário em um json, caso algum campo não requisitado seja adicionado no json retornará um erro.

**Parameters**

|          Name | Required |  Type   | Description                                                                                                                                                           |
| -------------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|      `id` | required | string  | Id de determinado usuário.  |
|     `json` | required | string  | É necessário enviar o novo nome e e-mail do usuário no seguinte tipo<br/> Exemplo : {"name": "João","email": "joao@madeira.com"}. 

**Response body example**
```
{
  "message": "Usuário atualizado com sucesso."
}
or
{
  "message": "Os campos a seguir não existem : ..."
}
```

## Post /v1/user
Endpoint para criar usuário, é necessário enviar o nome e e-mail do novo usuário.

**Parameters**

|          Name | Required |  Type   | Description                                                                                                                                                           |
| -------------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `json` | required | string  | É necessário enviar o nome e e-mail do usuário no seguinte tipo<br/> Exemplo : {"name": "João","email": "joao@madeira.com"}. 

**Response body example**
```
{
  "message": "Usuário salvo com sucesso."
}
or
{
  "message": "Não foi possível criar o usuário."
}
```

## Companies

## Post /v1/companies/:id
Endpoint para adicionar informações dos gastos de um determinado usuário via arquivo do tipo xlsx, é necessário que as células da primeira linha do arquivo estejam escritas como: célula A1 -> price, célula B1 -> typesOfExpenses, célula C1 -> date, célula D1 -> name.

|          Name | Required |  Type   | Description                                                                                                                                                           |
| -------------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|      `price` | required | Number  | Preço de determinado gasto.  |
|      `typesOfExpenses` | required | string  | Tipo do gasto.  |
|      `data` | required | Date  | Data do gasto.  |
|      `name` | required | string  | Nome do gasto.  |
|     `xlsx` | required | file  | É necessário enviar o arquivo xlsx com as células A1,B1,C1,D1 como descritas abaixo. 


|          A1 | B1 |  C1   | D1                                                                                                                                                           |
| -------------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     price | typesOfExpenses | date  | name 

