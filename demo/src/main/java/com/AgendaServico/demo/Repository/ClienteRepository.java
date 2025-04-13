package com.AgendaServico.demo.Repository;

import com.AgendaServico.demo.model.Cliente; // importando cliente do Model
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository // Anotacao informa para o Spring que essa classe acessa o banco
public interface ClienteRepository extends JpaRepository<Cliente, Long>{

    // extends JpaRepository<...> --> Importa os métodos prontos do CRUD
    // <Cliente, Long> --> entidade que sera gerenciada e tipo de chave primaria (id)

}
