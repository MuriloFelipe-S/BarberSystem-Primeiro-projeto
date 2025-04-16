package com.AgendaServico.demo.Service;

import com.AgendaServico.demo.model.Servico;
import com.AgendaServico.demo.Repository.ServicoRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

public class ServicoService {

    @Autowired
    ServicoRepository repository;

    public List<Servico> listarTodos(){
        return repository.findAll();
    }

    public Servico salvar(Servico servico) {
        return repository.save(servico);
    }

    public Optional<Servico> buscarporId(Long id) {
        return repository.findById(id);
    }

    public void deletar (Long id) {
        repository.deleteById(id);
    }

}
