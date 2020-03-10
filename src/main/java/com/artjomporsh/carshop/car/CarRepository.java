package com.artjomporsh.carshop.car;

import java.util.List;

import org.springframework.dao.DataAccessException;
import org.springframework.data.repository.Repository;
import org.springframework.transaction.annotation.Transactional;

public interface CarRepository extends Repository <Car, Integer> {
	
	@Transactional(readOnly = true)
	List<Car> findAll();
	
	@Transactional
	Car findById(Integer id);
	
	@Transactional
	Car save(Car car) throws DataAccessException;
	

}
