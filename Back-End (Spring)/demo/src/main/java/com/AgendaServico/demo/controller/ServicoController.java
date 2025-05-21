package com.AgendaServico.demo.controller;

import com.AgendaServico.demo.Service.ServicoService;
import com.AgendaServico.demo.model.Servico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://127.0.0.1:5500")
@RestController
@RequestMapping("/servico")
public class ServicoController {

    private final ServicoService servicoService;

    @Autowired
    public ServicoController(ServicoService servicoService) {
        this.servicoService = servicoService;
    }

    @GetMapping
    public List<Servico> listarTodos() {
        return servicoService.listarTodos();
    }

    @PostMapping
    public Servico criarServico(@RequestBody Servico servico) {
        return servicoService.criarServico(servico);
    }

    @PutMapping("/{id}")
    public Servico atualizarServico(@PathVariable Integer id, @RequestBody Servico servico) {
        return servicoService.atualizarServico(id, servico);
    }

    @DeleteMapping("/{id}")
    public void excluirServico(@PathVariable Integer id) {
        servicoService.excluirServico(id);
    }

}
