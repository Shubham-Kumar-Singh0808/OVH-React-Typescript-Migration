export const getDateTimeFromTimestamp = (timestamp: number): string => {
  const dateObj = new Date(timestamp)
  const formattedDate = dateObj.toLocaleDateString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: '2-digit',
  })
  const formattedTime = dateObj.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  })
  return `${formattedDate} ${formattedTime}`
}
