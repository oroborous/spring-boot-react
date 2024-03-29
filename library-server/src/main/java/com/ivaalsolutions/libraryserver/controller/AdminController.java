package com.ivaalsolutions.libraryserver.controller;

import com.ivaalsolutions.libraryserver.requestmodels.AddBookRequest;
import com.ivaalsolutions.libraryserver.responsemodels.ChangeBookQuantityResponse;
import com.ivaalsolutions.libraryserver.service.AdminService;
import com.ivaalsolutions.libraryserver.utils.ExtractJwt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(value = "${allowed-origins}")
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    private AdminService adminService;

    private final String SUB = "\"sub\"";
    private final String USER_TYPE = "\"userType\"";
    private final String ADMIN = "admin";

    @DeleteMapping("/secure/delete/book")
    public void deleteBook(@RequestHeader(value = "Authorization") String token,
                           @RequestParam(name = "bookId") Long bookId) throws Exception {
        String admin = ExtractJwt.payloadJwtExtraction(token, USER_TYPE);

        if (admin == null || !admin.equals(ADMIN)) {
            throw new Exception("Administration page only");
        }

        adminService.deleteBook(bookId);
    }

    @PutMapping("/secure/increase/book/quantity")
    public ChangeBookQuantityResponse increaseBookQuantity(@RequestHeader(value = "Authorization") String token,
                                                           @RequestParam(name = "bookId") Long bookId) throws Exception {
        String admin = ExtractJwt.payloadJwtExtraction(token, USER_TYPE);

        if (admin == null || !admin.equals(ADMIN)) {
            throw new Exception("Administration page only");
        }

        return adminService.increaseBookQuantity(bookId);
    }

    @PutMapping("/secure/decrease/book/quantity")
    public ChangeBookQuantityResponse decreaseBookQuantity(@RequestHeader(value = "Authorization") String token,
                                                           @RequestParam(name = "bookId") Long bookId) throws Exception {
        String admin = ExtractJwt.payloadJwtExtraction(token, USER_TYPE);

        if (admin == null || !admin.equals(ADMIN)) {
            throw new Exception("Administration page only");
        }

        return adminService.decreaseBookQuantity(bookId);
    }

    @PostMapping("/secure/add/book")
    public void postBook(@RequestHeader(value = "Authorization") String token,
                         @RequestBody AddBookRequest addBookRequest) throws Exception {
        String admin = ExtractJwt.payloadJwtExtraction(token, USER_TYPE);

        if (admin == null || !admin.equals(ADMIN)) {
            throw new Exception("Administration page only");
        }

        adminService.postBook(addBookRequest);
    }
}
