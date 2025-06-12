package br.com.project.espike.controller;

import br.com.project.espike.model.Occurrence;
import br.com.project.espike.service.OccurrenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/occurrences")
@CrossOrigin(origins = "http://localhost:5173")
public class OccurrenceController {
    @Autowired
    private OccurrenceService occurrenceService;

    @PostMapping
    public ResponseEntity<Occurrence> createOccurrence(@RequestBody Occurrence occurrence) {
        return ResponseEntity.ok(occurrenceService.saveOccurrence(occurrence));
    }

    @PutMapping
    public ResponseEntity<Occurrence> updateOccurrence(@RequestBody Occurrence occurrence) {
        return ResponseEntity.ok(occurrenceService.updateOccurrence(occurrence));
    }

    @GetMapping
    public ResponseEntity<List<Occurrence>> getAllOccurrences() {
        return ResponseEntity.ok(occurrenceService.getAllOccurrences());
    }
}
