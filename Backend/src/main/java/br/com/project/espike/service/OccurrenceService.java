package br.com.project.espike.service;

import br.com.project.espike.model.Occurrence;
import br.com.project.espike.repository.OccurrenceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OccurrenceService {
    @Autowired
    private OccurrenceRepository occurrenceRepository;

    public Occurrence saveOccurrence(Occurrence occurrence) {
        return occurrenceRepository.save(occurrence);
    }

    public Occurrence updateOccurrence(Occurrence occurrence) {
        return occurrenceRepository.save(occurrence);
    }

    public List<Occurrence> getAllOccurrences() {
        return occurrenceRepository.findAll();
    }
}
