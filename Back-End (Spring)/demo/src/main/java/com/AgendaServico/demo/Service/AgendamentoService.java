package com.AgendaServico.demo.Service;


import com.AgendaServico.demo.Repository.AgendamentoRepository;
import com.AgendaServico.demo.model.Agendamento;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AgendamentoService {


    @Autowired
    private AgendamentoRepository agendamentoRepository;

    public List<Agendamento> listarTodos(){
        return agendamentoRepository.findAll();
    }

    public Agendamento salvar(Agendamento agendamento) {

        return agendamentoRepository.save(agendamento);
    }

    public Optional<Agendamento> buscarporId(Long id) {
        return agendamentoRepository.findById(id);
    }

    public void deletar (Long id) {
        agendamentoRepository.deleteById(id);
    }

}
