package com.AgendaServico.demo.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Agendamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idAgendamento;

    @ManyToOne
    @JoinColumn(name = "id_cliente")
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "id_servico")
    private Servico servico;

    @ManyToOne
    @JoinColumn(name = "id_barbeiro")
    private Barbeiro barbeiro;

    private LocalDateTime dataHora;

    private Boolean stats;

    public Agendamento() {
    }

    public Agendamento(Cliente cliente, Servico servico, Barbeiro barbeiro, LocalDateTime dataHora, Boolean stats) {
        this.cliente = cliente;
        this.servico = servico;
        this.barbeiro = barbeiro;
        this.dataHora = dataHora;
        this.stats = stats;
    }

}
