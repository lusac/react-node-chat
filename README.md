1) create-react-app
2) Node Websocket: https://medium.com/@martin.sikora/node-js-websocket-simple-chat-tutorial-2def3a841b61
3) npm start rodando client + server só pra simplificar o processo.
4) redux -> pra compartilhar estados dos chats selecionados.
5) mudança de planos -> socket.io
    - maior facilidade pra controlar a conexão tanto do no front quanto no back end
6) mudando modelagem do Redux. Estava com uma arquitetura, mas o WS requeriu outra.
7) removendo completamente o redux.
    -Mudando arquitetura. Remoção do Redux, pois o chat foi pra um caminho onde ele não seria necessário. Como comecei com tudo mockado, arquitetei pensando em requests, oq nãoa contece no WS
8) Estrutura OK.
9) Layout + refactor grid e componentes