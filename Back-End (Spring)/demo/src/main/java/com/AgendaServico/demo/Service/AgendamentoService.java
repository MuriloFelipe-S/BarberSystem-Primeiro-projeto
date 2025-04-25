package com.AgendaServico.demo.Service;

import com.AgendaServico.demo.Repository.AgendamentoRepository;
import com.AgendaServico.demo.Repository.ClienteRepository; // Importe o repositório Cliente
import com.AgendaServico.demo.Repository.BarbeiroRepository; // Importe o repositório Barbeiro
import com.AgendaServico.demo.Repository.ServicoRepository;  // Importe o repositório Servico
import com.AgendaServico.demo.model.Agendamento;
import com.AgendaServico.demo.model.Cliente;  // Importe o modelo Cliente
import com.AgendaServico.demo.model.Barbeiro; // Importe o modelo Barbeiro
import com.AgendaServico.demo.model.Servico;  // Importe o modelo Servico
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AgendamentoService {

    private final AgendamentoRepository agendamentoRepository;
    private final ClienteRepository clienteRepository; // Adicione o repositório Cliente
    private final BarbeiroRepository barbeiroRepository; // Adicione o repositório Barbeiro
    private final ServicoRepository servicoRepository;   // Adicione o repositório Servico

    @Autowired
    public AgendamentoService(AgendamentoRepository agendamentoRepository,
                              ClienteRepository clienteRepository,
                              BarbeiroRepository barbeiroRepository,
                              ServicoRepository servicoRepository) {
        this.agendamentoRepository = agendamentoRepository;
        this.clienteRepository = clienteRepository;
        this.barbeiroRepository = barbeiroRepository;
        this.servicoRepository = servicoRepository;
    }

    // Métodos existentes

    public List<Agendamento> listarAgendamento() {
        return agendamentoRepository.findAll();
    }

    public Agendamento criarAgendamento(Agendamento agendamento) {
        return agendamentoRepository.save(agendamento);
    }

    public Agendamento atualizarAgendamento(Integer id, Agendamento agendamento) {
        if (agendamentoRepository.existsById(id)) {
            agendamento.setIdAgendamento(id);
            return agendamentoRepository.save(agendamento);
        } else {
            throw new EntityNotFoundException("Usuário não encontrado");
        }
    }

    public void excluirAgendamento(Integer id) {
        if (agendamentoRepository.existsById(id)) {
            agendamentoRepository.deleteById(id);
        } else {
            throw new EntityNotFoundException("Usuário não encontrado");
        }
    }

    // Métodos para listar clientes, barbeiros e serviços

    public List<Cliente> listarClientes() {
        return clienteRepository.findAll();  // Consulta todos os clientes
    }

    public List<Barbeiro> listarBarbeiros() {
        return barbeiroRepository.findAll();  // Consulta todos os barbeiros
    }

    public List<Servico> listarServicos() {
        return servicoRepository.findAll();  // Consulta todos os serviços
    }

    public Optional<Agendamento> findById(Integer id) {
        return Optional.empty();
    }
}
