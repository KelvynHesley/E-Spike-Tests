package br.com.project.espike.service;

import br.com.project.espike.model.MarkerRepository;
import br.com.project.espike.repository.MarkerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MarkerService {

    @Autowired
    private MarkerRepository markerRepository;

    public List<MarkerRepository> getAllMarkers() {
        return markerRepository.findAll();
    }

    public List<MarkerRepository> saveMarkers(List<MarkerRepository> markers) {
        markerRepository.deleteAll();
        return markerRepository.saveAll(markers);
    }
}
