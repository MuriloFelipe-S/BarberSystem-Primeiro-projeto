# BarberSystem – Sistema de Gestão Completa para Barbearias

[![Status](https://img.shields.io/badge/status-finalizado-success)]()

Sistema completo de gerenciamento para barbearias, desenvolvido com o objetivo de facilitar a administração de uma barbearia por meio de um sistema de fácil usabilidade.

---

## Visão Geral

Este projeto foi desenvolvido com o objetivo de aplicar na prática os conhecimentos teóricos adquiridos ao longo dos meus estudos, além de servir como base para aprofundar ainda 
mais minhas habilidades em desenvolvimento full-stack com foco em Java, Spring Boot, bancos de dados relacionais e integração com front-end utilizando HTML, CSS e JavaScript puro.  
O sistema simula um ambiente real de gerenciamento para barbearias, integrando autenticação, CRUDs completos e regras de negócio reais.

---

## Funcionalidades

### Clientes
- Cadastro com nome e telefone (formato brasileiro com máscara)
- Listagem de todos os clientes registrados
- Exclusão com confirmação
- Validação de entrada no front-end

### Barbeiros
- Cadastro de barbeiros com nome, telefone, e-mail e data de contratação
- Expediente (horário de início e fim do atendimento)
- Marcação de status ativo/inativo
- Cálculo de comissões (50% do valor de cada serviço)
- Listagem, exclusão e edição de registros

### Serviços
- Cadastro de serviços com descrição e valor
- Listagem de serviços disponíveis
- Exclusão de serviços

### Agendamentos
- Agendamento com seleção de cliente, barbeiro, serviço e data/hora
- Visualização e controle de horários
- Interface simplificada para edição ou exclusão de agendamentos

---

## Tecnologias Utilizadas

### Back-End
- Java 17
- Spring Boot
- Spring Security
- Spring Data JPA
- API RESTful
- MySQL
- H2
- Configuração de CORS

### Front-End
- HTML5
- CSS3
- JavaScript

---

## Estrutura do Projeto

├── 📂 backend
│ ├── 📂 src
│ │ ├── 📂 main
│ │ │ ├── 📂 java
│ │ │ │ └── ... (controllers, services, models, repositories)
│ │ │ └── 📂 resources
│ │ │ ├── application.properties
│ │ │ ├── application-dev.properties
│ │ │ ├── application-prod.properties
│ │ │ └── data.sql
│
├── 📂 frontend
│ ├── 📂 cliente
│ ├── 📂 barbeiro
│ ├── 📂 servico
│ ├── 📂 agendamento
│ ├── 📂 dashboard
│ └── 📂 home

---

## Aprendizados e Aplicações

Durante o desenvolvimento deste projeto, aprofundei e melhorei meus conhecimentos em:

- Criação e consumo de APIs REST com Spring Boot
- Integração entre front-end e back-end com JavaScript puro
- Arquitetura MVC e organização em camadas
- Manipulação de banco de dados com JPA, MySQL e H2
- Implementação de autenticação com Spring Security e JWT
- Validação de dados tanto no front-end quanto no back-end
- Modularização do código e reutilização de componentes

---

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

## Contato
[![LinkedIn](https://img.shields.io/badge/-LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/murilofelipe/)  
[![GitHub](https://img.shields.io/badge/-GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/MuriloFelipe-S)  
[![Gmail](https://img.shields.io/badge/-Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:felipemurilo6@gmail.com)
