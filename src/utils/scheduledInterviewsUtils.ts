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

export const formatInterviewStatusText = (interviewStatus: string) => {
  if (interviewStatus === 'NEW') {
    return interviewStatus
  } else if (interviewStatus === 'IN_PROCESS') {
    return 'IN PROGRESS'
  } else if (interviewStatus === 'HOLD') {
    return 'HOLD'
  } else if (interviewStatus === 'REJECTED') {
    return 'REJECTED'
  } else if (interviewStatus === 'OFFERED') {
    return 'OFFERED'
  } else if (interviewStatus === 'RESCHEDULED') {
    return 'RESCHEDULED'
  } else if (interviewStatus === 'NO_SHOW') {
    return 'NO SHOW'
  } else if (interviewStatus === 'DID_NOT_JOIN') {
    return 'DID_NOT_JOIN'
  } else if (interviewStatus === 'COMPLETED') {
    return 'COMPLETED'
  } else if (interviewStatus === 'CANCEL') {
    return 'CANCEL'
  } else if (interviewStatus === 'OFFER_CANCELLED') {
    return 'OFFER_CANCELLED'
  }
  return interviewStatus
}
