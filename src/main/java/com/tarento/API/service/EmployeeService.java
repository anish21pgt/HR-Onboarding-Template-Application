package com.tarento.API.service;

import com.tarento.API.Entity.Employee;
import com.tarento.API.Repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class EmployeeService {
    @Autowired
    EmployeeRepository employeeRepository;
    public void saveEmployee(Employee employee)
    {
        employeeRepository.save(employee);
    }

    public Employee getEmployeeById(int id){
        Optional<Employee> option = employeeRepository.findById(id);
        if(option.isPresent()) {
            return option.get();
        }
        return null;
    }

    public ArrayList<Employee> getAllEmployees()
    {
        return (ArrayList<Employee>) employeeRepository.findAll();
    }
}
