package com.mitocode.dto;

import java.time.LocalDateTime;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Signos Vitales DTO Data")
public class SignosVitalesDTO {
	
	private Integer idSigno;
	
	@NotNull
	private LocalDateTime fecha;
	
	@Schema(description = "temperatura del paciente")
	@Size(min = 2)
	private String temperatura;
	
	@Schema(description = "pulso del paciente")
	@Size(min = 2)
	private String pulso;
	
	@Schema(description = "ritmo respiratorio del paciente")
	@Size(min = 2)
	private String ritmoR;
	
	@NotNull
	private PacienteDTO paciente;

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

	public PacienteDTO getPaciente() {
		return paciente;
	}

	public void setPaciente(PacienteDTO paciente) {
		this.paciente = paciente;
	}
	
	
	
	

}
