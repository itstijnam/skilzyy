const formatToShortDate = (dateString) => {
  if (!dateString) return '';

  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
  const year = String(date.getFullYear()).slice(-2); // last 2 digits of year

  return `${day}/${month}/${year}`;
};


export default formatToShortDate;