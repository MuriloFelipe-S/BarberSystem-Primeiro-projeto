package com.AgendaServico.demo.model;

import com.AgendaServico.demo.Listeners.AgendamentoListener;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.EntityListeners;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@EntityListeners({AgendamentoListener.class})
public class Agendamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idAgendamento;

    @ManyToOne
    @JoinColumn(name = "id_cliente")
    private Cliente cliente;

    @ManyToMany
    @JoinTable(
            name = "agendamento_servico",
            joinColumns = @JoinColumn(name = "agendamento_id"),
            inverseJoinColumns = @JoinColumn(name = "servico_id")
    )
    private List<Servico> servicos;

    @ManyToOne
    @JoinColumn(name = "id_barbeiro")
    private Barbeiro barbeiro;

    private LocalDateTime dataHora;

    private Boolean stats;

    public Agendamento() {}

    public Agendamento(Cliente cliente, List<Servico> servicos, Barbeiro barbeiro, LocalDateTime dataHora, Boolean stats) {
        this.cliente = cliente;
        this.servicos = servicos;
        this.barbeiro = barbeiro;
        this.dataHora = dataHora;
        this.stats = stats;
    }

}
