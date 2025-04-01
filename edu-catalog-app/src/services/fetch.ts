import { getJwtFromLocalStorage } from './localstorage';

interface AvdancedRequestInit extends RequestInit {
  isAuthed?: boolean;
}

export const _fetch = async <T = any>(url: string, params?: AvdancedRequestInit): Promise<T> => {
  return new Promise(async (resolve, reject) => {
    try {
      let token = null;

      if (params?.isAuthed) {
        token = getJwtFromLocalStorage();
        if (!token) return;
      }

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token || 'GUEST'}`,
        ...params?.headers,
      };

      const passedParams = {
        method: 'GET',
        ...params,
        headers,
      };

      const response = await fetch(url, passedParams);

      if (!response.ok) {
        // Reject with the status text if the response isn't successful
        const res = await response.json();
        reject(res?.error || 'Unknown error occurred');
        return;
      }

      const res = await response.json();

      // Check if the response has an expected format (custom logic)
      if (!res || !res.success || !response.ok) {
        reject(res?.error || 'Unknown error occurred');
        return;
      }

      // Resolve with the data
      resolve(res);
    } catch (error) {
      reject(error); // In case of network errors
    }
  });
};
