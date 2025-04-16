package com.AgendaServico.demo.model;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.Set;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Servico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // indica para o banco que o id tem que ser gerado automaticamente
    private Long id;

    @NotBlank(message = "Nome do servico obrigatorio") //msg de erro caso nao seja inserido nada no campo
    @Size(message = "nome do servico deve ter no maximo 30 caracteres") //msg de caracteres maximo
    @Column(nullable = false, length = 30) // indica que o campo nao pode ser nulo (nullable = false), length indica quantidade de caracteres (100)
    private String tipo;


    @Column(nullable = false)
    private Double valor;

    @ManyToMany(mappedBy = "servicos")
    private Set<Agendamento> agendamentos;

    public Servico() {
    }

    public Servico(Long id, String tipo, Double valor) {
        this.id = id;
        this.tipo = tipo;
        this.valor = valor;
    }

}

