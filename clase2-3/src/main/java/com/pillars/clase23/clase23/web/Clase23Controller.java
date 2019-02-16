package com.pillars.clase23.clase23.web;

import com.pillars.clase23.clase23.domain.Test;
import com.pillars.clase23.clase23.service.TestService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class Clase23Controller {

    private final TestService testService;

    public Clase23Controller(TestService testService) {
        this.testService = testService;
    }

    @GetMapping("/find-all")
    public List<Test> getList() {
        return testService.findAll();
    }

    @GetMapping("/")
    public String getString() {
         return "Hello World";
    }
}
