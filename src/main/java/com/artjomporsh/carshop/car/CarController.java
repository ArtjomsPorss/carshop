package com.artjomporsh.carshop.car;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CarController {

	@Autowired
	CarRepository carRepo;

	Logger logger = LoggerFactory.getLogger(CarController.class);

	@GetMapping("/allcars")
	public @ResponseBody List<Car> cars() {
		List<Car> cars = carRepo.findAll();

		logger.info(String.format("AMOUNT OF CARS: %d", cars.size()));

		return cars;
	}
}
