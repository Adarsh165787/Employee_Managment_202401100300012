package com.example.employeecrud;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/ui")
public class EmployeeUIController {

    private final EmployeeRepository repository;

    public EmployeeUIController(EmployeeRepository repository) {
        this.repository = repository;
    }

    // DASHBOARD / HOME
    @GetMapping("/dashboard")
    public String dashboard(Model model) {
        model.addAttribute("totalEmployees", repository.count());
        return "dashboard";
    }

    // EMPLOYEE PAGE
    @GetMapping("/employees")
    public String employees(Model model) {
        model.addAttribute("employees", repository.findAll());
        return "employees";
    }

    @PostMapping("/employees/add")
    public String addEmployee(@RequestParam String name,
                              @RequestParam String department) {
        repository.save(new Employee(name, department));
        return "redirect:/ui/employees";
    }

    @PostMapping("/employees/delete/{id}")
    public String deleteEmployee(@PathVariable Long id) {
        repository.deleteById(id);
        return "redirect:/ui/employees";
    }

    // ABOUT PAGE
    @GetMapping("/about")
    public String about() {
        return "about";
    }
}
