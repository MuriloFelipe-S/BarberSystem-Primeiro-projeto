package com.AgendaServico.demo.Repository;

import com.AgendaServico.demo.model.Agendamento;
import com.AgendaServico.demo.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AgendamentoRepository extends JpaRepository<Agendamento, Integer> {

    // extends JpaRepository<...> --> Importa os métodos prontos do CRUD
    // <Agendamento, Integer> --> entidade que sera gerenciada e tipo de chave primaria (id)

}
