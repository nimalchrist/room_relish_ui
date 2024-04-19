/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {useState} from "react";
import {Container, Divider, Button} from "@mui/material";
import Review from "./Review";
import ReviewForm from "./ReviewForm";

const ListOfReviewsContainer = ({reviews, onReviewSubmit, loading}) => {
    // hooks
    const [currentPage, setCurrentPage] = useState(1);
    const reviewsPerPage = 4;
    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

    // handlers
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <Container sx={{py: 4}}>
            {currentReviews.map((review, index) => (
                <div key={index}>
                    <Review {...review} />
                    {index !== currentReviews.length - 1 && <Divider sx={{my: 2}}/>}
                </div>
            ))}
            <Button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                sx={{my: 2}}
            >
                Previous
            </Button>
            <Button
                disabled={indexOfLastReview >= reviews.length}
                onClick={() => handlePageChange(currentPage + 1)}
                sx={{my: 2, mx: 2}}
            >
                Next
            </Button>
            <ReviewForm onReviewSubmit={onReviewSubmit} loading={loading}/>
        </Container>
    );
};

export default ListOfReviewsContainer;
