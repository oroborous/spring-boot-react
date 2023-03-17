package com.ivaalsolutions.libraryserver.responsemodels;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ChangeBookQuantityResponse {
    private Long bookId;
    private int copies;
    private int copiesAvailable;

    public ChangeBookQuantityResponse(Long bookId, int copies, int copiesAvailable) {
        this.bookId = bookId;
        this.copies = copies;
        this.copiesAvailable = copiesAvailable;
    }
}
