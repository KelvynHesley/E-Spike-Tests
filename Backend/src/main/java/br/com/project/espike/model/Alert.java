package br.com.project.espike.model;


import jakarta.persistence.*;

@Entity
@Table(name = "tb_alerts")
public class AlertRepository {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_alert;

    private Double alert_radius;

    private String severity_level;

    private String alert_message;

    private String alert_time;

    private Double latitude;

    private Double longitude;

    public Long getId_alert() {
        return id_alert;
    }

    public void setId_alert(Long id_alert) {
        this.id_alert = id_alert;
    }

    public Double getAlert_radius() {
        return alert_radius;
    }

    public void setAlert_radius(Double alert_radius) {
        this.alert_radius = alert_radius;
    }

    public String getSeverity_level() {
        return severity_level;
    }

    public void setSeverity_level(String severity_level) {
        this.severity_level = severity_level;
    }

    public String getAlert_message() {
        return alert_message;
    }

    public void setAlert_message(String alert_message) {
        this.alert_message = alert_message;
    }

    public String getAlert_time() {
        return alert_time;
    }

    public void setAlert_time(String alert_time) {
        this.alert_time = alert_time;
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
