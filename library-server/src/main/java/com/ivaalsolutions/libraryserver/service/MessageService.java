package com.ivaalsolutions.libraryserver.service;

import com.ivaalsolutions.libraryserver.dao.MessageRepository;
import com.ivaalsolutions.libraryserver.entity.Message;
import com.ivaalsolutions.libraryserver.requestmodels.AdminQuestionRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class MessageService {
    @Autowired
    private MessageRepository messageRepository;

    public void postMessage(Message messageRequest, String userEmail) {
        Message message = new Message(messageRequest.getTitle(),
                messageRequest.getQuestion());
        message.setUserEmail(userEmail);
        messageRepository.save(message);
    }

    public void putMessage(AdminQuestionRequest adminQuestionRequest,
                           String userEmail) throws Exception {
        Optional<Message> optional = messageRepository.findById(adminQuestionRequest.getId());
        if (optional.isEmpty()) {
            throw new Exception("Message not found");
        }

        Message message = optional.get();
        message.setAdminEmail(userEmail);
        message.setResponse(adminQuestionRequest.getResponse());
        message.setClosed(true);
        messageRepository.save(message);
    }
}
