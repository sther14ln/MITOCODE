package com.mitocode.controller;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.mitocode.dto.SignosVitalesDTO;
import com.mitocode.exception.ModeloNotFoundException;
import com.mitocode.model.SignosVitales;
import com.mitocode.service.ISignosVitalesService;

@RestController
@RequestMapping("/signosVitales")
public class SignosVitalesController {
	
	@Autowired
	private ISignosVitalesService service;

	@Autowired
	private ModelMapper mapper;
	
	
	@GetMapping
	public ResponseEntity<List<SignosVitalesDTO>> listar() throws Exception{
		List<SignosVitalesDTO> lista = service.listar().stream().map(p -> mapper.map(p, SignosVitalesDTO.class)).collect(Collectors.toList());
		return new ResponseEntity<>(lista, HttpStatus.OK);
	}
	
	@GetMapping("/pageable")
	public ResponseEntity<Page<SignosVitalesDTO>> listarPageable(Pageable page) throws Exception{
		Page<SignosVitalesDTO> signosVitales = service.listarPageable(page).map(p -> mapper.map(p, SignosVitalesDTO.class));
		
		return new ResponseEntity<>(signosVitales, HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity<SignosVitalesDTO> registrarSV(@Valid @RequestBody SignosVitalesDTO dtoRequest) throws Exception {
		SignosVitales p = mapper.map(dtoRequest, SignosVitales.class);
		System.out.println(p.toString());
		SignosVitales obj = service.registrar(p);
		SignosVitalesDTO dtoResponse = mapper.map(obj, SignosVitalesDTO.class);
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(dtoResponse.getIdSigno()).toUri();
		return ResponseEntity.created(location).build();
	}
	
	
	@GetMapping("/{id}")
	public ResponseEntity<SignosVitalesDTO> listarPorId(@PathVariable("id") Integer id) throws Exception{
		SignosVitalesDTO dtoResponse;
		SignosVitales obj = service.listarPorId(id);
		if(obj == null) {
			throw new ModeloNotFoundException("ID NO ENCONTRADO " + id);
		}else {
			dtoResponse = mapper.map(obj, SignosVitalesDTO.class);
		}
		return new ResponseEntity<>(dtoResponse, HttpStatus.OK);
	}
	
	
	@PutMapping
	public ResponseEntity<SignosVitalesDTO> modificar(@Valid @RequestBody SignosVitalesDTO dtoRequest) throws Exception {
		SignosVitales pac = service.listarPorId(dtoRequest.getIdSigno());
		
		if(pac == null) {
			throw new ModeloNotFoundException("ID NO ENCONTRADO " + dtoRequest.getIdSigno());	
		}		
		
		SignosVitales p = mapper.map(dtoRequest, SignosVitales.class);		 
		SignosVitales obj = service.modificar(p);		
		SignosVitalesDTO dtoResponse = mapper.map(obj, SignosVitalesDTO.class);
		
		return new ResponseEntity<>(dtoResponse, HttpStatus.OK);		
	}
	
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> eliminar(@PathVariable("id") Integer id) throws Exception {
		SignosVitales pac = service.listarPorId(id);
		
		if(pac == null) {
			throw new ModeloNotFoundException("ID NO ENCONTRADO " + id);
		}
		
		service.eliminar(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
	
}
