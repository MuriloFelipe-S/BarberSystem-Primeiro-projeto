package com.AgendaServico.demo.Controller;

import com.AgendaServico.demo.Model.Barbeiro;
import com.AgendaServico.demo.Repository.BarbeiroRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/barbeiro")
public class BarbeiroController {

    @Autowired
    private BarbeiroRepository barbeiroRepository;

    @GetMapping // requisição GET (lista todos os barbeiros) → ex: GET /Barbeiro
    public List <Barbeiro> listarBarbeiro(){
        return barbeiroRepository.findAll();
    }

    @PostMapping // requisição POST (cria um novo cliente) → ex: POST /Cliente
    public Barbeiro criarBarbeiro(@RequestBody @Valid Barbeiro barbeiro){

        return barbeiroRepository.save(barbeiro);

    }

    @GetMapping("/{id}")
    public Barbeiro buscarPorId(@PathVariable Long id){

        return barbeiroRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Barbeiro nao encontrado com o id: "+ id));

    }

    @PutMapping("/{id}") // requisição PUT (atualiza um barbeiro) → ex: PUT /Barbeiro/1 <-- id
    public Barbeiro atualizarBarbeiro(@PathVariable Long id, @RequestBody Barbeiro barbeiroAtualizado){

        Barbeiro barbeiro = barbeiroRepository.findById(id) // buscando barbeiro existente
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com o id: " + id)); // erro se o cliente nao existe

        // atualiza as informacoes do cliente
        barbeiro.setNome(barbeiroAtualizado.getNome());
        barbeiro.setSalario(barbeiroAtualizado.getSalario());

        return barbeiroRepository.save(barbeiro); // salva as alteracoes

    }


}
