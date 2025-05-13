package com.AgendaServico.demo.Repository;

import com.AgendaServico.demo.model.Agendamento;
import com.AgendaServico.demo.model.Barbeiro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface AgendamentoRepository extends JpaRepository<Agendamento, Integer> {

    boolean existsByBarbeiroAndDataHora(Barbeiro barbeiro, java.time.LocalDateTime dataHora);
    boolean existsByBarbeiro_IdBarbeiro(Integer idBarbeiro);

    Optional<Agendamento> findByBarbeiroAndDataHoraAndIdAgendamentoNot(Barbeiro barbeiro, LocalDateTime dataHora, Integer idAgendamento);

}
