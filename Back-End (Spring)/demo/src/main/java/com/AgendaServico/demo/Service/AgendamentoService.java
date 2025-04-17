package com.AgendaServico.demo.Service;


import com.AgendaServico.demo.Repository.AgendamentoRepository;
import com.AgendaServico.demo.model.Agendamento;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AgendamentoService {


    private final AgendamentoRepository agendamentoRepository;

    @Autowired
    public AgendamentoService(AgendamentoRepository agendamentoRepository) {
        this.agendamentoRepository = agendamentoRepository;
    }

    public List<Agendamento> listarAgendamento() {
        return agendamentoRepository.findAll();
    }

    public Agendamento criarAgendamento(Agendamento agendamento) {
        return agendamentoRepository.save(agendamento);
    }

    public Agendamento atualizarAgendamento(Integer id, Agendamento agendamento) {
        if (agendamentoRepository.existsById(id)) {
            agendamento.setIdAgendamento(id);
            return agendamentoRepository.save(agendamento);
        } else {
            throw new EntityNotFoundException("Usuário não encontrado");
        }
    }

    public void excluirAgendamento(Integer id) {
        if (agendamentoRepository.existsById(id)) {
            agendamentoRepository.deleteById(id);
        } else {
            throw new EntityNotFoundException("Usuário não encontrado");
        }
    }

}
