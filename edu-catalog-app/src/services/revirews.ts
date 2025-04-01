import config from '@/config/config.json';
import { _fetch } from './fetch';
import {
  AddReviewMutationPayload,
  AllReviewsResponse,
  EditReviewPayloadWithOneRequired,
  ReviewResponse,
} from '@/interface/revirews';

// 4

export const addReviewForBootcamp = async ({
  payload,
  id,
}: AddReviewMutationPayload): Promise<ReviewResponse['data']> => {
  const body = JSON.stringify(payload);

  const CREATE_REVIEW_URL = `${config.API_URL}/bootcamps/${id}/reviews`;
  const { data: review } = await _fetch<ReviewResponse>(CREATE_REVIEW_URL, {
    method: 'POST',
    isAuthed: true,
    body,
  });
  return review;
};
export const getReviewsForBootcamp = async (id: string): Promise<AllReviewsResponse['data']> => {
  const FETCH_REVIEWS_FOR_BOOTCAMP_URL = `${config.API_URL}/bootcamps/${id}/reviews`;
  const { data: reviews } = await _fetch<AllReviewsResponse>(FETCH_REVIEWS_FOR_BOOTCAMP_URL);
  return reviews;
};

export const editReview = async (
  id: string,
  payload: EditReviewPayloadWithOneRequired,
): Promise<ReviewResponse['data']> => {
  const body = JSON.stringify(payload);

  const EDIT_REVIEW_URL = `${config.API_URL}/reviews/${id}`;
  const { data: editedReview } = await _fetch<ReviewResponse>(EDIT_REVIEW_URL, {
    method: 'PUT',
    body,
    isAuthed: true,
  });
  return editedReview;
};

export const deleteReview = async (id: string) => {
  const DELETE_REWIEW_URL = `${config.API_URL}/reviews/${id}`;
  await _fetch(DELETE_REWIEW_URL, {
    method: 'DELETE',
    isAuthed: true,
  });
};
