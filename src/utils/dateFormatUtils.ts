export const localeDateFormat = (date: string) => {
  const deviceLocale: string =
    navigator.languages && navigator.languages.length
      ? navigator.languages[0]
      : navigator.language

  const tempDate = date as string
  const dateParts: string[] | string = tempDate.split('/')
  const newDate = new Date(
    Number(dateParts[2]),
    Number(dateParts[1]) - 1,
    Number(dateParts[0]),
  )

  return newDate.toLocaleDateString(deviceLocale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}
