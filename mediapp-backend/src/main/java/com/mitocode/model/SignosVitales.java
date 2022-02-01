package com.mitocode.model;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "signosVitales")
public class SignosVitales {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idSigno;
	
	@Column(name = "fecha", nullable = false)
	private LocalDateTime fecha;
	
	@Column(name = "temperatura", nullable = false, length = 4)
	private String temperatura;
	
	@Column(name = "pulso", nullable = false, length = 4)
	private String pulso;
	
	@Column(name = "ritmo_r", nullable = false, length = 4)
	private String ritmoR;
	
	@ManyToOne
	@JoinColumn(name = "id_paciente", nullable = false, foreignKey = @ForeignKey(name = "FK_signos_vitales_paciente"))
	private Paciente paciente;

	public Integer getIdSigno() {
		return idSigno;
	}

	public void setIdSigno(Integer idSigno) {
		this.idSigno = idSigno;
	}

	public LocalDateTime getFecha() {
		return fecha;
	}

	public void setFecha(LocalDateTime fecha) {
		this.fecha = fecha;
	}

	public String getTemperatura() {
		return temperatura;
	}

	public void setTemperatura(String temperatura) {
		this.temperatura = temperatura;
	}

	public String getPulso() {
		return pulso;
	}

	public void setPulso(String pulso) {
		this.pulso = pulso;
	}


	public String getRitmoR() {
		return ritmoR;
	}

	public void setRitmoR(String ritmoR) {
		this.ritmoR = ritmoR;
	}

	public Paciente getPaciente() {
		return paciente;
	}

	public void setPaciente(Paciente paciente) {
		this.paciente = paciente;
	}

	@Override
	public String toString() {
		return "SignosVitales [idSigno=" + idSigno + ", fecha=" + fecha + ", temperatura=" + temperatura + ", pulso="
				+ pulso + ", ritmoR=" + ritmoR + ", paciente=" + paciente + "]";
	}

	
	
	

}
