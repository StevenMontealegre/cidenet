package com.sena.wiguma.procesos.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.sena.wiguma.procesos.model.entity.Proceso;
import com.sena.wiguma.procesos.model.entity.ProcesoFilter;
import com.sena.wiguma.procesos.model.service.IProcesoService;
import org.springframework.web.bind.annotation.RequestMethod;

@RestController
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST, RequestMethod.PUT})
public class ProcesoController {
	
	private IProcesoService procesoService;
	
	@PutMapping(path= "/agregarProceso", consumes = "application/json", produces = "application/json")
	public ResponseEntity<Proceso> editarEstado(@RequestBody ProcesoFilter filter) throws Exception {
		Proceso proceso = null;
		try {
			proceso = procesoService.saveWithFilter(filter);
			if (proceso != null) {
				return new ResponseEntity<Proceso> (proceso, HttpStatus.OK);
			} else {
				return new ResponseEntity<Proceso>(HttpStatus.BAD_REQUEST);
			}
		} catch (Exception e) {
			throw new Exception(e.getMessage());
		}
	}
}
