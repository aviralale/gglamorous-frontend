import React, { useState } from "react";
import { useAuth } from "@/auth/AuthContext";
import { axiosInstance } from "@/auth/auth";
import BlackStarRating from "./BlackStarRating";

import { toast } from "react-toastify";

interface ReviewFormProps {
  productId: number;
  onReviewSubmitted: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  productId,
  onReviewSubmitted,
}) => {
  const { isLoggedIn } = useAuth();
  const [qualityRating, setQualityRating] = useState<number>(5);
  const [valueRating, setValueRating] = useState<number>(5);
  const [size, setSize] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setError("You must be logged in to submit a review.");
      toast.error("You must be logged in to submit a review.");
      return;
    }

    try {
      await axiosInstance.post("/reviews/", {
        product: productId,
        quality_rating: qualityRating,
        value_rating: valueRating,
        size,
        comment,
      });
      setError(null);
      setSuccess(true);
      onReviewSubmitted();
      toast.success("Review submitted successfully.");
    } catch (err: any) {
      setError(
        err.response?.data?.detail ||
          "An error occurred while submitting the review."
      );
      toast.error("An error occurred while submitting the review.");
      setSuccess(false);
    }
  };

  const handleQualityRatingChange = (
    _event: React.SyntheticEvent<Element, Event>,
    newValue: number | null
  ) => {
    if (newValue !== null) {
      setQualityRating(newValue);
    }
  };

  const handleValueRatingChange = (
    _event: React.SyntheticEvent<Element, Event>,
    newValue: number | null
  ) => {
    if (newValue !== null) {
      setValueRating(newValue);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <p>Quality:</p>
        <BlackStarRating
          name="quality_rating"
          value={qualityRating}
          readOnly={false}
          onChange={handleQualityRatingChange}
          size="small"
        />
      </div>
      <div className="flex items-center gap-2">
        <p>Value:</p>
        <BlackStarRating
          name="value_rating"
          value={valueRating}
          readOnly={false}
          onChange={handleValueRatingChange}
          size="small"
        />
      </div>
      <div className="flex items-center gap-2">
        <label htmlFor="size" className="font-medium">
          Size:
        </label>
        <input
          id="size"
          type="text"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="border border-black outline-none p-2 flex-1"
          placeholder="Enter your size"
        />
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="border border-black outline-none p-2 resize-none"
        placeholder="Write your review..."
      ></textarea>
      {error && <p className="text-red-500">{error}</p>}
      {success && (
        <p className="text-green-500">Review submitted successfully!</p>
      )}
      <button
        type="submit"
        className="uppercase bg-black text-white p-2 hover:bg-gray-800 transition-colors duration-200"
      >
        Submit a review
      </button>
    </form>
  );
};

export default ReviewForm;
