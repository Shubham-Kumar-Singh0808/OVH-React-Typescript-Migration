import {
  IncomingUserRole,
  MappedChildFeatureToSubFeatureItem,
  MappedSubFeatureToFeatureItem,
  UserRoleConfigurationModal,
} from '../../../types/Settings/UserRolesConfiguration/UserRolesConfigurationTypes'

export const initialUserRole: IncomingUserRole = {
  roleId: -1,
  name: 'Select Role',
  features: null,
}

export const initialUserRoleConfigurationModal: UserRoleConfigurationModal = {
  displayModal: false,
  description: '',
  modalSize: undefined,
  confirmButtonAction: undefined,
  confirmButtonText: 'Submit',
  cancelButtonText: 'Cancel',
  modalFooterClass: undefined,
  modalHeaderClass: 'd-none',
  isConfirmButtonDisabled: true,
}

// this returns the list but in sorted alphabetical order
export const getSortedSubFeaturesByName = (
  list: MappedSubFeatureToFeatureItem[],
): MappedSubFeatureToFeatureItem[] => {
  const sortedList = [...list]
  return sortedList.sort((a, b) => a.name.localeCompare(b.name))
}

// returns sorted list in alphabetical order
export const getSortedChildFeaturesByName = (
  list: MappedChildFeatureToSubFeatureItem[],
): MappedChildFeatureToSubFeatureItem[] => {
  const sortedList = [...list]
  return sortedList.sort((a, b) => a.name.localeCompare(b.name))
}

// returns testid to prevent redundant writing of initial value
export const getUserRolesConfigTestId = (value: string): string => {
  return `userRolesConfig-${value}`
}
