create database Agenda;

use Agenda;

create table cliente(
id_cliente int auto_increment primary key not null,
nome varchar(100) not null,
telefone varchar(14) not null
);

create table servico(
id_servico int auto_increment primary key not null,
tipo varchar(50),
valor decimal(5,2)
);

create table barbeiro(
id_barbeiro int auto_increment primary key not null,
nome varchar(100) not null,
telefone varchar(14) not null,
email varchar(14) not null,
data_contratacao date not null,
ativo boolean not null, 
comissao decimal(5,2)
);

create table agendamento(
id_agendamento int auto_increment primary key not null,
id_cliente int,
id_servico int,
id_barbeiro int,
data_hora datetime,
stats boolean,
FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente),
FOREIGN KEY (id_barbeiro) REFERENCES barbeiro(id_barbeiro),
FOREIGN KEY (id_servico) REFERENCES servico(id_servico)
)