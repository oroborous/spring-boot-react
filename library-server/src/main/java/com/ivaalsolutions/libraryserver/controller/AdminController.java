package com.ivaalsolutions.libraryserver.controller;

import com.ivaalsolutions.libraryserver.requestmodels.AddBookRequest;
import com.ivaalsolutions.libraryserver.service.AdminService;
import com.ivaalsolutions.libraryserver.utils.ExtractJwt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    private AdminService adminService;

    private final String SUB = "\"sub\"";
    private final String USER_TYPE = "\"userType\"";
    private final String ADMIN = "admin";

    @PostMapping("/secure/add/book")
    public void postBook(@RequestHeader(value = "Authorization") String token,
                         @RequestBody AddBookRequest addBookRequest) throws Exception {
        String userEmail = ExtractJwt.payloadJwtExtraction(token, SUB);
        String admin = ExtractJwt.payloadJwtExtraction(token, USER_TYPE);

        if (admin == null || !admin.equals(ADMIN)) {
            throw new Exception("Administration page only");
        }

        adminService.postBook(addBookRequest);
    }
}
