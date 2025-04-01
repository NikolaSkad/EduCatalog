import config from '@/config/config.json';
import { _fetch } from './fetch';
import { AllBootcampsResponse, BootcampResponse, EditBootcampPayloadWithOneRequired } from '@/interface/bootcamp';

// 4

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
