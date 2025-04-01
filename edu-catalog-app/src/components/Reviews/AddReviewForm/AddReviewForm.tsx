import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addReviewForBootcamp } from '@/services/revirews';
import { AddReviewMutationPayload, Review } from '@/interface/revirews';
import { toast } from 'sonner';
import CollapsibleForm from '@/components/ColasibleForm/ColasibleForm';

interface AddReviewProps<T = any> {
  id: string;
}

export type ReviewInputs = {
  title: string;
  text: string;
  rating: number;
};

const AddReviewForm: React.FC<AddReviewProps> = ({ id }) => {
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm<ReviewInputs>({
    defaultValues: {
      title: '',
      text: '',
      rating: 2,
    },
  });

  const onError = (errorMsg: string) => {
    toast.error(errorMsg, { duration: 5000 });
  };
  const onSuccess = () => {
    toast.success('Your account has been successfully created');
    queryClient.invalidateQueries({ queryKey: ['reviews-for-bootcamp', id] });
  };

  const { mutate, data: review } = useMutation<Review, Error, AddReviewMutationPayload>({
    mutationFn: addReviewForBootcamp,
  });

  const onSubmit: SubmitHandler<ReviewInputs> = (data) => {
    mutate(
      {
        payload: {
          ...data,
          rating: data.rating.toString(),
        },
        id,
      },
      // @ts-ignore
      { onError, onSuccess },
    );
    reset();
  };

  return (
    <CollapsibleForm title="Add Your Review" actionName="Submit Review" onSubmit={handleSubmit(onSubmit)}>
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
  );
};

export default AddReviewForm;
