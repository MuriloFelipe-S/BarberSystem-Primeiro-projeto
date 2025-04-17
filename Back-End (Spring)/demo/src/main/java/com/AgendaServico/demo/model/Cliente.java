package com.AgendaServico.demo.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;


@Entity //representa uma tabela
@Getter // lombok getter
@Setter // lombok setter
public class Cliente {

    @Id // referenciando id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // criando id autoincrementado
    private Integer idCliente;

    @NotBlank(message = "Nome é obrigatorio") //msg de erro caso nao seja inserido nada no campo
    @Column(nullable = false, length = 100) // indica que o campo nao pode ser nulo (nullable = false), length indica quantidade de caracteres (100)
    private String nome;

    @NotBlank(message = "Telefone é obrigatorio")
    @Column(nullable = false, length = 14)
    private String tell;

    public Cliente(String nome, String tell) { //construtor padrao
        this.nome = nome;
        this.tell = tell;
    }

    public Cliente() { // construtor para o JPA
    }
}
