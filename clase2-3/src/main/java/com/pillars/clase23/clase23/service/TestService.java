package com.pillars.clase23.clase23.service;

import com.pillars.clase23.clase23.domain.Test;
import com.pillars.clase23.clase23.repository.TestRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class TestService {

    private final TestRepository testRepository;

    public TestService(TestRepository testRepository) {
        this.testRepository = testRepository;
    }

    @Transactional(readOnly=false)
    public List<Test> findAll() {
        return testRepository.findAll();
    }
}
