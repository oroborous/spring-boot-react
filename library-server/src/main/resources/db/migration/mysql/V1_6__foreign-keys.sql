alter table checkout add foreign key (book_id) references book(id);

alter table review add foreign key (book_id) references book(id);