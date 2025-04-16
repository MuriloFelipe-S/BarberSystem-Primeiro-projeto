package com.AgendaServico.demo.Repository;

import com.AgendaServico.demo.model.Agendamento;
import com.AgendaServico.demo.model.Servico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServicoRepository extends JpaRepository<Servico, Long> {
}
