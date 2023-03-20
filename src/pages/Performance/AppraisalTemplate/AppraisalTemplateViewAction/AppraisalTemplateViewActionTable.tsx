import {
  CRow,
  CCol,
  CInputGroup,
  CFormInput,
  CButton,
  CTable,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableDataCell,
  CTableBody,
  CFormCheck,
  CLink,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import parse from 'html-react-parser'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../stateStore'
import OModal from '../../../../components/ReusableComponent/OModal'
import { AppraisalTemplateCheckBoxProps } from '../../../../types/Performance/AppraisalTemplate/appraisalTemplateTypes'

const AppraisalTemplateViewActionTable = ({
  setCycleChecked,
  cycleChecked,
  selChkBoxesFromApi,
}: AppraisalTemplateCheckBoxProps): JSX.Element => {
  const [searchInput, setSearchInput] = useState<string>('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isModalDescriptionVisible, setIsModalDescriptionVisible] =
    useState(false)
  const [displayDescriptionKra, setDisplayDescriptionKra] = useState<string>('')

  const [displayKra, setDisplayKra] = useState<string>('')

  const designationWiseKRAs = useTypedSelector(
    reduxServices.appraisalTemplate.selectors.designationWiseKRAs,
  )

  const handleModal = (name: string) => {
    setIsModalVisible(true)
    setDisplayKra(name)
  }

  const handleDescriptionModal = (name: string) => {
    setIsModalDescriptionVisible(true)
    setDisplayDescriptionKra(name)
  }

  return (
    <>
      <CRow className="gap-2 d-md-flex justify-content-md-end">
        <CCol sm={6} md={4}>
          <CInputGroup className="global-search me-0">
            <CFormInput
              data-testid="searchField"
              placeholder="Multiple Search"
              aria-label="Multiple Search"
              aria-describedby="button-addon2"
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value)
              }}
            />
            <CButton
              disabled={!searchInput}
              data-testid="multi-search-btn"
              className="cursor-pointer"
              type="button"
              color="info"
              id="button-addon2"
            >
              <i className="fa fa-search"></i>
            </CButton>
          </CInputGroup>
        </CCol>
      </CRow>
      <CTable
        striped
        responsive
        className="text-start text-left align-middle alignment"
      >
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">Action</CTableHeaderCell>
            <CTableHeaderCell scope="col">KRA</CTableHeaderCell>
            <CTableHeaderCell scope="col">Description</CTableHeaderCell>
            <CTableHeaderCell scope="col">No.of KPIs</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {designationWiseKRAs?.length > 0 &&
            designationWiseKRAs?.map((cycle, index) => {
              const kraName =
                cycle.name && cycle.name.length > 30
                  ? `${cycle.name.substring(0, 30)}...`
                  : cycle.name

              const KraDescription =
                cycle.description && cycle.description.length > 30
                  ? `${cycle.description.substring(0, 30)}...`
                  : cycle.description

              let flag = false
              const chkFlag = selChkBoxesFromApi?.find(
                (el) => el.id === cycle.id,
              )
              if (chkFlag) {
                flag = true
              }
              return (
                <CTableRow key={index}>
                  <CTableDataCell>
                    <CFormCheck
                      className="form-check-input"
                      name="checkType"
                      checked={flag}
                      onChange={() => {
                        setCycleChecked((prevState) => {
                          return {
                            ...prevState,
                            ...{
                              id: cycle.id,
                              name: cycle.name,
                              description: cycle.description,
                              kpiLookps: cycle.kpiLookps,
                              count: cycle.count,
                              checkType: cycle.checkType,
                              designationName: cycle.designationName,
                              designationId: cycle.designationId,
                              departmentName: cycle.departmentName,
                              departmentId: cycle.departmentId,
                              designationKraPercentage:
                                cycle.designationKraPercentage,
                            },
                          }
                        })
                      }}
                      value={cycleChecked as unknown as string}
                    />
                  </CTableDataCell>
                  {kraName ? (
                    <CTableDataCell>
                      <CLink
                        className="cursor-pointer text-decoration-none text-primary"
                        data-testid={`subject-comments${index}`}
                        onClick={() => handleModal(cycle.name)}
                      >
                        {parse(kraName)}
                      </CLink>
                    </CTableDataCell>
                  ) : (
                    <CTableDataCell>{`N/A`}</CTableDataCell>
                  )}

                  {KraDescription ? (
                    <CTableDataCell>
                      <CLink
                        className="cursor-pointer text-decoration-none text-primary"
                        data-testid={`subject-comments${index}`}
                        onClick={() =>
                          handleDescriptionModal(cycle.description)
                        }
                      >
                        {parse(KraDescription)}
                      </CLink>
                    </CTableDataCell>
                  ) : (
                    <CTableDataCell>{`N/A`}</CTableDataCell>
                  )}
                  <CTableDataCell scope="row">
                    <CLink
                      className="cursor-pointer text-decoration-none text-primary"
                      data-testid="report-test"
                    >
                      {cycle.count}
                    </CLink>
                  </CTableDataCell>
                </CTableRow>
              )
            })}
        </CTableBody>
      </CTable>
      <CRow>
        <CCol xs={4}>
          <strong>
            {designationWiseKRAs?.length
              ? `Total Records: ${designationWiseKRAs?.length}`
              : `No Records found...`}
          </strong>
        </CCol>
      </CRow>
      <CRow>
        <CCol md={{ span: 6, offset: 3 }}>
          <CButton
            data-testid="save-btn"
            className="btn-ovh me-1 text-white"
            color="success"
            // disabled={true}
          >
            Save
          </CButton>
        </CCol>
      </CRow>
      <OModal
        modalSize="lg"
        alignment="center"
        modalFooterClass="d-none"
        modalHeaderClass="d-none"
        modalBodyClass="model-body-text-alinement"
        visible={isModalVisible}
        setVisible={setIsModalVisible}
      >
        {displayKra}
      </OModal>
      <OModal
        modalSize="lg"
        alignment="center"
        modalFooterClass="d-none"
        modalHeaderClass="d-none"
        modalBodyClass="model-body-text-alinement"
        visible={isModalDescriptionVisible}
        setVisible={setIsModalDescriptionVisible}
      >
        {displayDescriptionKra}
      </OModal>
    </>
  )
}

export default AppraisalTemplateViewActionTable
