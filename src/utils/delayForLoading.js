const delayForLoading = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};
export default delayForLoading;
