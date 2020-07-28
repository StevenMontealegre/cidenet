package com.sena.wiguma.procesos.model.entity;


public class ProcesoFilter {
	
	private Long caudal;
	private Long temperatura;
	private Long humedad;
	private Long ph;
	private Long sNivAlto;
	private Long sNivMinimo;
	private Long sPresencia;
	private String tipoProducto;
	private Long cantidad;
	
	/**
	 * Getters and setters
	 */
	
	public Long getCaudal() {
		return caudal;
	}
	public void setCaudal(Long caudal) {
		this.caudal = caudal;
	}
	public Long getTemperatura() {
		return temperatura;
	}
	public void setTemperatura(Long temperatura) {
		this.temperatura = temperatura;
	}
	public Long getHumedad() {
		return humedad;
	}
	public void setHumedad(Long humedad) {
		this.humedad = humedad;
	}
	public Long getPh() {
		return ph;
	}
	public void setPh(Long ph) {
		this.ph = ph;
	}
	public Long getsNivAlto() {
		return sNivAlto;
	}
	public void setsNivAlto(Long sNivAlto) {
		this.sNivAlto = sNivAlto;
	}
	public Long getsNivMinimo() {
		return sNivMinimo;
	}
	public void setsNivMinimo(Long sNivMinimo) {
		this.sNivMinimo = sNivMinimo;
	}
	public Long getsPresencia() {
		return sPresencia;
	}
	public void setsPresencia(Long sPresencia) {
		this.sPresencia = sPresencia;
	}
	public String getTipoProducto() {
		return tipoProducto;
	}
	public void setTipoProducto(String tipoProducto) {
		this.tipoProducto = tipoProducto;
	}
	public Long getCantidad() {
		return cantidad;
	}
	public void setCantidad(Long cantidad) {
		this.cantidad = cantidad;
	}
	
}
