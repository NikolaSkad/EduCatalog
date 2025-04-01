import clsx from 'clsx';

const ReviewStars = ({ rating }: { rating: number }) => {
  const maxRating = 10;
  const maxStars = 5;
  const ratioStarRating = maxRating / maxStars;
  const starsSelected = Math.round(+rating / ratioStarRating);

  return (
    <div className="rating rating-md mt-4 pointer-events-none">
      {[...Array(maxStars)].map((_, index) => (
        <input
          key={index}
          type="radio"
          name={`rating-${index}`}
          className={clsx('mask mask-star-2 bg-orange-400', { 'opacity-30': starsSelected <= index })}
          readOnly
        />
      ))}
    </div>
  );
};

export default ReviewStars;
