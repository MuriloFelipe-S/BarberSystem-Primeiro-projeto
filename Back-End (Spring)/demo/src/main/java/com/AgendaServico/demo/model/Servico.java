package com.AgendaServico.demo.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
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
    private Integer idServico;

    @NotBlank(message = "Nome do servico obrigatorio") //msg de erro caso nao seja inserido nada no campo
    @Column(nullable = false, length = 30) // indica que o campo nao pode ser nulo (nullable = false), length indica quantidade de caracteres (100)
    private String tipo;


    @Column(nullable = false)
    private Double valor;

    @OneToMany(mappedBy = "servico")
    @JsonIgnore
    private Set<Agendamento> agendamentos;

    public Servico() {
    }

    public Servico(String tipo, Double valor) {
        this.tipo = tipo;
        this.valor = valor;
    }

}

