package com.crud.cidenet.model.dao;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.crud.cidenet.model.entity.Colaborador;

public interface IColaboradorDao extends CrudRepository<Colaborador, Long> {
	
	@Query("SELECT c FROM Colaborador c WHERE "
			+ "(:primerNombre IS NULL OR c.primerNombre =:primerNombre) and "
			+ "(:segundoNombre IS NULL OR c.segundoNombre =:segundoNombre) and "
			+ "(:primerApellido IS NULL OR c.primerApellido =:primerApellido) and "
			+ "(:segundoApellido IS NULL OR c.segundoApellido =:segundoApellido) and "
			+ "(:pais IS NULL OR c.pais =:pais) and "
			+ "(:tipoIdentificacion IS NULL OR c.tipoIdentificacion =:tipoIdentificacion) and "
			+ "(:numeroIdentificacion IS NULL OR c.numeroIdentificacion =:numeroIdentificacion) and "
			+ "(:estado IS NULL OR c.estado =:estado)")
	public List<Colaborador> filterColaboradores(@Param("primerNombre") String primerNombre, @Param("segundoNombre") String segundoNombre,
			@Param("primerApellido") String primerApellido, @Param("segundoApellido") String segundoApellido,
			@Param("pais") String pais, @Param("tipoIdentificacion") String tipoIdentificacion, @Param("numeroIdentificacion") String numeroIdentificacion,
			@Param("estado") String estado);
	
	public Optional<Colaborador> findBynumeroIdentificacion(String numeroIdentificacion);
	public List<Colaborador> findByCorreo(String correo);
}
