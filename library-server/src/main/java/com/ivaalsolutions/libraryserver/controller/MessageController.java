package com.ivaalsolutions.libraryserver.controller;

import com.ivaalsolutions.libraryserver.entity.Message;
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

    @PostMapping("/secure/add/message")
    public void postMessage(@RequestHeader("Authorization") String token,
                            @RequestBody Message messageRequest) {
        String userEmail = ExtractJwt.payloadJwtExtraction(token, SUB);
        messageService.postMessage(messageRequest, userEmail);
    }
}
