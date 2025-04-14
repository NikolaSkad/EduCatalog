import { useAuthStore } from '@/store/auth';
import EditReviewBtn from '../EditReviewBtn/EditReviewBtn';
import DeleteReviewBtn from '../DeleteReviewBtn/DeleteReviewBtn';
import ShowAt from '@/components/ShowAt/ShowAt';
import CollapsibleForm from '@/components/ColasibleForm/ColasibleForm';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ReviewInputs } from '../../AddReviewForm/AddReviewForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editReview } from '@/services/revirews';
import { AddReviewPayload, ReviewResponse } from '@/interface/revirews';
import { toast } from 'sonner';

const AdminReviewSection = ({
  reviewId,
  bootcampId,
  userId,
}: {
  reviewId: string;
  bootcampId: string;
  userId: string;
}) => {
  const { userInfo } = useAuthStore();
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm<ReviewInputs>({
    defaultValues: {
      rating: 5,
      text: '',
      title: '',
    },
  });

  const { mutate } = useMutation<ReviewResponse['data'], Error, AddReviewPayload>({
    mutationFn: (payload) => editReview(reviewId, payload),
  });

  const onError = (errorMsg: string) => {
    toast.error(errorMsg, { duration: 5000 });
  };

  const onSuccess = () => {
    toast.success(`You successfully edited this review!`);
    queryClient.invalidateQueries({ queryKey: ['reviews-for-bootcamp', bootcampId] });
    reset();
  };

  const onSubmit: SubmitHandler<ReviewInputs> = (data) => {
    // @ts-ignore
    mutate(data, { onError, onSuccess });
  };
  return (
    <ShowAt at={userInfo?.role === 'admin' || userInfo?._id === userId}>
      <div className="flex items-center gap-10 mx-auto">
        <CollapsibleForm onSubmit={handleSubmit(onSubmit)} title="Edit This Review">
          <div className="cards space-y-5">
            {/* Title Input */}
            <input
              type="text"
              placeholder="Review Title"
              {...register('title', { required: true })}
              className="input input-bordered w-full"
            />

            {/* Review Text */}

            <textarea
              placeholder="Review Text"
              {...register('text', { required: true })}
              className="w-full textarea textarea-bordered"
            />

            {/* Rating Input */}
            <div className="rating rating-md">
              {[...Array(5)].map((_, index) => (
                <input
                  key={index}
                  type="radio"
                  className="mask mask-star-2 bg-orange-400"
                  value={(index + 1) * 2}
                  {...register('rating')}
                />
              ))}
            </div>
          </div>
        </CollapsibleForm>
        <DeleteReviewBtn id={reviewId} bootcampId={bootcampId} />
      </div>
    </ShowAt>
  );
};

export default AdminReviewSection;
