package br.com.project.espike.controller;

import br.com.project.espike.model.AlertRepository;
import br.com.project.espike.service.AlertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alerts")
@CrossOrigin(origins = "http://localhost:5173")
public class AlertController {
    @Autowired
    private AlertService alertService;

    @PostMapping
    public ResponseEntity<AlertRepository> createAlert(@RequestBody AlertRepository alert) {
        return ResponseEntity.ok(alertService.createAlert(alert));
    }

    @GetMapping
    public ResponseEntity<List<AlertRepository>> getAllAlerts() {
        return ResponseEntity.ok(alertService.getAllAlerts());
    }
}
