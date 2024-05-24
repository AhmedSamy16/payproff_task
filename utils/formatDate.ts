const formatDate = (isodate: string) => {
  const date = new Date(isodate);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = (date.getDate() + 1).toString().padStart(2, "0");
  const hours = (date.getHours() + 1).toString().padStart(2, "0");
  const minutes = (date.getMinutes() + 1).toString().padStart(2, "0");
  const seconds = (date.getSeconds() + 1).toString().padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export default formatDate;
