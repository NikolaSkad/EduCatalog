export const wait = (ms = 300) =>
  new Promise((res, rej) => {
    setTimeout(() => {
      res(null);
    }, ms);
  });
