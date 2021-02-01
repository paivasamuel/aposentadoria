# Instalação

Após clonar o projeto ir para o terminal seguir os passos;

docker build -t aposentadoria:dev --build-arg configuration="" .

Para subir o projeto

docker run -p 4040:80 aposentadoria:dev

# Sobre

Aplicação realizada para cadastrar, movimentar um beneficio, podendo anexar arquivos e já visualizar na mesma página, conforme solicitado. 

# Tecnologias

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.1.1.
