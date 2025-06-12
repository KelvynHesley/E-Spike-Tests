package br.com.project.espike.service;

import br.com.project.espike.model.AlertRepository;
import br.com.project.espike.repository.AlertRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlertService {
    @Autowired
    private AlertRepository alertRepository;

    public AlertRepository createAlert(AlertRepository alert) {
        return alertRepository.save(alert);
    }

    public List<AlertRepository> getAllAlerts() {
        return alertRepository.findAll();
    }
}
