export const formatDate = (originalDate) => {
  const date = new Date(originalDate)
  const options = { day: '2-digit', month: 'short', year: 'numeric' }
  const formattedDate = date.toLocaleDateString('en-US', options)
  return formattedDate
}
