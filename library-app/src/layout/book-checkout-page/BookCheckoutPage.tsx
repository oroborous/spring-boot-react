import {useEffect, useState} from "react";
import BookModel from "../../models/BookModel";
import {SpinnerLoading} from "../utils/SpinnerLoading";
import {StarsReview} from "../utils/StarsReview";
import {CheckoutAndReviewBox} from "./CheckoutAndReviewBox";
import ReviewModel from "../../models/ReviewModel";

export const BookCheckoutPage = () => {

    const [book, setBook] = useState<BookModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    // Review state
    const [reviews, setReviews] = useState<ReviewModel[]>([]);
    const [totalStars, setTotalStars] = useState(0);
    const [isLoadingReview, setIsLoadingReview] = useState(true);

    const bookId = (window.location.pathname).split("/").pop();

    // Will be called initially, and when any of the [] variables changes
    useEffect(() => {
        const fetchBooks = async () => {
            const baseUrl: string = `http://localhost:8080/api/books/${bookId}`;

            const response = await fetch(baseUrl); // raw text

            if (!response.ok)
                throw new Error("Something went wrong");

            const responseJson = await response.json(); // JS object

            const loadedBook: BookModel = responseJson;

            setBook(loadedBook);
            setIsLoading(false);
        };
        fetchBooks().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, []);

    useEffect(() => {
        const fetchBookReviews = async () => {
            const reviewUrl: string = `http://localhost:8080/api/reviews/search/findByBookId?bookId=${bookId}`;
            const responseReviews = await fetch(reviewUrl);

            if (!responseReviews.ok)
                throw new Error("Something went wrong");

            const responseJsonReviews = await responseReviews.json();
            const responseData = responseJsonReviews._embedded.reviews;
            const loadedReviews: ReviewModel[] = [];
            let weightedStarReviews: number = 0;

            for (const key in responseData) {
                loadedReviews.push(responseData[key]);
                weightedStarReviews += responseData[key].rating;
            }

            if (loadedReviews) {
                const round = (weightedStarReviews / loadedReviews.length).toFixed(1);
                setTotalStars(Number(round));
            }

            setReviews(loadedReviews);
            setIsLoadingReview(false);
        };

        fetchBookReviews().catch((error: any) => {
            setIsLoadingReview(false);
            setHttpError(error.message);
        });
    }, []);

    if (isLoading || isLoadingReview) {
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
            <div className="container d-none d-lg-block">
                <div className="row mt-5">
                    <div className="col-sm-2 col-md-2">
                        {book?.image ?
                            <img src={book?.image} width="226" height="348" alt="book"/>
                            :
                            <img src={require("./../../images/books-images/book-luv2code-1000.png")}
                                 width="226" height="348" alt="book"/>
                        }
                    </div>
                    <div className="col-4 col-md-4 container">
                        <div className="ml-2">
                            <h2>{book?.title}</h2>
                            <h5 className="text-primary">{book?.author}</h5>
                            <p className="lead">{book?.description}</p>
                            <StarsReview rating={totalStars} size={32}/>
                        </div>
                    </div>
                    <CheckoutAndReviewBox book={book} mobile={false}/>
                </div>
                <hr/>
            </div>
            <div className="container d-lg-none mt-5">
                <div className="d-flex justify-content-center align-items-center">
                    {book?.image ?
                        <img src={book?.image} width="226" height="348" alt="book"/>
                        :
                        <img src={require("./../../images/books-images/book-luv2code-1000.png")}
                             width="226" height="348" alt="book"/>
                    }
                </div>
                <div className="mt-4">
                    <div className="ml-2">
                        <h2>{book?.title}</h2>
                        <h5 className="text-primary">{book?.author}</h5>
                        <p className="lead">{book?.description}</p>
                        <StarsReview rating={totalStars} size={32}/>
                    </div>
                </div>
                <CheckoutAndReviewBox book={book} mobile={true}/>
                <hr/>
            </div>
        </div>
    );
}