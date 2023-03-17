package com.ivaalsolutions.libraryserver.service;

import com.ivaalsolutions.libraryserver.dao.BookRepository;
import com.ivaalsolutions.libraryserver.dao.CheckoutRepository;
import com.ivaalsolutions.libraryserver.dao.ReviewRepository;
import com.ivaalsolutions.libraryserver.entity.Book;
import com.ivaalsolutions.libraryserver.requestmodels.AddBookRequest;
import com.ivaalsolutions.libraryserver.responsemodels.ChangeBookQuantityResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class AdminService {
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private CheckoutRepository checkoutRepository;
    @Autowired
    private ReviewRepository reviewRepository;

    public void deleteBook(Long bookId) throws Exception {
        Optional<Book> optional = bookRepository.findById(bookId);

        if (optional.isEmpty()) {
            throw new Exception("Book was not found");
        }

        reviewRepository.deleteAllByBookId(bookId);
        checkoutRepository.deleteAllByBookId(bookId);
        bookRepository.deleteById(bookId);
    }

    public ChangeBookQuantityResponse increaseBookQuantity(Long bookId) throws Exception {
        Optional<Book> optional = bookRepository.findById(bookId);

        if (optional.isEmpty()) {
            throw new Exception("Book was not found");
        }

        Book book = optional.get();
        book.setCopies(book.getCopies() + 1);
        book.setCopiesAvailable(book.getCopiesAvailable() + 1);
        bookRepository.save(book);

        return new ChangeBookQuantityResponse(bookId, book.getCopies(), book.getCopiesAvailable());
    }

    public ChangeBookQuantityResponse decreaseBookQuantity(Long bookId) throws Exception {
        Optional<Book> optional = bookRepository.findById(bookId);

        if (optional.isEmpty()) {
            throw new Exception("Book was not found");
        }

        Book book = optional.get();
        if (book.getCopies() <= 0 || book.getCopiesAvailable() <= 0) {
            throw new Exception("Cannot decrease available copies below zero");
        }

        book.setCopies(book.getCopies() - 1);
        book.setCopiesAvailable(book.getCopiesAvailable() - 1);
        bookRepository.save(book);

        return new ChangeBookQuantityResponse(bookId, book.getCopies(), book.getCopiesAvailable());
    }

    public void postBook(AddBookRequest addBookRequest) {
        Book book = new Book();
        book.setTitle(addBookRequest.getTitle());
        book.setAuthor(addBookRequest.getAuthor());
        book.setDescription(addBookRequest.getDescription());
        book.setCopiesAvailable(addBookRequest.getCopies());
        book.setCopies(addBookRequest.getCopies());
        book.setCategory(addBookRequest.getCategory());
        book.setImage(addBookRequest.getImage());
        bookRepository.save(book);
    }
}
