package com.AgendaServico.demo.Service;


import com.AgendaServico.demo.Model.Cliente;
import com.AgendaServico.demo.Repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository repository;

    public List<Cliente> listarTodos(){
        return repository.findAll();
    }

    public Cliente salvar(Cliente cliente) {
        return repository.save(cliente);
    }

    public Optional<Cliente> buscarporId(Long id) {
        return repository.findById(id);
    }

    public void deletar (Long id) {
        repository.deleteById(id);
    }

}
