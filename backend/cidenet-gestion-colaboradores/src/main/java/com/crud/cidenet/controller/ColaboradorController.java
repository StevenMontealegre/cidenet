package com.crud.cidenet.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import com.crud.cidenet.model.entity.Colaborador;
import com.crud.cidenet.model.entity.ColaboradorFilter;
import com.crud.cidenet.model.service.IColaboradorService;

@RestController
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
		RequestMethod.DELETE })
public class ColaboradorController {

	@Autowired
	private IColaboradorService colaboradorService;

	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("/listar")
	public List<Colaborador> listar() {
		return colaboradorService.findAll();
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("/listar/{id}")
	public Colaborador buscarById(@PathVariable Long id) {
		return colaboradorService.findById(id);
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping(path = "/filtrar", consumes = "application/json", produces = "application/json")
	public ResponseEntity<List<Colaborador>> listarColaboradores(@RequestBody ColaboradorFilter filter)
			throws Exception {
		List<Colaborador> colaboradores = null;
		try {
			colaboradores = colaboradorService.findByFilter(filter);
			return new ResponseEntity<List<Colaborador>>(colaboradores, HttpStatus.OK);
		} catch (Exception e) {
			throw new Exception(e);
		}
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping(path = "/guardar", consumes = "application/json", produces = "application/json")
	public ResponseEntity<Colaborador> guardarColaboradores(@RequestBody Colaborador colaborador) throws Exception {
		Colaborador usuario = null;
		try {
			usuario = colaboradorService.save(colaborador);
			return new ResponseEntity<Colaborador>(usuario, HttpStatus.OK);
		} catch (Exception e) {
			throw new Exception(e);
		}
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping(path = "/buscar/{numeroIdentificacion}")
	public ResponseEntity<Colaborador> findColaboradorByNumIdentificacion(@PathVariable String numeroIdentificacion)
			throws Exception {
		Colaborador colaborador = null;
		try {
			colaborador = colaboradorService.findBynumeroIdentificacion(numeroIdentificacion);
			return new ResponseEntity<Colaborador>(colaborador, HttpStatus.OK);
		} catch (Exception e) {
			throw new Exception(e);
		}
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping(path = "/findByCorreo/{correo}")
	public ResponseEntity<Integer> findColaboradorBycorreo(@PathVariable String correo) throws Exception {
		List<Colaborador> colaborador = null;
		try {
			colaborador = colaboradorService.findByCorreo(correo);
			return new ResponseEntity<Integer>(colaborador.size(), HttpStatus.OK);
		} catch (Exception e) {
			throw new Exception(e);
		}
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@DeleteMapping(path = "/borrar/{numeroIdentificacion}")
	public ResponseEntity<Boolean> deleteColaborador(@PathVariable String numeroIdentificacion) {
		boolean st = colaboradorService.deleteBynumeroIdentificacion(numeroIdentificacion);
		return new ResponseEntity<Boolean>(st, HttpStatus.OK);
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@PutMapping("/editar/{numeroIdentificacion}")
	@ResponseStatus(HttpStatus.CREATED)
	public Colaborador editarColaborador(@RequestBody Colaborador colaborador,
			@PathVariable String numeroIdentificacion) {
		Colaborador buscado = colaboradorService.findBynumeroIdentificacion(numeroIdentificacion);

		buscado.setPrimerNombre(colaborador.getPrimerNombre());
		buscado.setSegundoNombre(colaborador.getSegundoNombre());
		buscado.setPrimerApellido(colaborador.getPrimerApellido());
		buscado.setSegundoApellido(colaborador.getSegundoApellido());
		buscado.setPais(colaborador.getPais());
		buscado.setTipoIdentificacion(colaborador.getTipoIdentificacion());
		buscado.setNumeroIdentificacion(colaborador.getNumeroIdentificacion());
		buscado.setFechaIngreso(colaborador.getFechaIngreso());
		buscado.setArea(colaborador.getArea());
		colaboradorService.save(buscado);
		
		return colaboradorService.save(buscado);

	}
}
