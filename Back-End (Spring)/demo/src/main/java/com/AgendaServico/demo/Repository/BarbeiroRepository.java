package com.AgendaServico.demo.Repository;

import com.AgendaServico.demo.model.Barbeiro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BarbeiroRepository extends JpaRepository<Barbeiro, Integer> {

    boolean existsByemail(String email);
    boolean existsBytelefone(String telefone);

}
