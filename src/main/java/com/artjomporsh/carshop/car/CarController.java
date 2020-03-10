package com.artjomporsh.carshop.car;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
	
	@GetMapping("/car/{carId}")
	public @ResponseBody Car getCar(@PathVariable("carId") Integer carId) {
		Car car = carRepo.findById(carId);
		logger.info(String.format("AMOUNT OF CARS: %s", car));
		return car;
	}
	
	@PostMapping("/updateCarDetails")
	public void updateCarDetails(@RequestBody Car car) {
		logger.info(String.format("Update Car: %s", car));
		carRepo.save(car);
	}
	
	@PostMapping("/new-car")
	public @ResponseBody Car newCar(@RequestBody Car car) {
		logger.info(String.format("Save Car: %s", car));
		return carRepo.save(car);
	}
	
	@PostMapping("/delete-car")
	public void deleteCar(@RequestBody Car car) {
		logger.info(String.format("Save Car: %s", car));
		carRepo.delete(car);
	}
	
	
}
