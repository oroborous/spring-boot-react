package com.ivaalsolutions.libraryserver.controller;

import com.ivaalsolutions.libraryserver.entity.Book;
import com.ivaalsolutions.libraryserver.service.BookService;
import com.ivaalsolutions.libraryserver.utils.ExtractJwt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/books")
public class BookController {
    @Autowired
    private BookService bookService;

    @GetMapping("/secure/currentloans/count")
    public int currentLoansCount(@RequestHeader(value = "Authorization") String token) {
        String userEmail = "testuser@email.com";
        return bookService.currentLoansCount(userEmail);
    }

    @GetMapping("/secure/ischeckedout/byuser")
    public Boolean checkoutBookByUser(@RequestParam Long bookId,
                                      @RequestHeader(value = "Authorization") String token) {
        String userEmail = ExtractJwt.payloadJwtExtraction(token); //"testuser@email.com";
        return bookService.checkoutBookByUser(userEmail, bookId);
    }

    @PutMapping("/secure/checkout")
    public Book checkoutBook(@RequestParam Long bookId,
                             @RequestHeader(value = "Authorization") String token) throws Exception {
        String userEmail = "testuser@email.com";

        return bookService.checkoutBook(userEmail, bookId);
    }
}
