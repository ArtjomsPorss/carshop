package com.artjomporsh.carshop.option;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.artjomporsh.carshop.model.BaseEntity;

import lombok.Data;

@Data
@Entity
@Table(name="options")
public class Option extends BaseEntity {
	
	@Column(name="name")
	private String name;
}
