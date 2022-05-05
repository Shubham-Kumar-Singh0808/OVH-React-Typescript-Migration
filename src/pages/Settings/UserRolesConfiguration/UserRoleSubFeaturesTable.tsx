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
import { UserRoleSubFeaturesTablePropsType } from '../../../types/Settings/UserRolesConfiguration/userRolesAndPermissionsTypes'

const UserRoleSubFeaturesTable: React.FC<UserRoleSubFeaturesTablePropsType> = ({
  childFeaturesArray,
  checkBoxHandleChange,
}: UserRoleSubFeaturesTablePropsType): JSX.Element => {
  const { childFeatures, index, subFeatureItemIndex } = childFeaturesArray
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
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      checkBoxHandleChange(
                        e.target.checked,
                        subFeatureItemIndex,
                        index,
                        'viewaccessChecked',
                        childFeatureItemIndex,
                        true,
                      )
                    }
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
