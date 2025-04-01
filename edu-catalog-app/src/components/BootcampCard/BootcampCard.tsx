import React from 'react';
import clsx from 'clsx';
import { Bootcamp } from '@/interface/bootcamp';
import { useNavigate } from 'react-router-dom';
import ReviewStars from '../ReviewStars/ReviewStars';

const BootcampCard: React.FC<Bootcamp> = ({ description, name, averageRating, id, photo }) => {
  const navigate = useNavigate();

  const maxRating = 10;
  const maxStars = 5;
  const starsSelected = Math.round((averageRating / maxRating) * maxStars);

  const redirectToBootcampPage = () => {
    navigate(`/${id}`);
  };

  return (
    <div className="card card-compact bg-base-100 shadow-xl">
      <figure>
        <img src={photo} alt={name} className="w-full h-auto max-h-[480px] object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{description}</p>
        <div className="card-actions justify-between">
          <div className="rating rating-md  pointer-events-none">
            <ReviewStars rating={averageRating} />
          </div>
          <button className="btn btn-primary" onClick={redirectToBootcampPage}>
            Show Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default BootcampCard;
