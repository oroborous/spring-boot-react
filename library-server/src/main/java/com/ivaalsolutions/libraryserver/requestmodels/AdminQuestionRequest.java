package com.ivaalsolutions.libraryserver.requestmodels;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AdminQuestionRequest {
    private Long id;
    private String response;
}
