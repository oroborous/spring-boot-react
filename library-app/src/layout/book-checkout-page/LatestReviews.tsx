import ReviewModel from "../../models/ReviewModel";
import {Link} from "react-router-dom";
import {Review} from "../utils/Review";

export const LatestReviews: React.FC<{
    reviews: ReviewModel[],
    bookId: number | undefined,
    mobile: boolean
}> = (props) => {
    return (
        <div className={props.mobile ? "mt-3" : "row mt-5"}>
            <div className={props.mobile ? "" : "col-sm-2 col-md-2"}>
                <h2>Latest Reviews: </h2>
            </div>
            <div className="col-sm-10 col-md-10">
                {props.reviews.length > 0 ?
                    <>
                        {
                            props.reviews.slice(0, 3).map(aReview =>
                                <Review review={aReview} key={aReview.id}/>
                            )
                        }

                        <div className="m-3">
                            <Link to={`/reviewlist/${props.bookId}`} type="button" className="btn main-color btn-md text-white">
                                Read all reviews
                            </Link>
                        </div>
                    </>
                    :
                    <div className="m-3">
                        <p className="lead">
                            Currently there are no reviews for this book
                        </p>
                    </div>
                }
            </div>
        </div>
    );
}