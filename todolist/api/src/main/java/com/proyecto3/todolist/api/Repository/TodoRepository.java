package com.proyecto3.todolist.api.Repository;

import com.proyecto3.todolist.api.Domain.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
    List<Todo> findAllByCategory(String category);
    List<Todo> findAllByDescription(String description);
    List<Todo> findAllByStatus(String status);
    List<Todo> findAllByCreatedDate(LocalDate date);

    //QUERIES

    @Query(value="select t from Todo t where t.category = :category")
    List<Todo> findByCategoryQuery(@Param("category") String category);
}
