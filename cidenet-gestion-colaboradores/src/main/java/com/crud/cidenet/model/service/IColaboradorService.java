package com.crud.cidenet.model.service;

import java.util.List;

import com.crud.cidenet.model.entity.Colaborador;
import com.crud.cidenet.model.entity.ColaboradorFilter;

public interface IColaboradorService {
	
	public Colaborador save(Colaborador colaborador);
	public List<Colaborador> findAll();
	public Colaborador findById(Long id);
	public List<Colaborador> findByFilter(ColaboradorFilter filter);
	public Colaborador findBynumeroIdentificacion(String numeroIdentificacion);
	public List<Colaborador> findByCorreo(String correo);
	public Boolean deleteBynumeroIdentificacion(String numeroIdentificacion);
	public Colaborador editarColaborador(String id, Colaborador col);

}
