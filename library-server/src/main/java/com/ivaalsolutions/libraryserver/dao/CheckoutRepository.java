package com.ivaalsolutions.libraryserver.dao;

import com.ivaalsolutions.libraryserver.entity.Checkout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CheckoutRepository extends JpaRepository<Checkout, Long> {
    Checkout findByUserEmailAndBookId(String userEmail, Long bookId);

    List<Checkout> findByUserEmail(String userEmail);

    @Modifying
    @Query("delete from Checkout where bookId = :bookId")
    void deleteAllByBookId(@Param("bookId") Long bookId);
}
