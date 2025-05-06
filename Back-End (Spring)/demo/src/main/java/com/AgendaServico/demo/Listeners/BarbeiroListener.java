package com.AgendaServico.demo.Listeners;

import com.AgendaServico.demo.model.Barbeiro;
import jakarta.persistence.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class BarbeiroListener {

    private static final Logger logger = LoggerFactory.getLogger(BarbeiroListener.class);

    @PostLoad
    public void onLoad(Barbeiro barbeiro) {
        logger.info("Barbeiros carregados: ID {}", barbeiro.getIdBarbeiro());
    }

    @PostPersist
    public void onCreate(Barbeiro barbeiro) {
        logger.info("Novo barbeiro criado: ID {}", barbeiro.getIdBarbeiro());
    }

    @PostUpdate
    public void onUpdate(Barbeiro barbeiro) {
        logger.info("Barbeiro atualizado: ID {}", barbeiro.getIdBarbeiro());
    }

    @PreRemove
    public void onDelete(Barbeiro barbeiro) {
        logger.warn("Barbeiro removido: ID {}", barbeiro.getIdBarbeiro());
    }

}
