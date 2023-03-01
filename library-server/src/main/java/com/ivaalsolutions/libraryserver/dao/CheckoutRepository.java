package com.ivaalsolutions.libraryserver.dao;

import com.ivaalsolutions.libraryserver.entity.Checkout;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CheckoutRepository extends JpaRepository<Checkout, Long> {
    Checkout findByUserEmailAndBookId(String userEmail, Long bookId);
}
