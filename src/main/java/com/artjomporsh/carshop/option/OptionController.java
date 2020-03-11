package com.artjomporsh.carshop.option;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class OptionController {
	
	@Autowired
	OptionRepository optionRepo;
	
	@GetMapping("/all-options")
	@ResponseBody List<Option> getAllOptions() {
		return optionRepo.findAll();
	}

}
