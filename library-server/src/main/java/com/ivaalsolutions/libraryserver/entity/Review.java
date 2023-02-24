package com.ivaalsolutions.libraryserver.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name="review")
@Data
@NoArgsConstructor
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="user_email")
    private String userEmail;

    @Column(name="date")
    @CreationTimestamp
    private LocalDateTime date;

    @Column(name="rating")
    private double rating;

    @Column(name="book_id")
    private Long bookId;

    @Column(name="review_description")
    private String description;
}
