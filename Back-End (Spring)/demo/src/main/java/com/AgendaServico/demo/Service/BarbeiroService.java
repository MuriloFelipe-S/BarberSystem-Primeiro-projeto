package com.AgendaServico.demo.Service;


import com.AgendaServico.demo.Repository.BarbeiroRepository;
import com.AgendaServico.demo.Repository.ClienteRepository;
import com.AgendaServico.demo.model.Barbeiro;
import com.AgendaServico.demo.model.Cliente;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BarbeiroService {

    private final BarbeiroRepository barbeiroRepository;

    @Autowired
    public BarbeiroService(BarbeiroRepository barbeiroRepository) {
        this.barbeiroRepository = barbeiroRepository;
    }

    public List<Barbeiro> listarTodos() {
        return barbeiroRepository.findAll();
    }

    public Barbeiro criarBarbeiro(Barbeiro barbeiro) {
        return barbeiroRepository.save(barbeiro);
    }

    public Barbeiro atualizarBarbeiro(Integer id, Barbeiro barbeiro) {
        if (barbeiroRepository.existsById(id)) {
            barbeiro.setIdBarbeiro(id);
            return barbeiroRepository.save(barbeiro);
        } else {
            throw new EntityNotFoundException("Barbeiro não encontrado");
        }
    }

    public void excluirBarbeiro(Integer id) {
        if (barbeiroRepository.existsById(id)) {
            barbeiroRepository.deleteById(id);
        } else {
            throw new EntityNotFoundException("Barbeiro não encontrado");
        }
    }


}
