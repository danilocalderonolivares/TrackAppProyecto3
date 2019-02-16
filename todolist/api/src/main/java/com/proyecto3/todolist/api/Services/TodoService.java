package com.proyecto3.todolist.api.Services;

import com.proyecto3.todolist.api.Domain.Todo;
import com.proyecto3.todolist.api.Repository.TodoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@Transactional
public class TodoService {

    private final TodoRepository todoRepository;

    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    public Todo saveOne(Todo todo) {
        return todoRepository.save(todo);
    }

    public Todo updateOne(Todo todo) {
        Todo todoBase = todoRepository.findById(todo.getId()).get();
        todoBase.setCategory(todo.getCategory());
        todoBase.setDescription(todo.getDescription());
        todoBase.setStatus(todo.getStatus());
        todoBase.setCreatedDate(todo.getCreatedDate());
        return todoRepository.save(todoBase);
    }

    public void deleteOne(Long id) {
        todoRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public List<Todo> findAll() {
        return todoRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Todo findOneById(Long id) {
        return todoRepository.findById(id).get();
    }

    @Transactional(readOnly = true)
    public List<Todo> findAllByCategory(String category) {
        return todoRepository.findAllByCategory(category);
    }

    @Transactional(readOnly = true)
    public List<Todo> findByCategoryQuery(String category) { return todoRepository.findByCategoryQuery(category); }

    @Transactional(readOnly = true)
    public List<Todo> findAllByDescription(String description) {
        return todoRepository.findAllByDescription(description);
    }

    @Transactional(readOnly = true)
    public List<Todo> findAllByStatus(String status) {
        return todoRepository.findAllByStatus(status);
    }

    @Transactional(readOnly = true)
    public List<Todo> findAllByCreatedDate(LocalDate date) {
        return todoRepository.findAllByCreatedDate(date);
    }
}
