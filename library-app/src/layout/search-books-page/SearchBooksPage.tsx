import {useEffect, useState} from "react";
import BookModel from "../../models/BookModel";
import {SpinnerLoading} from "../utils/SpinnerLoading";
import {SearchBook} from "./components/SearchBook";

export const SearchBooksPage = () => {
    const [books, setBooks] = useState<BookModel[]>([]);
    // default is loading = true to show user app is working
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    // Will be called initially, and when any of the [] variables changes
    useEffect(() => {
        const fetchBooks = async () => {
            const baseUrl: string = "http://localhost:8080/api/books";
            const url: string = `${baseUrl}?page=0&size=5`;
            const response = await fetch(url); // raw text

            if (!response.ok)
                throw new Error("Something went wrong");

            const responseJson = await response.json(); // JS object

            const responseData = responseJson._embedded.books; // inner array of objects

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
        })
    }, []);

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
                        <h5>Number of results: (22)</h5>
                    </div>
                    <p>
                        1 to 5 of 22 items:
                    </p>
                    {
                        books.map(book => (
                            <SearchBook book={book} key={book.id}/>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}