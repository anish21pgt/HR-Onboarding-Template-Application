package com.tarento.API.Controller;

import com.tarento.API.Entity.Employee;
import com.tarento.API.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @CrossOrigin(origins = "*")
    @PostMapping
    public void addEmployee(@RequestBody Employee employee) {
        employeeService.saveEmployee(employee);
    }

    @GetMapping("/{id}")
    public Employee getEmployeeById(@PathVariable("id") int id) {
        return employeeService.getEmployeeById(id);
    }

    @GetMapping("/getAll")
    public ArrayList<Employee> getAllEmployees() {
        return employeeService.getAllEmployees();
    }
}
