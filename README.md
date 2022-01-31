# DEVinBank
Aplicação com endpoints CRUD utilizando express.js e documentação criada pela biblioteca swagger.

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

## Post /v1/user
Endpoint para criar usuário, é necessário enviar o nome e e-mail do novo usuário.

**Parameters**

|          Name | Required |  Type   | Description                                                                                                                                                           |
| -------------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `json` | required | string  | É necessário enviar o nome e e-mail do usuário no seguinte tipo<br/> Exemplo : {"name": "João","email": "joao@madeira.com"}. 


