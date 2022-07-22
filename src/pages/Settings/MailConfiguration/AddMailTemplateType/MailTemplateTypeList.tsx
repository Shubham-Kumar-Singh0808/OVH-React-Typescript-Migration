import {
  CCardHeader,
  CCardBody,
  CRow,
  CCol,
  CButton,
  CSpinner,
} from '@coreui/react-pro'
import React, { useEffect } from 'react'
import MailTemplateTypeTable from './MailTemplateTypeTable'
import AddNewMailTemplateType from './AddNewMailTemplateType'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { reduxServices } from '../../../../reducers/reduxServices'
import { AddEditEmployeeSkillsProps } from '../../../../types/MyProfile/QualificationsTab/EmployeeSkills/employeeSkillTypes'

const MailTemplateTypeList = ({
  backButtonHandler,
}: AddEditEmployeeSkillsProps): JSX.Element => {
  const dispatch = useAppDispatch()
  const isLoading = useTypedSelector(
    reduxServices.addNewmailTemplateType.selectors.isLoading,
  )

  useEffect(() => {
    dispatch(reduxServices.addNewmailTemplateType.getMailTemplateTypes())
    dispatch(reduxServices.addNewmailTemplateType.actions.setCurrentPage(1))
    dispatch(reduxServices.addNewmailTemplateType.actions.setPageSize(20))
  }, [dispatch])
  return (
    <>
      {isLoading !== ApiLoadingState.loading ? (
        <>
          <CCardHeader>
            <h4 className="h4">Add Template Type</h4>
          </CCardHeader>
          <CCardBody className="ps-0 pe-0">
            <CRow>
              <CCol xs={12} className="gap-2 d-md-flex justify-content-md-end">
                <CButton color="info btn-ovh me-1" onClick={backButtonHandler}>
                  <i className="fa fa-arrow-left  me-1"></i>Back
                </CButton>
              </CCol>
              <CCol xs={12}>
                <AddNewMailTemplateType />
              </CCol>
              <CCol xs={12}>
                <MailTemplateTypeTable />
              </CCol>
            </CRow>
          </CCardBody>
        </>
      ) : (
        <CCol>
          <CRow className="category-loading-spinner">
            <CSpinner />
          </CRow>
        </CCol>
      )}
    </>
  )
}
export default MailTemplateTypeList
