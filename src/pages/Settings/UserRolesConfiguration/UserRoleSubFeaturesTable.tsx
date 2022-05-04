import {
  CFormCheck,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'

import React from 'react'
import { childFeaturesArrayPropsType } from '../../../types/Settings/UserRolesConfiguration/userRolesAndPermissionsTypes'

interface UserRoleSubFeaturesTablePropsTypes {
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
const UserRoleSubFeaturesTable: React.FC<UserRoleSubFeaturesTablePropsTypes> =
  ({ childFeaturesArray }: UserRoleSubFeaturesTablePropsTypes): JSX.Element => {
    const { childFeatures } = childFeaturesArray
    return (
      <>
        <CTable striped responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>Feature Name</CTableHeaderCell>
              <CTableHeaderCell>View</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {childFeatures?.map((childFeatureItem, childFeatureItemIndex) => (
              <CTableRow key={childFeatureItemIndex}>
                <CTableDataCell>{childFeatureItem.name}</CTableDataCell>
                <CTableDataCell>
                  {childFeatureItem.viewaccess && (
                    <CFormCheck
                      data-testid="form-checkbox"
                      className="infocheckbox"
                      name={childFeatureItem.name}
                      checked={childFeatureItem.viewaccessChecked}
                    />
                  )}
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </>
    )
  }

export default UserRoleSubFeaturesTable
