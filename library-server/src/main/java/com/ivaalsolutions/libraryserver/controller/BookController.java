package com.ivaalsolutions.libraryserver.controller;

import com.ivaalsolutions.libraryserver.entity.Book;
import com.ivaalsolutions.libraryserver.responsemodels.ShelfCurrentLoansResponse;
import com.ivaalsolutions.libraryserver.service.BookService;
import com.ivaalsolutions.libraryserver.utils.ExtractJwt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(value = "${allowed-origins}")
@RequestMapping("/api/books")
public class BookController {
    @Autowired
    private BookService bookService;

    // "sub" is subject of bearer token
    private final String SUB = "\"sub\"";

    @PutMapping("/secure/renew/loan")
    public void renewLoan(@RequestHeader(value="Authorization") String token,
                          @RequestParam Long bookId) throws Exception {
        String userEmail = ExtractJwt.payloadJwtExtraction(token, SUB);
        bookService.renewLoan(userEmail, bookId);
    }

    @PutMapping("/secure/return")
    public void returnBook(@RequestHeader(value="Authorization") String token,
                           @RequestParam Long bookId) throws Exception {
        String userEmail = ExtractJwt.payloadJwtExtraction(token, SUB);
        bookService.returnBook(userEmail, bookId);
    }

    @GetMapping("/secure/currentloans")
    public List<ShelfCurrentLoansResponse> currentLoans(@RequestHeader(value="Authorization") String token) throws Exception {
        String userEmail = ExtractJwt.payloadJwtExtraction(token, SUB);
        return bookService.currentLoans(userEmail);
    }

    @GetMapping("/secure/currentloans/count")
    public int currentLoansCount(@RequestHeader(value = "Authorization") String token) {
        String userEmail = ExtractJwt.payloadJwtExtraction(token, SUB); //"testuser@email.com";
        return bookService.currentLoansCount(userEmail);
    }

    @GetMapping("/secure/ischeckedout/byuser")
    public Boolean checkoutBookByUser(@RequestParam Long bookId,
                                      @RequestHeader(value = "Authorization") String token) {
        String userEmail = ExtractJwt.payloadJwtExtraction(token, SUB); //"testuser@email.com";
        return bookService.checkoutBookByUser(userEmail, bookId);
    }

    @PutMapping("/secure/checkout")
    public Book checkoutBook(@RequestParam Long bookId,
                             @RequestHeader(value = "Authorization") String token) throws Exception {
        String userEmail = ExtractJwt.payloadJwtExtraction(token, SUB); //"testuser@email.com";

        return bookService.checkoutBook(userEmail, bookId);
    }
}
