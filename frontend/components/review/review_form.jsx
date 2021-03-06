import React, { useEffect, useState } from "react";
import NavBarShowContainer from "../nav_bar/navbar_show_container";
import { LOGOUT_CURRENT_USER } from "../../actions/session_actions";
import { Link, Redirect } from "react-router-dom";

const ReviewForm = props => {
    // debugger
    const { business, reviews, action, currentUser, businessId, formType, fetchBusiness, history, review } = props;
    const placeholder = "Your review helps others learn about great local businesses.\n\nPlease don't review this business if you received a freebie for writing this review, or if you're connected in any way to the owner or employees.";
    const options = ["Select your rating", "Eek! Me thinks not.", "Meh. I've experienced better.", "A-OK", "Yay! I'm a fan.", "Woohoo! As good as it gets!"];
    const [rating, setRating] = useState(0);
    const [content, setContent] = useState("");


    if (!business) {
        return null
    } else if (!currentUser) {
        <Redirect to={`/businesses/${businessId}`} />
    }


    useEffect(() => {
        if (business && formType === "Create Review") {
            currentUserReview()
        } else if (business && formType === "Update Review") {
            setContent(review.content);
            setRating(review.rating);
        }
    }, [])

    const mouseEnter = index => {
        return () => {
            starListClass(index);
            ratingTextContent(index);
        };
    }

    const mouseLeave = () => {
        return () => {
            starListClass(rating);
            ratingTextContent(rating);
        };
    }



    const currentUserReview = () => {
        let foundReview = false;
        reviews.forEach(review => {
            if (!foundReview && review.user_id === currentUser) {
                history.push(`/businesses/${businessId}/reviews/${review.id}`);
                foundReview = true;
            }
        })
    }

    const ratingTextContent = index => {
        const options = ["Select your rating", "Eek! Methinks not.", "Meh. I've experienced better.", "A-OK", "Yay! I'm a fan.", "Woohoo! As good as it gets!"];
        const element = document.getElementById("rating-text");
        element.innerHTML = options[index];
    }



    const starListClass = index => {
        const element = document.getElementById("starlist");
        const lastClass = element.classList[element.classList.length - 1];
        element.classList.remove(lastClass);
        element.classList.add("stars-extra-large-" + index);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        action({
            content: content,
            rating: rating,
            user_id: currentUser,
            business_id: businessId,
        })
            .then(() =>
                history.push(`/businesses/${businessId}`)
            );
    }

    const update = field => {
        return e => {
            if (field === "content") setContent(e.target.value);
            else setRating(e.target.value)
        }
    }

    const render = (
        <div>
            <NavBarShowContainer type="review-form" />
            <div className="review-container">
                <div className="review-title-container">
                    <Link
                        to={`/businesses/${businessId}`}
                        className="review-title"
                    >
                        {business.business_name}
                    </Link>
                </div>
                <form onSubmit={onSubmit}>
                    <div className="review-form-stars">
                        <ul
                            id="starlist"
                            className={`review-form-stars-list stars-extra-large stars-extra-large-${rating}`}
                        >
                            <li
                                className="review-form-stars-container"
                                onMouseEnter={mouseEnter(1)}
                                onMouseLeave={mouseLeave()}
                            >
                                <input
                                    type="radio"
                                    name="stars-input"
                                    value="1"
                                    onChange={update("rating")}
                                    className="review-form-stars-input"
                                />
                            </li>
                            <li
                                className="review-form-stars-container"
                                onMouseEnter={mouseEnter(2)}
                                onMouseLeave={mouseLeave()}
                            >
                                <input
                                    type="radio"
                                    name="stars-input"
                                    value="2"
                                    onChange={update("rating")}
                                    className="review-form-stars-input"
                                />
                            </li>
                            <li
                                className="review-form-stars-container"
                                onMouseEnter={mouseEnter(3)}
                                onMouseLeave={mouseLeave()}
                            >
                                <input
                                    type="radio"
                                    name="stars-input"
                                    value="3"
                                    onChange={update("rating")}
                                    className="review-form-stars-input"
                                />
                            </li>
                            <li
                                className="review-form-stars-container"
                                onMouseEnter={mouseEnter(4)}
                                onMouseLeave={mouseLeave()}
                            >
                                <input
                                    type="radio"
                                    name="stars-input"
                                    value="4"
                                    onChange={update("rating")}
                                    className="review-form-stars-input"
                                />
                            </li>
                            <li
                                className="review-form-stars-container"
                                onMouseEnter={mouseEnter(5)}
                                onMouseLeave={mouseLeave()}
                            >
                                <input
                                    type="radio"
                                    name="stars-input"
                                    value="5"
                                    onChange={update("rating")}
                                    className="review-form-stars-input"
                                />
                            </li>
                        </ul>
                        <span className="review-form-stars-description">
                            <p id="rating-text">{options[rating]}</p>
                        </span>
                    </div>
                    <textarea
                        className="review-content"
                        cols="80"
                        rows="20"
                        placeholder={placeholder}
                        onChange={update("content")}
                        value={content}
                    />
                    <div className="formSubmit">
                        <input
                            className="review-submit"
                            type="submit"
                            value={props.formType}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
    return render;
}


export default ReviewForm;