import {useEffect, useState} from "react";
import BookModel from "../../models/BookModel";
import {SpinnerLoading} from "../utils/SpinnerLoading";
import {SearchBook} from "./components/SearchBook";
import {Pagination} from "../utils/Pagination";

export const SearchBooksPage = () => {
    const [books, setBooks] = useState<BookModel[]>([]);
    // default is loading = true to show user app is working
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage, setBooksPerPage] = useState(5);
    const [totalAmountOfBooks, setTotalAmountOfBooks] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    // Will be called initially, and when any of the [] variables changes
    useEffect(() => {
        const fetchBooks = async () => {
            const baseUrl: string = "http://localhost:8080/api/books";
            const url: string = `${baseUrl}?page=${currentPage - 1}&size=${booksPerPage}`;
            const response = await fetch(url); // raw text

            if (!response.ok)
                throw new Error("Something went wrong");

            const responseJson = await response.json(); // JS object

            const responseData = responseJson._embedded.books; // inner array of objects

            setTotalAmountOfBooks(responseJson.page.totalElements);
            setTotalPages(responseJson.page.totalPages);

            const loadedBooks: BookModel[] = [];

            for (const key in responseData) {
                loadedBooks.push(responseData[key]);
                // TODO: Why go through all the below?
                // loadedBooks.push({
                //     id: responseData[key].id,
                //     title: responseData[key].title,
                //     author: responseData[key].author,
                //     description: responseData[key].description,
                //     copies: responseData[key].copies,
                //     copiesAvailable: responseData[key].copiesAvailable,
                //     category: responseData[key].category,
                //     image: responseData[key].image
                // });
            }

            setBooks(loadedBooks);
            setIsLoading(false);
        };
        fetchBooks().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        });
        window.scrollTo(0,0);
    }, [currentPage]);

    if (isLoading) {
        return (
            <SpinnerLoading/>
        );
    }

    if (httpError) {
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        );
    }

    const indexOfLastBook: number = currentPage * booksPerPage;
    const indexOfFirstBook: number = indexOfLastBook - booksPerPage;
    let lastItem = booksPerPage * currentPage <= totalAmountOfBooks ? booksPerPage * currentPage : totalAmountOfBooks;
    // function to pass to Pagination component to allow it to manipulate
    // the displayed books
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div>
            <div className="container">
                <div>
                    <div className="row mt-5">
                        <div className="col-6">
                            <div className="d-flex">
                                <input type="search" className="form-control me-2"
                                       placeholder="search" aria-labelledby="Search"/>
                                <button className="btn btn-outline-success">Search</button>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle"
                                        type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown"
                                        aria-expanded="false">Category
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li>
                                        <a href="#" className="dropdown-item">All</a>
                                    </li>
                                    <li>
                                        <a href="#" className="dropdown-item">Front End</a>
                                    </li>
                                    <li>
                                        <a href="#" className="dropdown-item">Back End</a>
                                    </li>
                                    <li>
                                        <a href="#" className="dropdown-item">Data</a>
                                    </li>
                                    <li>
                                        <a href="#" className="dropdown-item">DevOps</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3">
                        <h5>Number of results: ({totalAmountOfBooks})</h5>
                    </div>
                    <p>
                        {indexOfFirstBook + 1} to {lastItem} of {totalAmountOfBooks} items:
                    </p>
                    {
                        books.map(book => (
                            <SearchBook book={book} key={book.id}/>
                        ))
                    }
                    {totalPages > 1 &&
                        <Pagination currentPage={currentPage}
                                    totalPages={totalPages}
                                    paginate={paginate}/>
                    }
                </div>
            </div>
        </div>
    );
}