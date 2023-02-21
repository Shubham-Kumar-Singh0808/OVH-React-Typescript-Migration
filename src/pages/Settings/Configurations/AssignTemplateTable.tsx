import React, { useEffect, useState } from 'react'
import {
  CButton,
  CTable,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CRow,
  CCol,
  CFormInput,
  CInputGroup,
  CTableBody,
  CTableDataCell,
  CFormCheck,
  CLink,
} from '@coreui/react-pro'
import parse from 'html-react-parser'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { AssignTemplateOptions } from '../../../types/Settings/Configurations/assignTemplateTypes'
import OModal from '../../../components/ReusableComponent/OModal'
import OToast from '../../../components/ReusableComponent/OToast'

const AssignTemplateTable = ({
  selectDepartment,
  selectDesignation,
}: AssignTemplateOptions): JSX.Element => {
  const dispatch = useAppDispatch()

  const [searchInput, setSearchInput] = useState<string>('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isModalVisibleData, setIsModalVisibleData] = useState(false)
  const [isSaveBtnEnabled, setIsSaveBtnEnabled] = useState<boolean>(false)
  const [displayKra, setDisplayKra] = useState<string>('')
  const [displayKraDetails, setDisplayKraDetails] = useState<string>('')
  const [isChecked, setIsChecked] = useState<boolean>(false)

  const designationWiseKRA = useTypedSelector(
    reduxServices.assignTemplate.selectors.designationsWiseKRA,
  )
  const designations = useTypedSelector(
    reduxServices.assignTemplate.selectors.empDesignationsList,
  )

  const multiSearchBtnHandler = () => {
    dispatch(
      reduxServices.assignTemplate.searchKRAData({
        departmentId: selectDepartment,
        designationId: selectDesignation,
        endIndex: 20,
        multipleSearch: searchInput,
        startIndex: 0,
      }),
    )
  }

  const handleSearchBtn = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      dispatch(
        reduxServices.assignTemplate.searchKRAData({
          departmentId: selectDepartment,
          designationId: selectDesignation,
          endIndex: 20,
          multipleSearch: searchInput,
          startIndex: 0,
        }),
      )
    }
  }

  const handleModal = (name: string) => {
    setIsModalVisible(true)
    setDisplayKra(name)
  }

  const handleModalForKra = (kraId: number) => {
    setIsModalVisibleData(true)
    dispatch(reduxServices.assignTemplate.kpiForIndividualKra(kraId))
  }
  useEffect(() => {
    if (isChecked) {
      setIsSaveBtnEnabled(true)
    } else {
      setIsSaveBtnEnabled(false)
    }
  }, [isChecked])

  const successMsg = (
    <OToast
      toastMessage="KRA's are assigned to Designation."
      toastColor="success"
    />
  )

  const appraisalCycle = useTypedSelector(
    reduxServices.appraisalConfigurations.selectors.getEditAppraisal,
  )

  const saveButtonHandler = async () => {
    const prepareObject = {
      appraisalCycleDto: {
        active: appraisalCycle.active,
        appraisalDuration: '',
        appraisalEndDate: appraisalCycle.appraisalEndDate,
        appraisalStartDate: appraisalCycle.appraisalStartDate,
        appraisalType: appraisalCycle.appraisalType,
        cycleStartedFlag: appraisalCycle.cycleStartedFlag,
        description: appraisalCycle.description,
        fromDate: appraisalCycle.fromDate,
        id: appraisalCycle.id,
        level: appraisalCycle.level,
        name: appraisalCycle.name,
        servicePeriod: appraisalCycle.servicePeriod,
        toDate: appraisalCycle.toDate,
      },
      designation: {
        code: designations.code,
        departmentId: designations.departmentId,
        departmentName: designations.departmentName,
        id: designations.id,
        name: designations.name,
      },
      kraLookups: designationWiseKRA,
    }
    const saveKRAResultAction = await dispatch(
      reduxServices.assignTemplate.designingMap(prepareObject),
    )
    if (
      reduxServices.assignTemplate.designingMap.fulfilled.match(
        saveKRAResultAction,
      )
    ) {
      dispatch(reduxServices.app.actions.addToast(successMsg))
      dispatch(reduxServices.app.actions.addToast(undefined))
    }
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
              onKeyDown={handleSearchBtn}
              disabled={!selectDepartment && !selectDesignation}
            />
            <CButton
              disabled={!searchInput}
              data-testid="multi-search-btn"
              className="cursor-pointer"
              type="button"
              color="info"
              id="button-addon2"
              onClick={multiSearchBtnHandler}
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
          {designationWiseKRA &&
            designationWiseKRA?.map((designationKRA, index) => {
              const kraLimit =
                designationKRA.name && designationKRA.name.length > 30
                  ? `${designationKRA.name.substring(0, 30)}...`
                  : designationKRA.name
              return (
                <CTableRow key={index}>
                  <CTableDataCell>
                    <CFormCheck
                      className="form-check-input"
                      name="checkType"
                      checked={designationKRA.checkType as unknown as boolean}
                      onChange={(e) => setIsChecked(e.target.checked)}
                    />
                  </CTableDataCell>
                  {kraLimit ? (
                    <CTableDataCell>
                      <CLink
                        className="cursor-pointer text-decoration-none text-primary"
                        data-testid={`subject-comments${index}`}
                        onClick={() => handleModal(designationKRA.name)}
                      >
                        {parse(kraLimit)}
                      </CLink>
                    </CTableDataCell>
                  ) : (
                    <CTableDataCell>{`N/A`}</CTableDataCell>
                  )}
                  <CTableDataCell>
                    {designationKRA.description || 'N/A'}
                  </CTableDataCell>
                  <CTableDataCell scope="row">
                    <CLink
                      className="cursor-pointer text-decoration-none text-primary"
                      data-testid="report-test"
                      onClick={() => handleModalForKra(designationKRA.id)}
                    >
                      {designationKRA.count}
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
            {designationWiseKRA?.length
              ? `Total Records: ${designationWiseKRA?.length}`
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
            disabled={!isSaveBtnEnabled}
            onClick={saveButtonHandler}
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
        visible={isModalVisibleData}
        setVisible={setIsModalVisibleData}
      >
        {displayKraDetails}
      </OModal>
    </>
  )
}
export default AssignTemplateTable
