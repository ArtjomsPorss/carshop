package com.artjomporsh.carshop.optionselected;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.artjomporsh.carshop.model.BaseEntity;

import lombok.Data;

@Data
@Entity
@Table(name = "OPTION_SELECTED")
public class OptionSelected extends BaseEntity {
	
	@Column(name="car_id")
	private Integer carId;
	@Column(name="opt_id")
	private Integer selectedOption;
	@Column(name="price")
	private BigDecimal price;
}
