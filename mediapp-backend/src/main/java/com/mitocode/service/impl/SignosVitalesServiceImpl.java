package com.mitocode.service.impl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mitocode.model.SignosVitales;
import com.mitocode.repo.IGenericRepo;
import com.mitocode.repo.ISignosVitalesRepo;
import com.mitocode.service.ISignosVitalesService;

@Service
public class SignosVitalesServiceImpl extends CRUDImpl<SignosVitales, Integer> implements ISignosVitalesService {

	@Autowired
	private ISignosVitalesRepo repo;
	
	@Override
	protected IGenericRepo<SignosVitales, Integer> getRepo() {
		// TODO Auto-generated method stub
		return repo;
	}
	
	@Override
	public Page<SignosVitales> listarPageable(Pageable page) {
		// TODO Auto-generated method stub
		return repo.findAll(page);
	}

	@Transactional
	@Override
	public SignosVitales registrarTransaccional(SignosVitales signosVitales) throws Exception {
		// TODO Auto-generated method stub
		return repo.save(signosVitales);
	}

	
	
	

	
	
	
	
	/*@Override
	public Consulta registrarTransaccional(SignosVitales signosVitales) throws Exception {
		signosVitales.getDetalleConsulta().forEach(det -> det.setConsulta(consulta));

		/*
		 * for(DetalleConsulta det : consulta.getDetalleConsulta()) {
		 * det.setConsulta(consulta); }
		 */

		//return repo.save(signosVitales);

		//examenes.forEach(ex -> ceRepo.registrar(consulta.getIdConsulta(), ex.getIdExamen()));

		//return signosVitales;
	//}*/
	
	

}
