package com.AgendaServico.demo.controller;


import com.AgendaServico.demo.Service.AgendamentoService;
import com.AgendaServico.demo.model.Agendamento;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://127.0.0.1:5500")
@RestController
@RequestMapping("/agenda")
public class AgendamentoController {

    private final AgendamentoService agendamentoService;

    @Autowired
    public AgendamentoController(AgendamentoService agendamentoService) {
        this.agendamentoService = agendamentoService;
    }

    @GetMapping
    public List<Agendamento> listarAgendamento() {
        return agendamentoService.listarAgendamento();
    }

    @PostMapping
    public Agendamento criarAgendamento(@RequestBody Agendamento agendamento) {
        return agendamentoService.criarAgendamento(agendamento);
    }

    @PutMapping("/{id}")
    public Agendamento atualizarAgendamento(@PathVariable Integer id, @RequestBody Agendamento agendamento) {
        return agendamentoService.atualizarAgendamento(id, agendamento);
    }

    @DeleteMapping("/{id}")
    public void excluirAgendamento(@PathVariable Integer id) {
        agendamentoService.excluirAgendamento(id);
    }

}
