package com.proyecto3.todolist.api.Controllers;

import com.proyecto3.todolist.api.Domain.Todo;
import com.proyecto3.todolist.api.Services.TodoService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/todo")
public class TodoController {

    private final TodoService todoService;

    public TodoController(TodoService todoService){
        this.todoService = todoService;
    }

    @GetMapping("/")
    public List<Todo> getTodos() {
        return todoService.findAll();
    }

    @GetMapping("/{id}")
    public Todo findById(@PathVariable Long id) {
        return todoService.findOneById(id);
    }

    @GetMapping(value="/", params="category")
    public List<Todo> findAllByCategory(@RequestParam("category") String category) {
        return todoService.findAllByCategory(category);
    }

    @GetMapping(value="/find-category", params="category")
    public List<Todo> findByCategoryQuery(@RequestParam("category") String category) {
        return todoService.findByCategoryQuery(category);
    }

    @GetMapping(value="/", params="description")
    public List<Todo> findAllByDescription(@RequestParam("description") String description) {
        return todoService.findAllByDescription(description);
    }

    @GetMapping(value="/", params="status")
    public List<Todo> findAllByStatus(@RequestParam("status") String status) {
        return todoService.findAllByStatus(status);
    }

    @GetMapping(value="/", params="dateCreated")
    public List<Todo> findAllByCreatedDate(@RequestParam("dateCreated") LocalDate dateCreated) {
        return todoService.findAllByCreatedDate(dateCreated);
    }

    @PostMapping("/")
    public Todo newEmployee(@RequestBody Todo newTodo) {
        return todoService.saveOne(newTodo);
    }

    @PutMapping("/")
    Todo putTodo(@RequestBody Todo newTodo) {
        return todoService.updateOne(newTodo);
    }

    @DeleteMapping("/{id}")
    void deleteEmployee(@PathVariable Long id) {
        todoService.deleteOne(id);
    }

}
