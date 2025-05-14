package com.AgendaServico.demo.Service;

import com.AgendaServico.demo.model.Servico;
import com.AgendaServico.demo.Repository.ServicoRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServicoService {

    private final ServicoRepository servicoRepository;

    @Autowired
    public ServicoService(ServicoRepository servicoRepository) {
        this.servicoRepository = servicoRepository;
    }

    public List<Servico> listarTodos() {
        return servicoRepository.findAll();
    }

    public void validarTipo(String tipo){
        if (servicoRepository.existsByTipo(tipo)){
            throw new IllegalArgumentException("esse serviço já criado");
        }
    }

    public Servico criarServico(Servico servico) {

        validarTipo(servico.getTipo());
        return servicoRepository.save(servico);

    }

    public Servico atualizarServico(Integer id, Servico servico) {
        if (servicoRepository.existsById(id)) {
            servico.setIdServico(id);
            return servicoRepository.save(servico);
        } else {
            throw new EntityNotFoundException("Serviço não encontrado");
        }
    }

    public void excluirServico(Integer id) {
        if (servicoRepository.existsById(id)) {
            servicoRepository.deleteById(id);
        } else {
            throw new EntityNotFoundException("Serviço não encontrado");
        }
    }

}


