package com.ivaalsolutions.libraryserver.dao;

import com.ivaalsolutions.libraryserver.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {
}
