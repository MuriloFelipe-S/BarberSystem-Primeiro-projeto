# Projeto simples de um sistema de gestão para barbearias 

### Funcionalidades
- API RESTful (GET, POST, PUT, DELETE)
- Interface Web

### Tecnologias e feramentas Utilizadas

<img src="https://skillicons.dev/icons?i=java,spring,mysql"/>
<img src="https://skillicons.dev/icons?i=html,css,js"/>

## 📁 Estrutura do Projeto
 ```
📦 BarberSystem
├── 📂 backend
│   └── 📂 src
│       └── 📂 main
│           ├── 📂 java
│           │   └── ... (controllers, services, models, repositories)
│           └── 📂 resources
│               ├── application.properties
│               ├── application-dev.properties
│               ├── application-prod.properties
│               └── data.sql
│
├── 📂 frontend
│   ├── 📂 cliente
│   ├── 📂 barbeiro
│   ├── 📂 servico
│   ├── 📂 agendamento
│   ├── 📂 dashboard
│   ├── 📂 login
│   └── 📂 home
 ```


## Aprendizados e Aplicações

Durante o desenvolvimento deste projeto, aprofundei e melhorei meus conhecimentos em:

- Criação e consumo de APIs com Spring Boot
- Integração entre front-end e back-end com JavaScript puro
- Arquitetura MVC e organização em camadas
- Manipulação de banco de dados com JPA, MySQL e H2
- Implementação de autenticação com Spring Security e JWT
- Validação de dados tanto no front-end quanto no back-end


## Como Executar o Projeto

### Pré-requisitos

IDE’s e Tecnologias:
- Java 17
- MySQL 8+
- Maven
- Navegador atualizado para compatibilidade com a interface
- IntelliJ (recomendado por ser fácil de configurar para a execução do projeto)
- VS Code (fácil usabilidade)

### Passos

1. Clone o repositório:
   ```bash
   git clone https://github.com/MuriloFelipe-S/Agenda-Barbearia

2. Acesse a pasta em que você clonou o repositório:

    Exemplo via terminal: cd Agenda-Barbearia

3. Abra a pasta backend na IDE que estiver utilizando (recomendado: IntelliJ).

4. Crie um banco de dados no MySQL com o nome agenda (O script SQL está disponível no arquivo data.sql, localizado dentro da pasta resources.)

   Importante: Caso utilize o MySQL, altere o perfil ativo no arquivo application.properties.
   Originalmente estará configurado assim: "spring.profiles.active=dev"
   Altere para: "spring.profiles.active=prod"

   Em seguida, no arquivo application-prod.properties (configurado para uso com MySQL), configure os dados de acesso ao banco:

   "spring.datasource.url=jdbc:mysql://localhost:3306/agenda?useSSL=false&serverTimezone=UTC
    spring.datasource.username=root
    spring.datasource.password=suasenha"

5. Execute o projeto pela classe DemoApplication.java.
    Obs: Certifique-se de que todas as dependências Maven foram baixadas corretamente.

6. Abra a pasta frontend no VS Code e inicie a aplicação a partir do arquivo HTML da pasta login.
    obs: Recomenda-se o uso da extensão Live Server para facilitar a execução.

7. Preencha o formulário de registro. Após isso, clique no botão Entrar e, em seguida, preencha o formulário de login com o usuário e senha cadastrados.

8. Pronto! Após esses passos você estará dentro do sistema e poderá testar todas as funcionalidades.


### Contribuição
Este projeto foi desenvolvido como um estudo individual, mas contribuições são sempre bem-vindas para melhorias ou sugestões de novas funcionalidades.

## Social

[![LINKEDIN](https://go-skill-icons.vercel.app/api/icons?i=linkedin)](https://www.linkedin.com/in/murilofelipe/)
[![GMAIL](https://skillicons.dev/icons?i=gmail)](mailto:felipemurilo6@gmail.com)
[![GitHub](https://skillicons.dev/icons?i=github)](https://github.com/MuriloFelipe-S)
