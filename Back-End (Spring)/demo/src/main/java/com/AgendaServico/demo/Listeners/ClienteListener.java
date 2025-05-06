package com.AgendaServico.demo.Listeners;

import com.AgendaServico.demo.model.Agendamento;
import com.AgendaServico.demo.model.Cliente;
import jakarta.persistence.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ClienteListener {

    private static final Logger logger = LoggerFactory.getLogger(ClienteListener.class);

    @PostLoad
    public void onLoad(Cliente cliente) {
        logger.info("Cliente carregado: ID {}", cliente.getIdCliente());
    }

    @PostPersist
    public void onCreate(Cliente cliente) {
        logger.info("Novo Cliente criado: ID {}", cliente.getIdCliente());
    }

    @PostUpdate
    public void onUpdate(Cliente cliente) {
        logger.info("Cliente atualizado: ID {}", cliente.getIdCliente());
    }

    @PreRemove
    public void onDelete(Cliente cliente) {
        logger.warn("Cliente removido: ID {}", cliente.getIdCliente());
    }

}
