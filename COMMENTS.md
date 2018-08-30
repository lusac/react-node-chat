Primeiros passos:

1) Descobrir como o react se comporta com websockets.
2) Descobrir como o node se comporta com websockets.
3) Aprender o básico de nodejs.

Comecei lendo este post[1] que explicava como desenvolver um chat usando nodejs e websockets. Ele ensinava a usar websockets vanilla e me pareceu bem tranquilo, então fui seguindo com o desenvolvimento.

Após ter o básico de websockets rodando, comecei a mockar os dados e fui me preocupar com a arquitetura do projeto. Ao desenha-la, senti necessidade de usar Redux pra compartilhar estados que a aplicação teria. Segui este caminho, mockando todas as chamadas das actions. Estava fazendo bastante sentido pra mim.

Com a arquitetura pronta, comecei o layout que não demorou muito tempo pra ficar pronto.
Com a finalização do layout, comecei a desenvolver a interação entre o client e o server e fui me aprofundando no websockets. Começou a ficar complexo tratar todos os eventos e senti necessidade de usar alguma lib que abstraísse algumas informação no envio e recebimento dos eventos. Foi ai que migrei para o Socket.io[2].
O maior ganho dele, pra mim, é facilidade pra controlar o envio de mensagens entre o front e o backend.

Feito isso, comecei a perceber que a minha arquitetura não estava boa. O Redux não estava fazendo seu papel corretamente e muitas vezes o socket.io passava por cima dele. Fiz uma busca em projetos semelhantes e todos que usavam Redux com websocket me parecia muita forçação de barra. Decidi que não fazia sentido, para controle do chat, ter os dois, e foi ai que decidi remover o Redux do projeto e deixar que os listeners do Socket.io controlassem o estado da aplicação.

Tendo a estrutura das conversas e canais consolidadas, comecei a me preocupar em criar algumas features importantes e de dar mais carinho ao layout.

Com tudo pronto, foi só subir para o heroku.

Com a aplicação rodando, pensei que seria interessante brincar com service workers e tentar implementar um push notification nas trocas de mensagens. Apanhei um pouco mas no final funcionou bem :P.

[1] https://medium.com/@martin.sikora/node-js-websocket-simple-chat-tutorial-2def3a841b61
[2] https://socket.io/