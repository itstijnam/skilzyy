// Utility function to format a date string
function useFormatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  return date.toLocaleDateString('en-GB', options);
}

export default useFormatDate