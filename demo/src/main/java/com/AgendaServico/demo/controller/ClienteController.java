package com.AgendaServico.demo.controller;

import com.AgendaServico.demo.model.Cliente;
import com.AgendaServico.demo.Repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;


@RestController // indica que essa classe é um controller REST (vai responder em json)
@RequestMapping("/cliente") //define o caminho base das rotas desse controller (localhost:8080/Cliente)
public class ClienteController {

    @Autowired // injeta automaticamente uma instância de ClienteRepository
    private ClienteRepository clienteRepository;

    @GetMapping // requisição GET (lista todos os clientes) → ex: GET /Cliente
    public List<Cliente> listarClientes() {
        return clienteRepository.findAll();
    }

    @PostMapping // requisição POST (cria um novo cliente) → ex: POST /Cliente
    public Cliente criarCliente(@RequestBody @Valid Cliente cliente){

        return clienteRepository.save(cliente);

    }

    @GetMapping("/{id}") // requisição GET por ID (localiza cliente por id) → ex: GET /Cliente/1
    public Cliente buscarPorId(@PathVariable Long id){

        return clienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario nao encontrado com o id: "+ id));

    }

    @PutMapping("/{id}") // requisição PUT (atualiza um cliente) → ex: PUT /Cliente/1
    public Cliente atualizarCliente(@PathVariable Long id, @RequestBody Cliente clientActualization){

        Cliente cliente = clienteRepository.findById(id) // buscando cliente existente
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com o id: " + id)); // erro se o cliente nao existe

        // atualiza as informacoes do cliente
        cliente.setNome(clientActualization.getNome());
        cliente.setEmail(clientActualization.getEmail());
        cliente.setTell(clientActualization.getTell());

        return clienteRepository.save(cliente); // salva as alteracoes

    }

    @DeleteMapping("/{id}") // Requisição DELETE (deleta um Cliente) → ex: DELETE /Cliente/1
    public void deletarCliente(@PathVariable Long id) {

        if (!clienteRepository.existsById(id)) {
            throw new RuntimeException("Cliente com ID " + id + " não encontrado.");
        }

        clienteRepository.deleteById(id);
    }

}
