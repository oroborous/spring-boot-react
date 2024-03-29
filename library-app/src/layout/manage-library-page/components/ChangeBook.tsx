import BookModel from "../../../models/BookModel";
import {useEffect, useState} from "react";
import {useOktaAuth} from "@okta/okta-react";

export const ChangeBook: React.FC<{ book: BookModel, deleteBook: any }> = (props, key) => {
    const {authState} = useOktaAuth();

    const [quantity, setQuantity] = useState<number>(0);
    const [remaining, setRemaining] = useState<number>(0);

    useEffect(() => {
        const fetchBookInState = () => {
            props.book.copies ? setQuantity(props.book.copies) : setQuantity(0);
            props.book.copiesAvailable ? setRemaining(props.book.copiesAvailable) : setRemaining(0);
        };
        fetchBookInState();
    }, []);

    async function increaseQuantity() {
        const url = `${process.env.REACT_APP_API}/admin/secure/increase/book/quantity?bookId=${props.book?.id}`;

        if (authState && authState.isAuthenticated) {
            const requestOptions = {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${authState?.accessToken?.accessToken}`
                }
            };
            const increaseQuantityResponse = await fetch(url, requestOptions);
            if (!increaseQuantityResponse.ok) {
                throw new Error("Something went wrong");
            }

            const increaseQuantityResponseJson = await increaseQuantityResponse.json();

            setQuantity(increaseQuantityResponseJson.copies);
            setRemaining(increaseQuantityResponseJson.copiesAvailable);
        }
    }

    async function decreaseQuantity() {
        const url = `${process.env.REACT_APP_API}/admin/secure/decrease/book/quantity?bookId=${props.book?.id}`;

        if (authState && authState.isAuthenticated) {
            const requestOptions = {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${authState?.accessToken?.accessToken}`
                }
            };
            const decreaseQuantityResponse = await fetch(url, requestOptions);
            if (!decreaseQuantityResponse.ok) {
                throw new Error("Something went wrong");
            }

            const decreaseQuantityResponseJson = await decreaseQuantityResponse.json();

            setQuantity(decreaseQuantityResponseJson.copies);
            setRemaining(decreaseQuantityResponseJson.copiesAvailable);
        }
    }

    async function deleteBook() {
        const url = `${process.env.REACT_APP_API}/admin/secure/delete/book?bookId=${props.book?.id}`;

        if (authState && authState.isAuthenticated) {
            const requestOptions = {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${authState?.accessToken?.accessToken}`
                }
            };
            const updateResponse = await fetch(url, requestOptions);
            if (!updateResponse.ok) {
                throw new Error("Something went wrong");
            }

            props.deleteBook();
        }
    }

    return (
        <div className="card mt-3 shadow p-3 mb-3 bg-body rounded">
            <div className="row g-0">
                <div className="col-md-2">
                    <div className="d-none d-lg-block">
                        {props.book.image ?
                            <img src={props.book.image} width="123" height="196" alt="book"/>
                            :
                            <img src={require("./../../../images/books-images/book-luv2code-1000.png")} width="123"
                                 height="196" alt="book"/>
                        }
                    </div>
                    <div className="d-lg-none d-flex justify-content-center align-items-center">
                        {props.book.image ?
                            <img src={props.book.image} width="123" height="196" alt="book"/>
                            :
                            <img src={require("./../../../images/books-images/book-luv2code-1000.png")} width="123"
                                 height="196" alt="book"/>
                        }
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card-body">
                        <h5 className="card-title">{props.book.author}</h5>
                        <h4>{props.book.title}</h4>
                        <p className="card-text">{props.book.description}</p>
                    </div>
                </div>
                <div className="mt-3 col-md-4">
                    <div className="d-flex justify-content-center align-items-center">
                        <p>Total Quantity: <b>{quantity}</b></p>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        <p>Books Remaining: <b>{remaining}</b></p>
                    </div>
                </div>
                <div className="mt-3 col-md-1">
                    <div className="d-flex justify-content-start">
                        <button className="m-1 btn btn-md btn-danger"
                                onClick={deleteBook}>Delete
                        </button>
                    </div>
                </div>
                <button className="m-1 btn btn-md main-color text-white"
                        onClick={increaseQuantity}>Add Quantity
                </button>
                <button className={quantity <= 0 ? "m-1 btn btn-md btn-warning disabled" : "m-1 btn btn-md btn-warning"}
                        onClick={decreaseQuantity}>Decrease Quantity
                </button>
            </div>
        </div>
    );
}