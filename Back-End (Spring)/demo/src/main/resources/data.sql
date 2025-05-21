CREATE TABLE cliente (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    telefone VARCHAR(14) NOT NULL UNIQUE
);

CREATE TABLE servico (
    id_servico INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(50),
    valor DECIMAL(5,2)
);

CREATE TABLE barbeiro (
    id_barbeiro INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    telefone VARCHAR(14) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    data_contratacao DATE NOT NULL,
    inicioExpediente TIME NOT NULL DEFAULT '08:00',
    fimExpediente TIME NOT NULL DEFAULT '20:00',
    ativo BOOLEAN NOT NULL,
    comissao DECIMAL(5,2)
);

CREATE TABLE agendamento (
    id_agendamento INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT,
    id_servico INT,
    id_barbeiro INT,
    data_hora TIMESTAMP,
    stats BOOLEAN,
    FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente),
    FOREIGN KEY (id_barbeiro) REFERENCES barbeiro(id_barbeiro),
    FOREIGN KEY (id_servico) REFERENCES servico(id_servico)
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    login varchar(20) NOT NULL,
    password varchar(20) NOT NULL,
    role varchar(10) NOT NULL
);
