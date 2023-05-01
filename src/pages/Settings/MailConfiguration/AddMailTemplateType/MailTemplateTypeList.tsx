import { CRow, CCol, CButton } from '@coreui/react-pro'
import React, { useEffect } from 'react'
import MailTemplateTypeTable from './MailTemplateTypeTable'
import AddNewMailTemplateType from './AddNewMailTemplateType'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { reduxServices } from '../../../../reducers/reduxServices'
import { AddEditEmployeeSkillsProps } from '../../../../types/MyProfile/QualificationsTab/EmployeeSkills/employeeSkillTypes'
import OCard from '../../../../components/ReusableComponent/OCard'
import OLoadingSpinner from '../../../../components/ReusableComponent/OLoadingSpinner'
import { LoadingType } from '../../../../types/Components/loadingScreenTypes'

const MailTemplateTypeList = ({
  backButtonHandler,
}: AddEditEmployeeSkillsProps): JSX.Element => {
  const dispatch = useAppDispatch()

  const isLoading = useTypedSelector(
    reduxServices.addNewMailTemplateType.selectors.isLoading,
  )

  useEffect(() => {
    dispatch(reduxServices.addNewMailTemplateType.getMailTemplateTypes())
    dispatch(reduxServices.addNewMailTemplateType.actions.setCurrentPage(1))
    dispatch(reduxServices.addNewMailTemplateType.actions.setPageSize(20))
  }, [dispatch])
  return (
    <>
      {isLoading !== ApiLoadingState.loading ? (
        <OCard
          className="mb-4 myprofile-wrapper"
          title="Add Template Type"
          CBodyClassName="ps-0 pe-0"
          CFooterClassName="d-none"
        >
          <CRow>
            <CCol xs={12} className="gap-2 d-md-flex justify-content-md-end">
              <CButton color="info btn-ovh me-1" onClick={backButtonHandler}>
                <i className="fa fa-arrow-left  me-1"></i>Back
              </CButton>
            </CCol>
            <CCol xs={12} className="mt-4 mb-4">
              <AddNewMailTemplateType />
            </CCol>
            <CCol xs={12}>
              <MailTemplateTypeTable />
            </CCol>
          </CRow>
        </OCard>
      ) : (
        <OLoadingSpinner type={LoadingType.PAGE} />
      )}
    </>
  )
}
export default MailTemplateTypeList
