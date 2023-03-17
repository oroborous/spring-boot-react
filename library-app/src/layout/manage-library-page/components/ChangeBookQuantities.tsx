import {useEffect, useState} from "react";
import BookModel from "../../../models/BookModel";
import {useOktaAuth} from "@okta/okta-react";
import {SpinnerLoading} from "../../utils/SpinnerLoading";
import {Pagination} from "../../utils/Pagination";
import {ChangeBook} from "./ChangeBook";

export const ChangeBookQuantities = () => {

    const {authState} = useOktaAuth();

    const [books, setBooks] = useState<BookModel[]>([]);
    // default is loading = true to show user app is working
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage, setBooksPerPage] = useState(5);
    const [totalAmountOfBooks, setTotalAmountOfBooks] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [bookDelete, setBookDelete] = useState(false);

    useEffect(() => {
        const fetchBooks = async () => {
            const url: string = `http://localhost:8080/api/books?page=${currentPage - 1}&size=${booksPerPage}`;

            const response = await fetch(url);

            if (!response.ok)
                throw new Error("Something went wrong");

            const responseJson = await response.json();

            const responseData = responseJson._embedded.books; // inner array of objects

            setTotalAmountOfBooks(responseJson.page.totalElements);
            setTotalPages(responseJson.page.totalPages);

            const loadedBooks: BookModel[] = [];

            for (const key in responseData) {
                loadedBooks.push(responseData[key]);
            }

            setBooks(loadedBooks);
            setIsLoading(false);
        };
        fetchBooks().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        });
    }, [currentPage, bookDelete]);

    const indexOfLastBook: number = currentPage * booksPerPage;
    const indexOfFirstBook: number = indexOfLastBook - booksPerPage;
    let lastItem = booksPerPage * currentPage <= totalAmountOfBooks ? booksPerPage * currentPage : totalAmountOfBooks;
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const deleteBook = () => setBookDelete(!bookDelete);

    if (isLoading) {
        return <SpinnerLoading/>
    }

    if (httpError) {
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            {totalAmountOfBooks > 0 ?
                <>
                    <div className="mt-3">
                        <h3>Number of results: {totalAmountOfBooks}</h3>
                    </div>
                    <p>{indexOfFirstBook + 1} to {totalAmountOfBooks}</p>
                    {books.map(book => (
                        <ChangeBook book={book} key={book.id}
                                    deleteBook={deleteBook}/>
                    ))
                    }
                </>
                :
                <h5>Add a book before changing quantities</h5>
            }
            {totalPages > 1 && <Pagination currentPage={currentPage}
                                           totalPages={totalPages}
                                           paginate={paginate}/>
            }
        </div>
    );
}