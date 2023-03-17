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
    const [search, setSearch] = useState("");
    const [searchUrl, setSearchUrl] = useState("");
    const [categorySelection, setCategorySelection] = useState("Book category");

    // Will be called initially, and when any of the [] variables changes
    useEffect(() => {
        const fetchBooks = async () => {
            const baseUrl: string = `${process.env.REACT_APP_API}/books`;
            let url: string = "";

            if (searchUrl) {
                let searchWithPage = searchUrl.replace("<pageNumber>", `${currentPage - 1}`);
                url = baseUrl + searchWithPage;
            } else {
                url = `${baseUrl}?page=${currentPage - 1}&size=${booksPerPage}`;
            }

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
        window.scrollTo(0, 0);
    }, [currentPage, searchUrl]);

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

    const searchHandleChange = () => {
        setCurrentPage(1);
        if (search) {
            setSearchUrl(`/search/findByTitleContaining?title=${search}&page=<pageNumber>&size=${booksPerPage}`)
        } else {
            setSearchUrl("");
        }
        setCategorySelection("Book category");
    }

    const categoryField = (value: string) => {
        setCurrentPage(1);
        setCategorySelection(value);
        if (value !== "All") {
            setSearchUrl(`/search/findByCategory?category=${value}&page=<pageNumber>&size=${booksPerPage}`)
        } else {
            setSearchUrl(`?page=<pageNumber>&size=${booksPerPage}`)
        }
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
                                       placeholder="search" aria-label="Search"
                                       onChange={e => setSearch(e.target.value)}/>
                                <button className="btn btn-outline-success"
                                        onClick={() => searchHandleChange()}>Search
                                </button>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle"
                                        type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown"
                                        aria-expanded="false">{categorySelection}
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li onClick={() => categoryField("All")}>
                                        <a href="#" className="dropdown-item">All</a>
                                    </li>
                                    <li onClick={() => categoryField("FE")}>
                                        <a href="#" className="dropdown-item">Front End</a>
                                    </li>
                                    <li onClick={() => categoryField("BE")}>
                                        <a href="#" className="dropdown-item">Back End</a>
                                    </li>
                                    <li onClick={() => categoryField("Data")}>
                                        <a href="#" className="dropdown-item">Data</a>
                                    </li>
                                    <li onClick={() => categoryField("DevOps")}>
                                        <a href="#" className="dropdown-item">DevOps</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {totalAmountOfBooks > 0 ?
                        <>
                            <div className="mt-3">
                                <h5>Number of results: ({totalAmountOfBooks})</h5>
                            </div>
                            <p>
                                {indexOfFirstBook + 1} to {lastItem} of {totalAmountOfBooks} items:
                            </p>
                        </>
                        :
                        <div className="m-5">
                            <h3>
                                Can't find what you're looking for?
                            </h3>
                            <a href="#" type="button" className="btn main-color btn-md px-4 me-md-2 fw-bold text-white">
                                Library Services
                            </a>
                        </div>
                    }
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