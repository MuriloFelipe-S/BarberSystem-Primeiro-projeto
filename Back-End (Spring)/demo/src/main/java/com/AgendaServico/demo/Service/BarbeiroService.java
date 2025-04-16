package com.AgendaServico.demo.Service;


import com.AgendaServico.demo.Repository.BarbeiroRepository;
import com.AgendaServico.demo.Repository.ClienteRepository;
import com.AgendaServico.demo.model.Barbeiro;
import com.AgendaServico.demo.model.Cliente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BarbeiroService {

    @Autowired
    private BarbeiroRepository barbeiroRepository;

    public List<Barbeiro> listarTodos(){
        return barbeiroRepository.findAll();
    }

    public Barbeiro salvar(Barbeiro barbeiro) {

        return barbeiroRepository.save(barbeiro);
    }

    public Optional<Barbeiro> buscarporId(Long id) {
        return barbeiroRepository.findById(id);
    }

    public void deletar (Long id) {
        barbeiroRepository.deleteById(id);
    }

}
