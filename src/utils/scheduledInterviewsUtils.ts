export const formatInterviewModeText = (interviewMode: string): string => {
  if (interviewMode === 'FACE_TO_FACE') {
    return 'In Person'
  } else if (interviewMode === 'SYSTEM') {
    return 'System'
  } else if (interviewMode === 'TELEPHONE') {
    return 'Telephonic'
  } else if (interviewMode === 'SKYPE') {
    return 'Skype'
  } else if (
    interviewMode ===
    ('Zoom' || 'Google_Meet' || 'GoToMeeting' || 'Microsoft_Teams')
  ) {
    return interviewMode
  }
  return interviewMode
}
