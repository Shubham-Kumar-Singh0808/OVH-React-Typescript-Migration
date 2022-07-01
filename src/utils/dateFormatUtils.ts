export const localeDateFormat = (date: string, locale: string | undefined) => {
  const newDate = new Date(date)
  return newDate.toLocaleDateString(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}
