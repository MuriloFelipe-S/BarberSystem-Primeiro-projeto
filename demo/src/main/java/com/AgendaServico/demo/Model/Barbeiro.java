package com.AgendaServico.demo.Model;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;


@Entity
@Getter
@Setter
public class Barbeiro {

    @Id // referenciando o id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // indica para o banco que o id tem que ser gerado automaticamente
    private Long id;

    @NotBlank(message = "Nome é obrigatorio") //msg de erro caso nao seja inserido nada no campo
    @Size(message = "Nome deve ter no maximo 100 caracteres") //msg de caracteres maximo
    @Column(nullable = false, length = 100) // indica que o campo nao pode ser nulo (nullable = false), length indica quantidade de caracteres (100)
    private String nome;

    @NotBlank(message = "Salario é obrigatorio mesmo que seja zero")
    @Column(nullable = false)
    @Digits(integer = 5, fraction = 2) // define tamanho do salario (5 digitos total 2 após a virgula)
    private BigDecimal salario;

    public Barbeiro() {
    }

    public Barbeiro(Long id, String nome, BigDecimal salario) {
        this.id = id;
        this.nome = nome;
        this.salario = salario;
    }

}
