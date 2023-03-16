package com.ivaalsolutions.libraryserver.controller;

import com.ivaalsolutions.libraryserver.entity.Message;
import com.ivaalsolutions.libraryserver.requestmodels.AdminQuestionRequest;
import com.ivaalsolutions.libraryserver.service.MessageService;
import com.ivaalsolutions.libraryserver.utils.ExtractJwt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/messages")
public class MessageController {
    @Autowired
    private MessageService messageService;

    private final String SUB = "\"sub\"";
    private final String USER_TYPE = "\"userType\"";
    private final String ADMIN = "admin";

    @PostMapping("/secure/add/message")
    public void postMessage(@RequestHeader(value = "Authorization") String token,
                            @RequestBody Message messageRequest) {
        String userEmail = ExtractJwt.payloadJwtExtraction(token, SUB);
        messageService.postMessage(messageRequest, userEmail);
    }

    @PutMapping("/secure/admin/message")
    public void putMessage(@RequestHeader(value = "Authorization") String token,
                           @RequestBody AdminQuestionRequest adminQuestionRequest) throws Exception {
        String userEmail = ExtractJwt.payloadJwtExtraction(token, SUB);
        String admin = ExtractJwt.payloadJwtExtraction(token, USER_TYPE);

        if (admin == null || !admin.equals(ADMIN)) {
            throw new Exception("Administration page only");
        }

        messageService.putMessage(adminQuestionRequest, userEmail);
    }
}
