package com.AgendaServico.demo.Listeners;

import com.AgendaServico.demo.model.Agendamento;
import jakarta.persistence.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class AgendamentoListener {

    private static final Logger logger = LoggerFactory.getLogger(AgendamentoListener.class);

    @PostLoad
    public void onLoad(Agendamento agendamento) {
        logger.info("Agendamentos carregados: ID {}", agendamento.getIdAgendamento());
    }

    @PostPersist
    public void onCreate(Agendamento agendamento) {
        logger.info("Novo agendamento criado: ID {}", agendamento.getIdAgendamento());
    }

    @PostUpdate
    public void onUpdate(Agendamento agendamento) {
        logger.info("Agendamento atualizado: ID {}", agendamento.getIdAgendamento());
    }

    @PreRemove
    public void onDelete(Agendamento agendamento) {
        logger.warn("Agendamento removido: ID {}", agendamento.getIdAgendamento());
    }
}

