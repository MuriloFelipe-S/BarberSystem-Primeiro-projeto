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
    private Long id;

    @NotBlank(message = "Nome é obrigatorio") //msg de erro caso nao seja inserido nada no campo
    @Size(message = "Nome deve ter no maximo 100 caracteres") //msg de caracteres maximo
    @Column(nullable = false, length = 100) // indica que o campo nao pode ser nulo (nullable = false), length indica quantidade de caracteres (100)
    private String nome;

    @NotBlank(message = "Email é obrigatorio")
    @Size(message = "Email deve ter no maximo 100 caracteres")
    @Column(nullable = false, length = 100)
    private String email;

    @NotBlank(message = "Telefone é obrigatorio")
    @Size(message = "Maximo de 14 caracteres")
    @Column(nullable = false, length = 14)
    private String tell;

    public Cliente(Long id, String nome, String email, String tell) { //construtor padrao
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.tell = tell;
    }

    public Cliente() { // construtor para o JPA
    }
}
