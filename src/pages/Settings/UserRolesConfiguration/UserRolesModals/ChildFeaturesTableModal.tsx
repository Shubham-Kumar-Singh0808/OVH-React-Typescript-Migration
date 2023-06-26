import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import React from 'react'
import {
  FeatureAccessModifierEnum,
  MappedChildFeatureToSubFeatureItem,
} from '../../../../types/Settings/UserRolesConfiguration/UserRolesConfigurationTypes'
import FeatureCheck from '../UserSubFeaturesTable/FeatureCheck'
import {
  getSortedChildFeaturesByName,
  getUserRolesConfigTestId,
} from '../UserRolesConfigurationsHelpers'

// this component is rendered as a modal for the features having child features

const ChildFeaturesTableModal = ({
  childFeatures,
}: {
  childFeatures: MappedChildFeatureToSubFeatureItem[]
}): JSX.Element => {
  return (
    <CTable striped responsive>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell>Feature Name</CTableHeaderCell>
          <CTableHeaderCell>View</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {getSortedChildFeaturesByName(childFeatures).map(
          (childFeature, childFeatureItemIndex) => (
            <CTableRow
              key={childFeatureItemIndex}
              data-testid={getUserRolesConfigTestId('childFeaturesRow')}
            >
              <CTableDataCell
                data-testid={getUserRolesConfigTestId(
                  `childFeatureName-${childFeature.featureId}`,
                )}
              >
                {childFeature.name}
              </CTableDataCell>
              <CTableDataCell>
                <FeatureCheck
                  modifierValue={FeatureAccessModifierEnum.View}
                  checkedValue={childFeature.viewaccessChecked}
                  showCheck={childFeature.viewaccess}
                  feature={childFeature}
                  isChild={true}
                />
              </CTableDataCell>
            </CTableRow>
          ),
        )}
      </CTableBody>
    </CTable>
  )
}

export default ChildFeaturesTableModal
