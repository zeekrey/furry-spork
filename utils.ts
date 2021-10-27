export const groupBy = (data: {}[], attribute: string) => {
  return data.reduce((acc, curr) => {
    //   @ts-ignore for now
    if (!acc[curr[attribute]]) acc[curr[attribute]] = []; //If this type wasn't previously stored
    //   @ts-ignore for now
    acc[curr[attribute]].push(curr);
    return acc;
  }, {});
};

// @ts-ignore
export const fetcher = (...args) => fetch(...args).then((res) => res.json());
