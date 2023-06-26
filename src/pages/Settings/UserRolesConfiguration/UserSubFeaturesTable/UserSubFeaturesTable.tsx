import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import React from 'react'
import FeatureCheck from './FeatureCheck'
import SubFeatureName from './SubFeatureName'
import {
  getSortedSubFeaturesByName,
  getUserRolesConfigTestId,
} from '../UserRolesConfigurationsHelpers'
import {
  FeatureAccessModifierEnum,
  MappedFeatureItem,
} from '../../../../types/Settings/UserRolesConfiguration/UserRolesConfigurationTypes'

// this component renders the inner table of each feature which shows the feature name along
// with access checkboxes

const UserSubFeaturesTable = ({
  featureItem,
  featureId,
}: {
  featureItem: MappedFeatureItem
  featureId: number
}): JSX.Element => {
  return (
    <CTable striped responsive>
      <CTableHead color="info">
        <CTableRow>
          <CTableHeaderCell scope="col">Feature Name</CTableHeaderCell>
          <CTableHeaderCell scope="col">View</CTableHeaderCell>
          <CTableHeaderCell scope="col">Create</CTableHeaderCell>
          <CTableHeaderCell scope="col">Edit</CTableHeaderCell>
          <CTableHeaderCell scope="col">Delete</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {getSortedSubFeaturesByName(featureItem.features).map(
          (feature, featureIndex) => (
            <CTableRow
              key={featureIndex}
              data-testid={getUserRolesConfigTestId(
                `subFeatureItems-${featureId}`,
              )}
            >
              <CTableDataCell>
                <SubFeatureName subFeatureItem={feature} />
              </CTableDataCell>
              <CTableDataCell>
                <FeatureCheck
                  checkedValue={feature.viewaccessChecked}
                  modifierValue={FeatureAccessModifierEnum.View}
                  showCheck={feature.viewaccess}
                  feature={feature}
                  isChild={false}
                />
              </CTableDataCell>
              <CTableDataCell>
                <FeatureCheck
                  checkedValue={feature.createaccessChecked}
                  modifierValue={FeatureAccessModifierEnum.Create}
                  showCheck={feature.createaccess}
                  feature={feature}
                  isChild={false}
                />
              </CTableDataCell>
              <CTableDataCell>
                <FeatureCheck
                  checkedValue={feature.updateaccessChecked}
                  modifierValue={FeatureAccessModifierEnum.Update}
                  showCheck={feature.updateaccess}
                  feature={feature}
                  isChild={false}
                />
              </CTableDataCell>
              <CTableDataCell>
                <FeatureCheck
                  checkedValue={feature.deleteaccessChecked}
                  modifierValue={FeatureAccessModifierEnum.Delete}
                  showCheck={feature.deleteaccess}
                  feature={feature}
                  isChild={false}
                />
              </CTableDataCell>
            </CTableRow>
          ),
        )}
      </CTableBody>
    </CTable>
  )
}

export default UserSubFeaturesTable
