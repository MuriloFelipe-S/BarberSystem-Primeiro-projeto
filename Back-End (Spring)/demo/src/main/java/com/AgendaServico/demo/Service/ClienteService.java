package com.AgendaServico.demo.Service;


import com.AgendaServico.demo.model.Cliente;
import com.AgendaServico.demo.Repository.ClienteRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;

    @Autowired
    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    public List<Cliente> listarTodos() {
        return clienteRepository.findAll();
    }

    public Cliente criarCliente(Cliente cliente) {

        validarTelefone(cliente.getTelefone());
        return clienteRepository.save(cliente);

    }

    private void validarTelefone(String telefone) {

        if (clienteRepository.existsBytelefone(telefone)) {

            throw new IllegalArgumentException("Ja existe um barbeiro com este telefone.");

        }

    }

    public Cliente atualizarCliente(Integer id, Cliente cliente) {
        if (clienteRepository.existsById(id)) {
            cliente.setIdCliente(id);
            return clienteRepository.save(cliente);
        } else {
            throw new EntityNotFoundException("Cliente não encontrado");
        }
    }

    public void excluirCliente(Integer id) {
        if (clienteRepository.existsById(id)) {
            clienteRepository.deleteById(id);
        } else {
            throw new EntityNotFoundException("Cliente não encontrado");
        }
    }

}
