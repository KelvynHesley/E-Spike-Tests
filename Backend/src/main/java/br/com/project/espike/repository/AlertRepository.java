package br.com.project.espike.repository;

import br.com.project.espike.model.AlertRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlertRepository extends JpaRepository<AlertRepository, Long> {
}
