package com.AgendaServico.demo.controller;

import com.AgendaServico.demo.model.Servico;
import com.AgendaServico.demo.Repository.ServicoRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;

@RestController
@RequestMapping("/servico")
public class ServicoController {

    @Autowired
    private ServicoRepository servicoRepository;

    @GetMapping // requisição GET (lista todos os serviços)
    public List<Servico> listarServico(){
        return servicoRepository.findAll();
    }

    @PostMapping // requisição POST (cria um novo serviço)
    public Servico criarServico(@RequestBody @Valid Servico servico){
        return servicoRepository.save(servico);
    }

    @GetMapping("/{id}")
    public Servico buscarPorId(@PathVariable Long id){
        return servicoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Servico não encontrado com o id: " + id));
    }

    @PutMapping("/{id}") // requisição PUT (atualiza um serviço)
    public Servico atualizarServico(@PathVariable Long id, @RequestBody @Valid Servico servicoAtualizado){
        Servico servico = servicoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Servico não encontrado com o id: " + id));

        // Atualiza as informações do serviço
        servico.setTipo(servicoAtualizado.getTipo());
        servico.setValor(servicoAtualizado.getValor());

        return servicoRepository.save(servico); // salva as alterações
    }

    @DeleteMapping("/{id}")
    public void deletarServico(@PathVariable Long id){
        if (!servicoRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Servico com ID " + id + " não encontrado.");
        }
        servicoRepository.deleteById(id);
    }
}
