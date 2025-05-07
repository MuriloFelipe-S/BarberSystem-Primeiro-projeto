package com.AgendaServico.demo.Service;

import com.AgendaServico.demo.Repository.AgendamentoRepository;
import com.AgendaServico.demo.Repository.ClienteRepository;
import com.AgendaServico.demo.Repository.BarbeiroRepository;
import com.AgendaServico.demo.Repository.ServicoRepository;
import com.AgendaServico.demo.model.Agendamento;
import com.AgendaServico.demo.model.Cliente;
import com.AgendaServico.demo.model.Barbeiro;
import com.AgendaServico.demo.model.Servico;
import jakarta.persistence.EntityNotFoundException;
import org.apache.coyote.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class AgendamentoService {

    private static final Logger logger = LoggerFactory.getLogger(AgendamentoService.class);

    private final AgendamentoRepository agendamentoRepository;
    private final ClienteRepository clienteRepository;
    private final BarbeiroRepository barbeiroRepository;
    private final ServicoRepository servicoRepository;

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

    public List<Agendamento> listarAgendamento() {
        try {
            List<Agendamento> lista = agendamentoRepository.findAll();
            logger.info("Agendamentos carregados com sucesso. Total: {}", lista.size());
            return lista;
        } catch (Exception e) {
            logger.error("Erro ao listar agendamentos", e);
            throw e;
        }
    }

    public Agendamento criarAgendamento(Agendamento agendamento) {
        try {
            Barbeiro barbeiroCompleto = buscarBarbeiroCompleto(agendamento.getBarbeiro());
            agendamento.setBarbeiro(barbeiroCompleto);

            validarHorarioDentroDoExpediente(agendamento);
            validarDisponibilidade(agendamento);

            Agendamento novo = agendamentoRepository.save(agendamento);
            logger.info("Agendamento criado: ID {}", novo.getIdAgendamento());
            return novo;
        } catch (Exception e) {
            logger.error("Erro ao criar agendamento", e);
            throw e;
        }
    }

    public Agendamento atualizarAgendamento(Integer id, Agendamento agendamento) {
        try {
            if (agendamentoRepository.existsById(id)) {
                Barbeiro barbeiroCompleto = buscarBarbeiroCompleto(agendamento.getBarbeiro());
                agendamento.setBarbeiro(barbeiroCompleto);

                validarHorarioDentroDoExpediente(agendamento);
                validarDisponibilidade(agendamento);

                agendamento.setIdAgendamento(id);
                Agendamento atualizado = agendamentoRepository.save(agendamento);
                logger.info("Agendamento atualizado: ID {}", id);
                return atualizado;
            } else {
                logger.warn("Tentativa de atualizar agendamento inexistente: ID {}", id);
                throw new EntityNotFoundException("Agendamento não encontrado");
            }
        } catch (Exception e) {
            logger.error("Erro ao atualizar agendamento: ID {}", id, e);
            throw e;
        }
    }


    public void excluirAgendamento(Integer id) {
        try {
            if (agendamentoRepository.existsById(id)) {
                agendamentoRepository.deleteById(id);
                logger.info("Agendamento excluído: ID {}", id);
            } else {
                logger.warn("Tentativa de excluir agendamento inexistente: ID {}", id);
                throw new EntityNotFoundException("Agendamento não encontrado");
            }
        } catch (Exception e) {
            logger.error("Erro ao excluir agendamento: ID {}", id, e);
            throw e;
        }
    }

    public List<Cliente> listarClientes() {
        try {
            List<Cliente> clientes = clienteRepository.findAll();
            logger.info("Clientes carregados: {}", clientes.size());
            return clientes;
        } catch (Exception e) {
            logger.error("Erro ao listar clientes", e);
            throw e;
        }
    }

    public List<Barbeiro> listarBarbeiros() {
        try {
            List<Barbeiro> barbeiros = barbeiroRepository.findAll();
            logger.info("Barbeiros carregados: {}", barbeiros.size());
            return barbeiros;
        } catch (Exception e) {
            logger.error("Erro ao listar barbeiros", e);
            throw e;
        }
    }

    public List<Servico> listarServicos() {
        try {
            List<Servico> servicos = servicoRepository.findAll();
            logger.info("Serviços carregados: {}", servicos.size());
            return servicos;
        } catch (Exception e) {
            logger.error("Erro ao listar serviços", e);
            throw e;
        }
    }

    public Optional<Agendamento> findById(Integer id) {
        try {
            Optional<Agendamento> agendamento = agendamentoRepository.findById(id);
            if (agendamento.isPresent()) {
                logger.info("Agendamento encontrado: ID {}", id);
            } else {
                logger.warn("Agendamento não encontrado: ID {}", id);
            }
            return agendamento;
        } catch (Exception e) {
            logger.error("Erro ao buscar agendamento por ID: {}", id, e);
            throw e;
        }
    }

    private void validarHorarioDentroDoExpediente(Agendamento agendamento){
        Barbeiro barbeiro = agendamento.getBarbeiro();
        LocalTime hora = agendamento.getDataHora().toLocalTime();

        if (hora.isBefore(barbeiro.getInicioExpediente()) || hora.isAfter(barbeiro.getFimExpediente())){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Horário fora de expediente do barbeiro.");
        }
    }

    private void validarDisponibilidade(Agendamento agendamento) {
        if (agendamentoRepository.existsByBarbeiroAndDataHora(
                agendamento.getBarbeiro(), agendamento.getDataHora())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Este horário já está ocupado para este barbeiro.");
        }
    }
    private Barbeiro buscarBarbeiroCompleto(Barbeiro barbeiroParcial) {
        return barbeiroRepository.findById(barbeiroParcial.getIdBarbeiro())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Barbeiro não encontrado"));
    }

}
