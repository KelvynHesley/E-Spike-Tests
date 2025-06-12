package br.com.project.espike.controller;


import br.com.project.espike.model.MarkerRepository;
import br.com.project.espike.service.MarkerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/markers")
@CrossOrigin(origins = "http://localhost:5173")
public class MarkerController {

    @Autowired
    private MarkerService markerService;

    @GetMapping
    public ResponseEntity<List<MarkerRepository>> getAllMarkers() {
        return ResponseEntity.ok(markerService.getAllMarkers());
    }


    @PostMapping
    public ResponseEntity<List<MarkerRepository>> saveMarkers(@RequestBody List<MarkerRepository> markers) {
        return ResponseEntity.ok(markerService.saveMarkers(markers));
    }
}
