import { IncomingChecklistItem } from '../../types/Checklist/ChecklistTypes'

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

export const initialChecklistItem: IncomingChecklistItem = {
  id: -1,
  title: '',
  description: '',
  pageName: '',
  departmentName: '',
  departmentId: -1,
  type: '',
  sectionId: null,
  sectionName: null,
  userName: '',
  createdDate: null,
  updatedDate: 1,
}
