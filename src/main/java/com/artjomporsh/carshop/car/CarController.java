package com.artjomporsh.carshop.car;

import java.util.Collection;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class CarController {
	
	@Autowired
	CarRepository carRepo;
	
	Logger logger = LoggerFactory.getLogger(CarController.class);

	@GetMapping("/allcars")
	public String cars() {
		List<Car> cars = carRepo.findAll();
		
		logger.info(String.format("ALL CARS: %s", cars == null || cars.isEmpty() ? "nothing" : cars.get(0)));
		
		return "cars.html";
	}
}
