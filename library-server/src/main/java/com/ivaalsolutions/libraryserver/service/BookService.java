package com.ivaalsolutions.libraryserver.service;

import com.ivaalsolutions.libraryserver.dao.BookRepository;
import com.ivaalsolutions.libraryserver.dao.CheckoutRepository;
import com.ivaalsolutions.libraryserver.entity.Book;
import com.ivaalsolutions.libraryserver.entity.Checkout;
import com.ivaalsolutions.libraryserver.responsemodels.ShelfCurrentLoansResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@Transactional
public class BookService {
    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private CheckoutRepository checkoutRepository;

    public int currentLoansCount(String userEmail) {
        return checkoutRepository.findByUserEmail(userEmail).size();
    }

    public List<ShelfCurrentLoansResponse> currentLoans(String userEmail) throws Exception {
        List<ShelfCurrentLoansResponse> list = new ArrayList<>();

        List<Checkout> checkoutList = checkoutRepository.findByUserEmail(userEmail);

        List<Long> bookIdList = checkoutList.stream().map(Checkout::getBookId).toList();
        List<Book> bookList = bookRepository.findAllById(bookIdList);

        DateTimeFormatter dateFormat = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        for (Book book : bookList) {
            Checkout checkout = checkoutList.stream().filter(co -> Objects.equals(co.getBookId(), book.getId())).findFirst().orElse(null);
            if (checkout != null) {
                LocalDate dueDate = LocalDate.parse(checkout.getReturnDate(), dateFormat);
                int daysLeft = Period.between(dueDate, LocalDate.now()).getDays();
                list.add(new ShelfCurrentLoansResponse(book, daysLeft));
            }
        }
        return list;
    }
    public boolean checkoutBookByUser(String userEmail, Long bookId) {
        Checkout validateCheckout = checkoutRepository.findByUserEmailAndBookId(userEmail, bookId);

        if (validateCheckout != null)
            return true;
        else
            return false;
    }

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
