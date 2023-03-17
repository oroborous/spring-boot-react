package com.ivaalsolutions.libraryserver.dao;

import com.ivaalsolutions.libraryserver.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestParam;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    // TODO: did I break this by changing "book_id" to "bookId"
    Page<Review> findByBookId(@RequestParam("bookId") Long bookId, Pageable pageable);

    Review findByUserEmailAndBookId(String userEmail, Long bookId);

    @Modifying
    @Query("delete from Review where bookId = :bookId")
    void deleteAllByBookId(@Param("bookId") Long bookId);
}
