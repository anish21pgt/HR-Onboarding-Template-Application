package com.tarento.API.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Entity
@Table(name = "employee_table")
@Getter
@Setter
public class Employee {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String position;
    private String hometown;
    private String ibu;
    private String manager;
    private String quote;
}
