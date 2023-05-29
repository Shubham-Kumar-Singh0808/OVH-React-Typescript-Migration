export const openToDateHandler = (enteredDate: string): Date => {
  return !isNaN(Date.parse(enteredDate)) ? new Date(enteredDate) : new Date()
}
