import { LoadingState, ValidationError } from '../../commonTypes'

export interface IncomingUserRole {
  roleId: number
  name: string
  features: null
}

export interface DefaultUserRoleFeature {
  featureId: number
  name: string
  viewaccess: boolean
  createaccess: boolean
  updateaccess: boolean
  deleteaccess: boolean
  childFeatures: null
}

export interface UserRoleSubFeatureItem
  extends Omit<DefaultUserRoleFeature, 'childFeatures'> {
  childFeatures: DefaultUserRoleFeature[]
}

export interface UserRoleSubFeature {
  id: number
  name: string
  features: UserRoleSubFeatureItem[]
}

// this is for objects that are mapped between subfeatures and FeaturesUnderRole
export interface MappedChildFeatureToSubFeatureItem {
  viewaccessChecked?: boolean
  deleteaccessChecked?: boolean
  createaccessChecked?: boolean
  updateaccessChecked?: boolean
  childFeatures: null
  featureId: number
  name: string
  viewaccess: boolean
  createaccess: boolean
  updateaccess: boolean
  deleteaccess: boolean
}

export interface MappedSubFeatureToFeatureItem
  extends Omit<MappedChildFeatureToSubFeatureItem, 'childFeatures'> {
  childFeatures: MappedChildFeatureToSubFeatureItem[]
}

export interface MappedFeatureItem {
  id: number
  name: string
  features: MappedSubFeatureToFeatureItem[]
}

export enum FeatureAccessModifierEnum {
  View = 'View',
  Create = 'Create',
  Update = 'Edit',
  Delete = 'Delete',
}

export interface OutgoingAssignPermissionDto {
  featureId: number
  permission: boolean
  roleId: number
  type: FeatureAccessModifierEnum
}

export interface UserRoleConfigurationModal {
  displayModal: boolean
  description: string | JSX.Element
  confirmButtonAction?: () => void | Promise<void>
  confirmButtonText?: string
  cancelButtonText?: string
  modalSize?: 'sm' | 'lg' | 'xl'
  modalFooterClass?: string
  modalHeaderClass?: string
  isConfirmButtonDisabled: boolean
}

export interface OutgoingAddRoleDto {
  reportingManagerFlag: boolean
  roleName: string
}

export interface UserRolesConfigurationSliceState {
  isLoading: LoadingState
  error: ValidationError
  roles: IncomingUserRole[]
  featuresUnderRole: DefaultUserRoleFeature[]
  subFeatures: UserRoleSubFeature[]
  mappedFeatures: MappedFeatureItem[]
  configurationModal: UserRoleConfigurationModal
  selectedRole: IncomingUserRole
}

// used in modules related to user roles config
export type ActionMapping = {
  added: string
  deleted: string
  updated?: string
}
