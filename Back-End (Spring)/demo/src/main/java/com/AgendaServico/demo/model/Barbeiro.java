package com.AgendaServico.demo.model;

import com.AgendaServico.demo.Listeners.BarbeiroListener;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Getter
@Setter
@EntityListeners(BarbeiroListener.class)
public class Barbeiro {

    @Id // referenciando o id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // indica para o banco que o id tem que ser gerado automaticamente
    private Integer idBarbeiro;

    @NotBlank(message = "Nome é obrigatorio") //msg de erro caso nao seja inserido nada no campo
    @Column(nullable = false, length = 100) // indica que o campo nao pode ser nulo (nullable = false), length indica quantidade de caracteres (100)
    private String nome;

    @Column(nullable = false, length = 14)
    private String telefone;

    @Column(nullable = false, length = 100)
    private String email;

    @Column(nullable = false)
    private LocalTime inicioExpediente = LocalTime.of(8, 0);

    @Column(nullable = false)
    private LocalTime fimExpediente = LocalTime.of(20, 0);

    @Column(nullable = false)
    private LocalDate dataContratacao;

    @Column(nullable = false)
    private boolean ativo;

    private double comissao;

    public Barbeiro() {
    }

    public Barbeiro(String nome, String telefone, String email, LocalDate dataContratacao, boolean ativo, double comissao) {
        this.nome = nome;
        this.telefone = telefone;
        this.email = email;
        this.dataContratacao = dataContratacao;
        this.ativo = ativo;
        this.comissao = comissao;
    }

}
