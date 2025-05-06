package com.AgendaServico.demo.controller;

import com.AgendaServico.demo.Service.AgendamentoService;
import com.AgendaServico.demo.model.Agendamento;
import com.AgendaServico.demo.model.Cliente; // Importe o modelo Cliente
import com.AgendaServico.demo.model.Barbeiro; // Importe o modelo Barbeiro
import com.AgendaServico.demo.model.Servico;  // Importe o modelo Servico
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://127.0.0.1:5500")
@RestController
@RequestMapping("/agenda")
public class AgendamentoController {

    private final AgendamentoService agendamentoService;

    @Autowired
    public AgendamentoController(AgendamentoService agendamentoService) {
        this.agendamentoService = agendamentoService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Agendamento> buscarPorId(@PathVariable Integer id) {
        Optional<Agendamento> agendamento = agendamentoService.findById(id);
        return agendamento.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Endpoint para listar agendamentos
    @GetMapping
    public List<Agendamento> listarAgendamento() {
        return agendamentoService.listarAgendamento();
    }

    // Endpoint para criar um agendamento
    @PostMapping
    public Agendamento criarAgendamento(@RequestBody Agendamento agendamento) {
        return agendamentoService.criarAgendamento(agendamento);
    }

    // Endpoint para atualizar um agendamento
    @PutMapping("/{id}")
    public Agendamento atualizarAgendamento(@PathVariable Integer id, @RequestBody Agendamento agendamento) {
        return agendamentoService.atualizarAgendamento(id, agendamento);
    }

    // Endpoint para excluir um agendamento
    @DeleteMapping("/{id}")
    public void excluirAgendamento(@PathVariable Integer id) {
        agendamentoService.excluirAgendamento(id);
    }

    // Endpoint para listar clientes
    @GetMapping("/cliente")
    public List<Cliente> listarClientes() {
        // Chame o serviço responsável por listar os clientes
        return agendamentoService.listarClientes();
    }

    // Endpoint para listar barbeiros
    @GetMapping("/barbeiro")
    public List<Barbeiro> listarBarbeiros() {
        // Chame o serviço responsável por listar os barbeiros
        return agendamentoService.listarBarbeiros();
    }

    // Endpoint para listar serviços
    @GetMapping("/servico")
    public List<Servico> listarServicos() {
        // Chame o serviço responsável por listar os serviços
        return agendamentoService.listarServicos();
    }

}
