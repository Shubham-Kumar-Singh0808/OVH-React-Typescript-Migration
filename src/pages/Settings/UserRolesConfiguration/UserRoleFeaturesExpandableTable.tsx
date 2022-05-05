import {
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CFormCheck,
  CLink,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import {
  ChildFeaturesArrayPropsType,
  UserRoleFeaturesExpandableTablePropsType,
  UtilsChildFeaturesType,
  UtilsSubFeaturesType,
} from '../../../types/Settings/UserRolesConfiguration/userRolesAndPermissionsTypes'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'

import OModal from '../../../components/ReusableComponent/OModal'
import UserRoleSubFeaturesTable from './UserRoleSubFeaturesTable'
import { doFetchFeaturesUnderRole } from '../../../reducers/Settings/UserRolesConfiguration/userRolesAndPermissionsSlice'
import { mapFeaturesToSubFeatures } from '../../../utils/rolesAndPermissionsUtils'

const UserRoleFeaturesExpandableTable: React.FC<UserRoleFeaturesExpandableTablePropsType> =
  ({
    selectedRoleId,
  }: UserRoleFeaturesExpandableTablePropsType): JSX.Element => {
    const [mappedFeatures, setMappedFeatures] = useState<
      UtilsSubFeaturesType[]
    >([])
    const [childFeaturesModalVisibility, setChildFeaturesModalVisibility] =
      useState(false)
    const [childFeaturesArray, setChildFeaturesArray] =
      useState<ChildFeaturesArrayPropsType>({
        childFeatures: [],
        index: 0,
        subFeatureItemIndex: 0,
      })
    const dispatch = useAppDispatch()
    const subFeatures = useTypedSelector(
      (state) => state.userRolesAndPermissions.subFeatures,
    )
    const features = useTypedSelector(
      (state) => state.userRolesAndPermissions.featuresUnderRole,
    )
    // on every selected role change doFetchFeaturesUnderRole will dispatch
    useEffect(() => {
      if (selectedRoleId) {
        dispatch(doFetchFeaturesUnderRole(selectedRoleId as string))
      }
    }, [dispatch, selectedRoleId])

    useEffect(() => {
      if (features) {
        const mappedResult = mapFeaturesToSubFeatures(features, subFeatures)
        setMappedFeatures(mappedResult as UtilsSubFeaturesType[])
      }
    }, [features, subFeatures])

    // if sub feature having child features we have to show modal and also target the child features
    const handleChildModal = (
      index: number,
      subFeatureItemIndex: number,
      childFeatures: UtilsChildFeaturesType[],
    ) => {
      setChildFeaturesModalVisibility(true)
      setChildFeaturesArray({
        childFeatures: childFeatures,
        index: index,
        subFeatureItemIndex: subFeatureItemIndex,
      })
    }

    return (
      <>
        <div className="expandable-table-headwrap mt-4">
          <span>Action</span>
          <span>Menu Items</span>
        </div>
        {selectedRoleId ? (
          <>
            <CAccordion flush className="expandable-table mb-3">
              {mappedFeatures.map((featureItem, index) => {
                return (
                  <React.Fragment key={index}>
                    <CAccordionItem>
                      <CAccordionHeader>
                        <span
                          className="title-sm expandable-table-title"
                          data-testid="CAccordionHeader-span"
                        >
                          {featureItem.name}
                        </span>
                      </CAccordionHeader>
                      <CAccordionBody>
                        <CTable responsive striped>
                          <CTableHead color="info">
                            <CTableRow>
                              <CTableHeaderCell>Feature Name</CTableHeaderCell>
                              <CTableHeaderCell>View</CTableHeaderCell>
                              <CTableHeaderCell>Create</CTableHeaderCell>
                              <CTableHeaderCell>Edit</CTableHeaderCell>
                              <CTableHeaderCell>Delete</CTableHeaderCell>
                            </CTableRow>
                          </CTableHead>
                          <CTableBody>
                            {featureItem.features.map(
                              (subFeatureItem, subFeatureItemIndex) => {
                                return (
                                  <CTableRow key={subFeatureItemIndex}>
                                    {subFeatureItem.childFeatures &&
                                    subFeatureItem.childFeatures.length > 0 ? (
                                      <CTableDataCell>
                                        <CLink
                                          className="cursor-pointer text-decoration-none text-primary"
                                          onClick={() =>
                                            handleChildModal(
                                              index,
                                              subFeatureItemIndex,
                                              subFeatureItem.childFeatures as UtilsChildFeaturesType[],
                                            )
                                          }
                                        >
                                          {subFeatureItem.name}
                                        </CLink>
                                      </CTableDataCell>
                                    ) : (
                                      <CTableDataCell>
                                        {subFeatureItem.name}
                                      </CTableDataCell>
                                    )}
                                    <CTableDataCell>
                                      {subFeatureItem.viewaccess && (
                                        <CFormCheck
                                          className="infocheckbox"
                                          name={subFeatureItem.name}
                                          checked={
                                            subFeatureItem.viewaccessChecked
                                          }
                                        />
                                      )}
                                    </CTableDataCell>
                                    <CTableDataCell>
                                      {subFeatureItem.createaccess && (
                                        <CFormCheck
                                          className="infocheckbox"
                                          name={subFeatureItem.name}
                                          checked={
                                            subFeatureItem.createaccessChecked
                                          }
                                        />
                                      )}
                                    </CTableDataCell>
                                    <CTableDataCell>
                                      {subFeatureItem.updateaccess && (
                                        <CFormCheck
                                          className="infocheckbox"
                                          name={subFeatureItem.name}
                                          checked={
                                            subFeatureItem.updateaccessChecked
                                          }
                                        />
                                      )}
                                    </CTableDataCell>
                                    <CTableDataCell>
                                      {subFeatureItem.deleteaccess && (
                                        <CFormCheck
                                          className="infocheckbox"
                                          name={subFeatureItem.name}
                                          checked={
                                            subFeatureItem.deleteaccessChecked
                                          }
                                        />
                                      )}
                                    </CTableDataCell>
                                  </CTableRow>
                                )
                              },
                            )}
                          </CTableBody>
                        </CTable>
                      </CAccordionBody>
                    </CAccordionItem>
                  </React.Fragment>
                )
              })}
            </CAccordion>
          </>
        ) : (
          <></>
        )}
        <OModal
          alignment="center"
          visible={childFeaturesModalVisibility}
          setVisible={setChildFeaturesModalVisibility}
          confirmButtonText="Yes"
          cancelButtonText="No"
          modalFooterClass="d-none"
          modalHeaderClass="d-none"
        >
          <UserRoleSubFeaturesTable childFeaturesArray={childFeaturesArray} />
        </OModal>
      </>
    )
  }

export default UserRoleFeaturesExpandableTable
