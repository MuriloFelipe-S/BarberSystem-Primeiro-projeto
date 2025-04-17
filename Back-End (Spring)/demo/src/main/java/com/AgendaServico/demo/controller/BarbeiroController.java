package com.AgendaServico.demo.controller;

import com.AgendaServico.demo.Service.BarbeiroService;
import com.AgendaServico.demo.model.Barbeiro;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/barbeiro")
public class BarbeiroController {

    private final BarbeiroService barbeiroService;

    @Autowired
    public BarbeiroController(BarbeiroService barbeiroService) {
        this.barbeiroService = barbeiroService;
    }

    @GetMapping
    public List<Barbeiro> listarTodos() {
        return barbeiroService.listarTodos();
    }

    @PostMapping
    public Barbeiro criarBarbeiro(@RequestBody Barbeiro barbeiro) {
        return barbeiroService.criarBarbeiro(barbeiro);
    }

    @PutMapping("/{id}")
    public Barbeiro atualizarBarbeiro(@PathVariable Integer id, @RequestBody Barbeiro barbeiro) {
        return barbeiroService.atualizarBarbeiro(id, barbeiro);
    }

    @DeleteMapping("/{id}")
    public void excluirBarbeiro(@PathVariable Integer id) {
        barbeiroService.excluirBarbeiro(id);
    }

}
