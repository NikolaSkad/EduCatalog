import React from 'react';
import { Course } from '@/interface/course';
import { useNavigate } from 'react-router-dom';

const CourseCard: React.FC<Course> = ({ description, title, _id, image }) => {
  const navigate = useNavigate();

  const redirectToCardPage = () => {
    navigate(`/course/${_id}`);
  };

  return (
    <div className="card card-side bg-base-100 shadow-xl overflow-hidden">
      <img className="h-auto w-full object-cover max-w-[315px]" src={image} />
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className="line_clamp_2">{description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={redirectToCardPage}>
            Click for Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
