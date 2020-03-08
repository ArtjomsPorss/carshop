package com.artjomporsh.carshop.car;

import java.util.List;

import org.springframework.data.repository.Repository;
import org.springframework.transaction.annotation.Transactional;

public interface CarRepository extends Repository <Car, Integer> {
	
	@Transactional(readOnly = true)
	List<Car> findAll();

}
