import config from '@/config/config.json';
import { _fetch } from './fetch';
import {
  AllBootcampsResponse,
  BootcampResponse,
  CreateBootcampPayload,
  EditBootcampPayloadWithOneRequired,
} from '@/interface/bootcamp';

// 4
// GET BOOTCAMPS

export const getAllBootcamps = async (): Promise<AllBootcampsResponse['data']> => {
  const FETCH_ALL_BOOTCAMPS_URL = `${config.API_URL}/bootcamps`;
  const { data: bootcamps } = await _fetch<AllBootcampsResponse>(FETCH_ALL_BOOTCAMPS_URL);
  return bootcamps;
};

export const getBootcampById = async (id: string): Promise<BootcampResponse['data']> => {
  const FETCH_BOOTCAMP_URL = `${config.API_URL}/bootcamps/${id}`;
  const { data: bootcamp } = await _fetch<BootcampResponse>(FETCH_BOOTCAMP_URL);
  return bootcamp;
};

export const getBootcampsForPublisher = async (): Promise<AllBootcampsResponse['data']> => {
  const FETCH_BOOTCAMP_URL = `${config.API_URL}/bootcamps/me`;
  const { data: bootcamps } = await _fetch<AllBootcampsResponse>(FETCH_BOOTCAMP_URL, { isAuthed: true });
  return bootcamps;
};

// CRUD BOOTCAMP

export const createBootcamp = async (payload: CreateBootcampPayload): Promise<BootcampResponse['data']> => {
  const body = JSON.stringify(payload);

  const CREATE_BOOTCAMP_URL = `${config.API_URL}/bootcamps`;
  const { data: newBootcamp } = await _fetch<BootcampResponse>(CREATE_BOOTCAMP_URL, {
    method: 'POST',
    body,
    isAuthed: true,
  });

  return newBootcamp;
};

export const editBootcamp = async (
  id: string,
  payload: EditBootcampPayloadWithOneRequired,
): Promise<BootcampResponse['data']> => {
  const body = JSON.stringify(payload);

  const EDIT_BOOTCAMP_URL = `${config.API_URL}/bootcamps/${id}`;
  const { data: editedBootcamp } = await _fetch<BootcampResponse>(EDIT_BOOTCAMP_URL, {
    method: 'PUT',
    body,
    isAuthed: true,
  });
  return editedBootcamp;
};

export const deleteBootcamp = async (id: string) => {
  const EDIT_BOOTCAMP_URL = `${config.API_URL}/bootcamps/${id}`;
  await _fetch<BootcampResponse>(EDIT_BOOTCAMP_URL, {
    method: 'DELETE',
    isAuthed: true,
  });
};
