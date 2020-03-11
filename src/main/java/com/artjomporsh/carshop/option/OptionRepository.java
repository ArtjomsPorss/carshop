package com.artjomporsh.carshop.option;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import org.springframework.data.repository.Repository;

public interface OptionRepository extends Repository<Option, Integer> {
	@Transactional(readOnly = true)
	List<Option> findAll();
}
