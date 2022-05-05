import { ValidationErrorType } from '../../commonTypes'

export type UserRoleType = {
  roleId: number
  name: string
  features: null
}

export type addUserRoleType = {
  roleInput: string
  reportingManagerFlag: boolean
}

export type selectedRoleType = {
  roleId: number | string
  roleName: string
}

export type UserRoleChildFeaturesType = {
  featureId: number
  name: string
  viewaccess: boolean
  createaccess: boolean
  updateaccess: boolean
  deleteaccess: boolean
  childFeatures: null
}

export type UserRoleFeaturesType = {
  featureId: number
  name: string
  viewaccess: boolean
  createaccess: boolean
  updateaccess: boolean
  deleteaccess: boolean
  childFeatures: UserRoleChildFeaturesType[]
}

export type UserRoleSubFeaturesType = {
  id: number
  name: string
  features: UserRoleFeaturesType[]
}

export type FeaturesUnderRoleType = {
  featureId: number
  name: string
  viewaccess: boolean
  createaccess: boolean
  updateaccess: boolean
  deleteaccess: boolean
  childFeatures: null
}
export type UserRolesAndPermissionsStateType = {
  roles: UserRoleType[]
  subFeatures: UserRoleSubFeaturesType[]
  featuresUnderRole: FeaturesUnderRoleType[]
  isRoleExits: boolean | null
  isLoading: boolean
  error: ValidationErrorType
}

export type UtilsChildFeaturesType = {
  childFeatures: null
  createaccess: boolean
  createaccessChecked: boolean
  deleteaccess: boolean
  deleteaccessChecked: boolean
  featureId: number
  name: string
  updateaccess: boolean
  updateaccessChecked: boolean
  viewaccess: boolean
  viewaccessChecked: boolean
}

export type UtilsFeaturesType = {
  childFeatures?: UtilsChildFeaturesType[]
  createaccess?: boolean
  createaccessChecked?: boolean
  deleteaccess?: boolean
  deleteaccessChecked?: boolean
  featureId?: number
  name?: string
  updateaccess?: boolean
  updateaccessChecked?: boolean
  viewaccess?: boolean
  viewaccessChecked?: boolean
}

export type UtilsSubFeaturesType = {
  features: UtilsFeaturesType[]
  id: number
  name: string
}

export type childFeaturesArrayPropsType = {
  childFeatures: UtilsChildFeaturesType[]
  index: number
  subFeatureItemIndex: number
}

export type AddDeleteRolePropsType = {
  selectedRole: selectedRoleType
  setSelectedRole: (role: selectedRoleType) => void
}

export type UserRoleFeaturesExpandableTablePropsType = {
  selectedRoleId: string | number
}

export type UserRolesListPropsType = {
  selectedRole: selectedRoleType
  setSelectedRole: (role: selectedRoleType) => void
}
export type UserRoleSubFeaturesTablePropsType = {
  childFeaturesArray: childFeaturesArrayPropsType
  checkBoxHandleChange?: (
    target: boolean,
    subFeatureItemIndex: number,
    index: number,
    accessModifier: string,
    childFeatureItemIndex: number,
    isChildFeature: boolean,
  ) => void
}

export type ActionMappingType = {
  added: string
  deleted: string
}
