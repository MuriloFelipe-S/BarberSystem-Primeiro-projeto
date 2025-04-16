package com.AgendaServico.demo.controller;


import com.AgendaServico.demo.Repository.AgendamentoRepository;
import com.AgendaServico.demo.model.Agendamento;
import com.AgendaServico.demo.model.Barbeiro;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/agenda")
public class AgendamentoController {

    @Autowired
    private AgendamentoRepository agendamentoRepository;

    @GetMapping
    public List<Agendamento> listarAgenda(){

        return agendamentoRepository.findAll();

    }

    @GetMapping("/{id}")
    public Agendamento buscarPorId(@PathVariable Long id){

        return agendamentoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Agendamento nao encontrado com o id: " + id));

    }

    @PostMapping
    public Agendamento criarAgendamento(@RequestBody @Valid Agendamento agendamento){

        return agendamentoRepository.save(agendamento);

    }

    @PutMapping("/{id}") // requisição PUT (atualiza um Agendamento) → ex: PUT /Agendamento/1 <-- id do Agendamento

    public Agendamento atualizarAgenda(@PathVariable Long id, @RequestBody Agendamento agendaAtualizada){

        Agendamento agendamento = agendamentoRepository.findById(id) // buscando Agendamento existente
                .orElseThrow(() -> new RuntimeException("Agendamento não encontrado com o id: " + id)); // erro se a agenda nao existe

        agendamento.setCliente(agendaAtualizada.getCliente());
        agendamento.setDataHoraAgendamento(agendaAtualizada.getDataHoraAgendamento());

        return agendamentoRepository.save(agendamento); // salva alteracao
    }
}
