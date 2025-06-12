package br.com.project.espike.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "tb_occurrences")
public class Occurrence {
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id_occurrence;

	    private String description;
	    private String occurrence_type;
	    private String status;
	    private LocalDateTime date_time;
	    private Double latitude;
	    private Double longitude;

	    // Getters and setters

	public Long getId_occurrence() {
		return id_occurrence;
	}

	public void setId_occurrence(Long id_occurrence) {
		this.id_occurrence = id_occurrence;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getOccurrence_type() {
		return occurrence_type;
	}

	public void setOccurrence_type(String occurrence_type) {
		this.occurrence_type = occurrence_type;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public LocalDateTime getDate_time() {
		return date_time;
	}

	public void setDate_time(LocalDateTime date_time) {
		this.date_time = date_time;
	}

	public Double getLatitude() {
		return latitude;
	}

	public void setLatitude(Double latitude) {
		this.latitude = latitude;
	}

	public Double getLongitude() {
		return longitude;
	}

	public void setLongitude(Double longitude) {
		this.longitude = longitude;
	}

}

