package com.AgendaServico.demo.Listeners;

import com.AgendaServico.demo.model.Barbeiro;
import com.AgendaServico.demo.model.Servico;
import jakarta.persistence.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ServicoListener {

    private static final Logger logger = LoggerFactory.getLogger(ServicoListener.class);

    @PostLoad
    public void onLoad(Servico servico) {
        logger.info("Servico carregados: ID {}", servico.getIdServico());
    }

    @PostPersist
    public void onCreate(Servico servico) {
        logger.info("Servico criado: ID {}", servico.getIdServico());
    }

    @PostUpdate
    public void onUpdate(Servico servico) {
        logger.info("Servico atualizado: ID {}", servico.getIdServico());
    }

    @PreRemove
    public void onDelete(Servico servico) {
        logger.warn("Servico removido: ID {}", servico.getIdServico());
    }

}
