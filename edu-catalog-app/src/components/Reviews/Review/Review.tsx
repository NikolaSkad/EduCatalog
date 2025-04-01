import ReviewStars from '@/components/ReviewStars/ReviewStars';
import { Review as IReview } from '@/interface/revirews';
import React from 'react';

import AdminReviewSection from './AdminReviewSection/AdminReviewSection';

interface IExtendedReviewProps extends IReview {
  bootcampId: string;
}

const Review: React.FC<IExtendedReviewProps> = ({ _id, rating, text, title, bootcampId }) => {
  return (
    <div key={_id} className="card bg-base-300 shadow-xl p-4">
      <div className="card-body">
        <h2 className="card-title text-lg font-bold">{title}</h2>
        <p className="text-gray-600">{text}</p>
        <ReviewStars rating={rating} />
        <AdminReviewSection id={_id} bootcampId={bootcampId} />
      </div>
    </div>
  );
};

export default Review;
