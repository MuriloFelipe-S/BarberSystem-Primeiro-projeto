package com.AgendaServico.demo.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Getter
@Setter
public class Agendamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "cliente_id", nullable = false)
    private Cliente cliente;

    @ManyToMany
    @JoinTable(
            name = "agendamento_servicos",
            joinColumns = @JoinColumn(name = "agendamento_id"),
            inverseJoinColumns = @JoinColumn(name = "servico_id")
    )
    private Set<Servico> servicos;

    @Column(nullable = false)
    private LocalDateTime dataHoraAgendamento;

    public Agendamento (){

    }

    public Agendamento(Long id, Cliente cliente, Set<Servico> servicos, LocalDateTime dataHoraAgendamento) {
        this.id = id;
        this.cliente = cliente;
        this.servicos = servicos;
        this.dataHoraAgendamento = dataHoraAgendamento;
    }

}
