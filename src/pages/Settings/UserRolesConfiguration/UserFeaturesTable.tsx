import {
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
} from '@coreui/react-pro'
import React from 'react'
import UserSubFeaturesTable from './UserSubFeaturesTable/UserSubFeaturesTable'
import { getUserRolesConfigTestId } from './UserRolesConfigurationsHelpers'
import { useTypedSelector } from '../../../stateStore'

const UserFeaturesTable = (): JSX.Element => {
  const mappedFeatures = useTypedSelector(
    (state) => state.userRolesConfiguration.mappedFeatures,
  )
  return (
    <>
      <div className="expandable-table-headwrap mt-4">
        <span>Action</span>
        <span>Menu Items</span>
      </div>
      <CAccordion flush className="expandable-table mb-3">
        {mappedFeatures?.map((featureItem, featureItemIndex) => (
          <CAccordionItem key={featureItemIndex}>
            <CAccordionHeader>
              <span
                className="title-sm expandable-table-title"
                data-testid={getUserRolesConfigTestId(
                  `featureName-${featureItemIndex}`,
                )}
              >
                {featureItem.name}
              </span>
            </CAccordionHeader>
            <CAccordionBody
              data-testid={getUserRolesConfigTestId('featureBody')}
            >
              <UserSubFeaturesTable
                featureItem={featureItem}
                featureId={featureItem.id}
              />
            </CAccordionBody>
          </CAccordionItem>
        ))}
      </CAccordion>
    </>
  )
}

export default UserFeaturesTable
