import { getReviewsForBootcamp } from '@/services/revirews';
import { useQuery } from '@tanstack/react-query';
import Review from './Review/Review';
import AddReviewForm from './AddReviewForm/AddReviewForm';
import ShowAt from '../ShowAt/ShowAt';
import { useAuthStore } from '@/store/auth';

const Reviews = ({ id }: { id: string }) => {
  const { data: reviews } = useQuery({
    queryKey: ['reviews-for-bootcamp', id],
    queryFn: () => getReviewsForBootcamp(id),
  });

  const { userInfo } = useAuthStore();

  return (
    <div className="space-y-4 pt-8">
      <h2 className="text-3xl font-semibold py-">Reviews</h2>
      <ShowAt at={!!userInfo?._id}>
        <AddReviewForm id={id} />
      </ShowAt>
      {reviews?.map((review) => <Review {...review} bootcampId={id} />)}
    </div>
  );
};

export default Reviews;
