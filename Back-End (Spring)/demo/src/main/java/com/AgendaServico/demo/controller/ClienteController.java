package com.AgendaServico.demo.controller;

import com.AgendaServico.demo.Service.ClienteService;
import com.AgendaServico.demo.model.Cliente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://127.0.0.1:5500")
@RestController // indica que essa classe é um controller REST (vai responder em json)
@RequestMapping("/cliente") //define o caminho base das rotas desse controller (localhost:8080/Cliente)
public class ClienteController {

    private final ClienteService clienteService;

    @Autowired
    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @GetMapping
    public List<Cliente> listarTodos() {
        return clienteService.listarTodos();
    }

    @PostMapping
    public Cliente criarCliente(@RequestBody Cliente cliente) {
        return clienteService.criarCliente(cliente);
    }

    @PutMapping("/{id}")
    public Cliente atualizarCliente(@PathVariable Integer id, @RequestBody Cliente cliente) {
        return clienteService.atualizarCliente(id, cliente);
    }

    @DeleteMapping("/{id}")
    public void excluirCliente(@PathVariable Integer id) {
        clienteService.excluirCliente(id);
    }

}
