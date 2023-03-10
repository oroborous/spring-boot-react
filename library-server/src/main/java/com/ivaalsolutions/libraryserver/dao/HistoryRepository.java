package com.ivaalsolutions.libraryserver.dao;

import com.ivaalsolutions.libraryserver.entity.History;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

public interface HistoryRepository extends JpaRepository<History, Long> {
    Page<History> findByUserEmail(@RequestParam("email") String userEmail, Pageable pageable);
}
