package com.example.employeecrud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employees")
public class EmployeeController {

    @Autowired
    private EmployeeRepository repository;

    // POST /employees
    @PostMapping
    public Employee createEmployee(@RequestBody Employee employee) {
        return repository.save(employee);
    }

    // GET /employees
    @GetMapping
    public List<Employee> getAllEmployees() {
        return repository.findAll();
    }

    // PUT /employees/{id}
    @PutMapping("/{id}")
    public Employee updateEmployee(@PathVariable Long id,
                                   @RequestBody Employee newEmployee) {

        return repository.findById(id).map(emp -> {
            emp.setName(newEmployee.getName());
            emp.setDepartment(newEmployee.getDepartment());
            return repository.save(emp);
        }).orElseThrow();
    }

    // DELETE /employees/{id}
    @DeleteMapping("/{id}")
    public String deleteEmployee(@PathVariable Long id) {
        repository.deleteById(id);
        return "Employee deleted with id " + id;
    }
}
