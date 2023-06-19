import React, { useEffect, useMemo, useState } from 'react'
import {
  CButton,
  CCol,
  CLink,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTooltip,
} from '@coreui/react-pro'
import parse from 'html-react-parser'
import { Link } from 'react-router-dom'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import { GetAppraisalCycle } from '../../../types/Settings/Configurations/appraisalConfigurationsTypes'
import OModal from '../../../components/ReusableComponent/OModal'

const AppraisalConfigurationsTable = ({
  userEditAccess,
}: {
  userEditAccess: boolean
}): JSX.Element => {
  const [isAppraisalDescriptionVisible, setIsAppraisalDescriptionVisible] =
    useState<boolean>(false)
  const [descriptionModal, setDescriptionModal] = useState(
    {} as GetAppraisalCycle,
  )
  const dispatch = useAppDispatch()

  const appraisalCycle = useTypedSelector(
    reduxServices.appraisalConfigurations.selectors.appraisalCycle,
  )

  useEffect(() => {
    dispatch(reduxServices.appraisalConfigurations.getAppraisalCycle())
  }, [dispatch])

  const handleAgendaModal = (appraisalCycleInfo: GetAppraisalCycle) => {
    setIsAppraisalDescriptionVisible(true)
    setDescriptionModal(appraisalCycleInfo)
  }

  console.log(appraisalCycle)

  const sortedAppraisalDates = useMemo(() => {
    if (appraisalCycle) {
      return appraisalCycle
        .slice()
        .sort((sortNode1, sortNode2) => sortNode2.id - sortNode1.id)
    }
    return []
  }, [appraisalCycle])

  console.log(sortedAppraisalDates)
  console.log(appraisalCycle)

  const totalRecords = appraisalCycle?.length
    ? `Total Records: ${appraisalCycle?.length}`
    : `No Records found...`
  return (
    <>
      <CTable
        striped
        responsive
        className="text-start text-left align-middle alignment mt-4"
      >
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Review Title</CTableHeaderCell>
            <CTableHeaderCell scope="col">Review Type</CTableHeaderCell>
            <CTableHeaderCell scope="col">Start Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">End Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">Duration(days)</CTableHeaderCell>
            <CTableHeaderCell scope="col">
              Service Period(days)
            </CTableHeaderCell>
            <CTableHeaderCell scope="col">Active</CTableHeaderCell>
            <CTableHeaderCell scope="col">Description</CTableHeaderCell>
            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {sortedAppraisalDates?.length > 0 &&
            sortedAppraisalDates?.map((appraisalCycle, index) => {
              const removeSpaces = appraisalCycle.description
                ?.replace(/\s+/g, ' ')
                .trim()
                .replace(/&nbsp;/g, '')
              const agendaLimit =
                removeSpaces && removeSpaces.length > 15
                  ? `${removeSpaces.substring(0, 15)}...`
                  : removeSpaces
              return (
                <CTableRow key={index}>
                  <CTableDataCell scope="row">{index + 1}</CTableDataCell>
                  <CTableDataCell>{appraisalCycle.name}</CTableDataCell>
                  <CTableDataCell>
                    {appraisalCycle.appraisalType}
                  </CTableDataCell>
                  <CTableDataCell>{appraisalCycle.fromDate}</CTableDataCell>
                  <CTableDataCell>{appraisalCycle.toDate}</CTableDataCell>
                  <CTableDataCell>
                    {appraisalCycle.appraisalDuration}
                  </CTableDataCell>
                  <CTableDataCell>
                    {appraisalCycle.servicePeriod}
                  </CTableDataCell>
                  <CTableDataCell>
                    {appraisalCycle.active ? 'Yes' : 'No'}
                  </CTableDataCell>
                  <CTableDataCell
                    scope="row"
                    className="sh-organization-link sh-comment"
                  >
                    {appraisalCycle.description ? (
                      <CLink
                        className="cursor-pointer text-decoration-none"
                        data-testid="description-modal-link"
                        onClick={() => handleAgendaModal(appraisalCycle)}
                      >
                        {parse(agendaLimit as string)}
                      </CLink>
                    ) : (
                      'N/A'
                    )}
                  </CTableDataCell>
                  <CTableDataCell>
                    {userEditAccess && (
                      <>
                        <CTooltip content="Edit">
                          <Link to={`/editAppraisalCycle/${appraisalCycle.id}`}>
                            <CButton
                              size="sm"
                              className="btn btn-info btn-sm btn-ovh-employee-list cursor-pointer"
                              color="info btn-ovh me-1"
                            >
                              <i className="fa fa-edit" aria-hidden="true"></i>
                            </CButton>
                          </Link>
                        </CTooltip>
                        <CTooltip content="Assign Template">
                          <CButton
                            size="sm"
                            className="btn-ovh me-2 sh-eye-btn-color btn-sm btn-ovh-employee-list cursor-pointer button"
                            disabled={appraisalCycle.cycleStartedFlag}
                          >
                            <i className="fa fa-plus" aria-hidden="true"></i>
                          </CButton>
                        </CTooltip>
                      </>
                    )}
                  </CTableDataCell>
                </CTableRow>
              )
            })}
        </CTableBody>
      </CTable>
      <CRow>
        <CCol md={3} className="no-records">
          <strong>{totalRecords}</strong>
        </CCol>
      </CRow>
      <OModal
        modalSize="lg"
        alignment="center"
        visible={isAppraisalDescriptionVisible}
        setVisible={setIsAppraisalDescriptionVisible}
        confirmButtonText="Yes"
        cancelButtonText="No"
        modalFooterClass="d-none"
        modalHeaderClass="d-none"
      >
        <>
          <span className="descriptionField">
            <p
              dangerouslySetInnerHTML={{
                __html: descriptionModal.description as string,
              }}
            />
          </span>
        </>
      </OModal>
    </>
  )
}
export default AppraisalConfigurationsTable
