package com.ivaalsolutions.libraryserver.service;

import com.ivaalsolutions.libraryserver.dao.BookRepository;
import com.ivaalsolutions.libraryserver.dao.CheckoutRepository;
import com.ivaalsolutions.libraryserver.entity.Book;
import com.ivaalsolutions.libraryserver.entity.Checkout;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Optional;

@Service
@Transactional
public class BookService {
    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private CheckoutRepository checkoutRepository;

    public Book checkoutBook(String userEmail, Long bookId) throws Exception {
        Optional<Book> book = bookRepository.findById(bookId);
        // check if user already has this book checked out
        Checkout validateCheckout = checkoutRepository.findByUserEmailAndBookId(userEmail, bookId);

        if (book.isEmpty() || validateCheckout != null || book.get().getCopiesAvailable() <= 0) {
            throw new Exception("Book doesn't exist or is already checked out by this user");
        }

        book.get().setCopiesAvailable(book.get().getCopiesAvailable() - 1);
        bookRepository.save(book.get());

        Checkout checkout = new Checkout(userEmail, LocalDate.now().toString(),
                LocalDate.now().plusDays(7).toString(),
                book.get().getId());

        checkoutRepository.save(checkout);

        return book.get();
    }
}
