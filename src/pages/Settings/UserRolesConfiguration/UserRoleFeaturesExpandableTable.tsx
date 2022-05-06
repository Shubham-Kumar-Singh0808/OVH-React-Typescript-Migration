import {
  AccessModifier,
  ChildFeaturesArrayProps,
  UserRoleFeaturesExpandableTableProps,
  UtilsChildFeatures,
  UtilsSubFeatures,
} from '../../../types/Settings/UserRolesConfiguration/userRolesAndPermissionsTypes'
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
import React, { useEffect, useState } from 'react'
import {
  doAssignRolePermission,
  doFetchFeaturesUnderRole,
} from '../../../reducers/Settings/UserRolesConfiguration/userRolesAndPermissionsSlice'
import {
  mapFeaturesToSubFeatures,
  renderPermissionSwitch,
} from '../../../utils/rolesAndPermissionsUtils'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'

import OModal from '../../../components/ReusableComponent/OModal'
import OToast from '../../../components/ReusableComponent/OToast'
import UserRoleSubFeaturesTable from './UserRoleSubFeaturesTable'
import { addToast } from '../../../reducers/appSlice'

const UserRoleFeaturesExpandableTable: React.FC<UserRoleFeaturesExpandableTableProps> =
  ({ selectedRoleId }: UserRoleFeaturesExpandableTableProps): JSX.Element => {
    const [mappedFeatures, setMappedFeatures] = useState<UtilsSubFeatures[]>([])
    const [childFeaturesModalVisibility, setChildFeaturesModalVisibility] =
      useState(false)
    const [childFeaturesArray, setChildFeaturesArray] =
      useState<ChildFeaturesArrayProps>({
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
        setMappedFeatures(mappedResult as UtilsSubFeatures[])
      }
    }, [features, subFeatures])

    // if sub feature having child features we have to show modal and also target the child features
    const handleChildModal = (
      index: number,
      subFeatureItemIndex: number,
      childFeatures: UtilsChildFeatures[],
    ) => {
      setChildFeaturesModalVisibility(true)
      setChildFeaturesArray({
        childFeatures: childFeatures,
        index: index,
        subFeatureItemIndex: subFeatureItemIndex,
      })
    }

    // post assign permission object to database
    const checkBoxHandleChange = async (
      target: EventTarget & HTMLInputElement,
      subFeatureItemIndex: number,
      index: number,
      accessModifier: AccessModifier,
      childFeatureItemIndex?: number,
      isChildFeature = false,
    ) => {
      const mappedFeaturesCopy = [...mappedFeatures]
      let toEdit = null
      if (isChildFeature) {
        toEdit =
          mappedFeaturesCopy[index].features[subFeatureItemIndex].childFeatures[
            childFeatureItemIndex as number
          ]
        toEdit[accessModifier] = target.checked
        console.log(toEdit)
      } else {
        toEdit = mappedFeaturesCopy[index].features[subFeatureItemIndex]
        toEdit[accessModifier] = target.checked
        console.log(toEdit)
      }
      setMappedFeatures(mappedFeaturesCopy)
      const prepareObject = renderPermissionSwitch(
        accessModifier,
        toEdit,
        selectedRoleId as number,
      )
      const assignPermissionResultAction = await dispatch(
        doAssignRolePermission(prepareObject),
      )
      if (
        doAssignRolePermission.fulfilled.match(assignPermissionResultAction)
      ) {
        let oToastMessage
        if (prepareObject.permission) {
          oToastMessage = `Successfully you have assigned '${prepareObject.type}' permission to '${target.name}'`
        } else {
          oToastMessage = `Successfully you have removed '${prepareObject.type}' permission to '${target.name}'`
        }
        dispatch(
          addToast(
            <OToast toastColor="success" toastMessage={oToastMessage} />,
          ),
        )
        dispatch(doFetchFeaturesUnderRole(selectedRoleId as string))
      }
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
                                              subFeatureItem.childFeatures,
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
                                          onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>,
                                          ) =>
                                            checkBoxHandleChange(
                                              e.target,
                                              subFeatureItemIndex,
                                              index,
                                              'viewaccessChecked',
                                            )
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
                                          onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>,
                                          ) =>
                                            checkBoxHandleChange(
                                              e.target,
                                              subFeatureItemIndex,
                                              index,
                                              'createaccessChecked',
                                            )
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
                                          onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>,
                                          ) =>
                                            checkBoxHandleChange(
                                              e.target,
                                              subFeatureItemIndex,
                                              index,
                                              'updateaccessChecked',
                                            )
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
                                          onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>,
                                          ) =>
                                            checkBoxHandleChange(
                                              e.target,
                                              subFeatureItemIndex,
                                              index,
                                              'deleteaccessChecked',
                                            )
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
          <UserRoleSubFeaturesTable
            childFeaturesArray={childFeaturesArray}
            checkBoxHandleChange={checkBoxHandleChange}
          />
        </OModal>
      </>
    )
  }

export default UserRoleFeaturesExpandableTable
