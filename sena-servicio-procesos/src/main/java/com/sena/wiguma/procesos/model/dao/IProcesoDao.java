package com.sena.wiguma.procesos.model.dao;

import org.springframework.data.repository.CrudRepository;
import com.sena.wiguma.procesos.model.entity.Proceso;

public interface IProcesoDao extends CrudRepository<Proceso, Long> {
	
	

}
