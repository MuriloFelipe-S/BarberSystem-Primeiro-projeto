package com.AgendaServico.demo.Repository;

import com.AgendaServico.demo.model.Agendamento;
import com.AgendaServico.demo.model.Servico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServicoRepository extends JpaRepository<Servico, Integer> {

    // extends JpaRepository<...> --> Importa os métodos prontos do CRUD
    // <Servico, Integer> --> entidade que sera gerenciada e tipo de chave primaria (id)

}
