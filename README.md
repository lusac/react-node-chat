React Node Chat
==========

Realtime chat desenvolvido com Reactjs, Nodejs e Socket.io.

Features
==========
- [x] Criação de usuário
- [x] Criação de Channel
- [x] Listagem de Channels
- [x] Separação dos Channels que o usuário está participando
- [x] Entrar/Sair de um Channel
- [x] Exibir mensagem quando um usuário entrar/sair do Channel
- [x] Enviar e receber mensagens dentro do Channel
- [x] Exibir histórico do Channel antes de dar Join
- [x] Notificação na listagem de Channel quando receber mensagem em um Channel não ativo
- [x] Push notification com Service Workers (quando usuário não estiver com a aba ativa)
- [ ] Apagar Channel
- [ ] Persistir Channel e Usuários em um database
- [ ] Mostrar usuários do Channel
- [ ] Mostrar usuários online do Channel

Demo
==========

https://react-node-chat-1.herokuapp.com/


Developer
==========

### Static build

`yarn install`


### Server Start

Rodando client e nodejs na mesma task pra simplificar o desenvolvimento.

`yarn start`

Client -> `localhost:3000`
Websocket -> `localhost:3001`

### Test

Para rodar os testes da parte client:

`yarn test:client`

Para rodar os testes da api:

`yarn test:api`

