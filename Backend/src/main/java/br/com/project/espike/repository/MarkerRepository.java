package br.com.project.espike.repository;

import br.com.project.espike.model.MarkerRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MarkerRepository extends JpaRepository<MarkerRepository, Long> {
}
