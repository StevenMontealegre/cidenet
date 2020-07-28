package com.sena.wiguma.procesos.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sena.wiguma.procesos.model.dao.IProcesoDao;
import com.sena.wiguma.procesos.model.entity.Proceso;
import com.sena.wiguma.procesos.model.entity.ProcesoFilter;

@Service
public class ProcesoServiceImpl implements IProcesoService {
	
	@Autowired
	private IProcesoDao procesoDao;

	@Override
	public Proceso save(Proceso proceso) {
		return procesoDao.save(proceso);
	}

	@Override
	public Proceso saveWithFilter(ProcesoFilter filter) {
		Proceso pr = new Proceso();
		try {
			if (filter != null) {
				
				pr.setCantidad(filter.getCantidad());
				pr.setCaudal(filter.getCaudal());
				pr.setHumedad(filter.getHumedad());
				pr.setPh(filter.getPh());
				pr.setsNivAlto(filter.getsNivAlto());
				pr.setsNivMinimo(filter.getsNivMinimo());
				pr.setsPresencia(filter.getsPresencia());
				pr.setTemperatura(filter.getTemperatura());
				pr.setTipoProducto(filter.getTipoProducto());
			
			} else {	
				return null;
			}
			
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		return save(pr);
	}	
}
