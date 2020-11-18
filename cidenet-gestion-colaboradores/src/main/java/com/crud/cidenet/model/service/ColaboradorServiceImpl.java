package com.crud.cidenet.model.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.crud.cidenet.model.dao.IColaboradorDao;
import com.crud.cidenet.model.entity.Colaborador;
import com.crud.cidenet.model.entity.ColaboradorFilter;

@Service
public class ColaboradorServiceImpl implements IColaboradorService {
	
	@Autowired
	IColaboradorDao colaboradorDao;

	@Override
	public Colaborador save(Colaborador colaborador) {
		Colaborador colaboradorBuscado = colaboradorDao.findBynumeroIdentificacion(colaborador.getNumeroIdentificacion()).orElse(null);
		if (colaboradorBuscado != null && colaborador.getTipoIdentificacion().equalsIgnoreCase(colaboradorBuscado.getTipoIdentificacion())) {
			return null;
		} else {
			return colaboradorDao.save(colaborador);
		}
	}

	@Override
	@Transactional
	public List<Colaborador> findAll() {
		return (List<Colaborador>) colaboradorDao.findAll();
	}

	@Override
	@Transactional
	public Colaborador findById(Long id) {
		return colaboradorDao.findById(id).orElse(null);
	}

	@Override
	@Transactional
	public List<Colaborador> findByFilter(ColaboradorFilter filter) {
		return colaboradorDao.filterColaboradores(filter.getPrimerNombre(), filter.getSegundoNombre(), filter.getPrimerApellido(), filter.getSegundoApellido(),
				filter.getPais(), filter.getTipoIdentificacion(), filter.getNumeroIdentificacion(), filter.getEstado());
	}

	@Override
	@Transactional
	public Colaborador findBynumeroIdentificacion(String numeroIdentificacion) {
		return colaboradorDao.findBynumeroIdentificacion(numeroIdentificacion).orElse(null);
	}

	@Override
	public List<Colaborador> findByCorreo(String correo) {
		return colaboradorDao.findByCorreo(correo);
	}

	@Override
	public Boolean deleteBynumeroIdentificacion(String numeroIdentificacion) {
		boolean eliminado = false;
		Colaborador col = colaboradorDao.findBynumeroIdentificacion(numeroIdentificacion).orElse(null);
		if (col != null) {
			colaboradorDao.delete(col);
			eliminado = true;
		}
		return eliminado;
			
	}

	@Override
	public Colaborador editarColaborador(String id, Colaborador col) {
		Colaborador colab = colaboradorDao.findBynumeroIdentificacion(id).orElse(null);
		colab.setPrimerNombre(col.getPrimerNombre());
		colab.setSegundoNombre(col.getSegundoNombre());
		colab.setPrimerApellido(col.getPrimerApellido());
		colab.setSegundoApellido(col.getSegundoApellido());
		colab.setPais(col.getPais());
		colab.setTipoIdentificacion(col.getTipoIdentificacion());
		colab.setNumeroIdentificacion(col.getNumeroIdentificacion());
		colab.setFechaIngreso(col.getFechaIngreso());
		colab.setArea(col.getArea());
		return colaboradorDao.save(colab);
	}
}
