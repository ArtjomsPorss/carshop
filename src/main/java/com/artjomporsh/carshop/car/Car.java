package com.artjomporsh.carshop.car;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.artjomporsh.carshop.model.BaseEntity;

import lombok.Data;

@Data
@Entity
@Table(name = "CAR")
public class Car extends BaseEntity {
	
	@Column(name = "MAKE")
	private String make;
	@Column(name = "MODEL")
	private String model;
	@Column(name = "EDITION")
	private String edition;
	@Column(name = "PRICE")
	private BigDecimal price;
	
}
