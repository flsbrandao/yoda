
![yoda_star_wars_icon_131348](https://user-images.githubusercontent.com/47752369/117724921-cf024d00-b1ba-11eb-8f10-697fa4bf7c59.png)

# Yoda 💻
Yoda é um projeto de envio de emails com conselhos do mestre Yoda, usando os serviços **SQS e Lambda da AWS**. 📧

## Como funciona? 📜

Através de uma endpoint, o usuário fará um cadastro informando o nome, email e cidade.  Todos os dias, um cronjob executará e enviará os dados do usuário para o SQS. Uma função lambda, irá consumir as filas do SQS e enviar os emails. 

#### 📁 service
Nessa pasta, estão presentes as endpoint's para cadastro e exclusão de usuários. Os dados são persistidos no MongoDB.
Existe um cronjob, agendado para executar todos os dias às 8hrs, que fará a leitura dos usuários cadastrados no banco de dados e enviará as mensagens para as filas do SQS.

#### 📁 yodalambda
Nessa pasta está a função que irá ouvir o SQS e executar sempre que tiver uma nova mensagem na fila.
Após pegar a mensagem, a função irá consumir uma API externa, [Advice Splip](https://api.adviceslip.com/), que gera conselhos aleatórios. Logo depois, enviará esse conselho para outra API, que irá "traduzir" o conselho para o modo [Yoda](https://funtranslations.com/api/yoda) de falar. E por fim, montará o email e realizará o envio para o usuário usando a lib Nodemailer.

##### Exemplo:
> Hello Felipe Brandão.  
Mestre Yoda sends this advice from Dagobah to the shire of São Paulo  
_Short enough, life is,Don't race to the finish._  
**May the force be with you**  

## Tecnologias utilizadas 🚀

- Node.js
- MongoDB
- AWS SQS
- Serverless ([framework](https://www.serverless.com/))
- AWS Lambda
