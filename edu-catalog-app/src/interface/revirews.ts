import { AtLeastOne } from './bootcamp';
import { WithError, WithSuccess } from './fetch';

export interface Review {
  _id: string;
  title: string;
  text: string;
  rating: number;
  bootcamp: string;
  user: string;
  createdAt: string;
  __v: number;
}

export interface AllReviewsResponse extends WithSuccess, WithError {
  data: Review[];
}

export interface ReviewResponse extends WithSuccess, WithError {
  data: Review;
}

export interface AddReviewPayload {
  title: string;
  text: string;
  rating: string;
}

export interface AddReviewMutationPayload {
  payload: AddReviewPayload;
  id: string;
}

export type EditReviewPayloadWithOneRequired = AtLeastOne<AddReviewPayload>;
