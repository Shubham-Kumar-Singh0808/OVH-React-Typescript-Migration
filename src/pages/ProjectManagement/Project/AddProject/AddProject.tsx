import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import {
  CRow,
  CCol,
  CButton,
  CSpinner,
  CFormCheck,
  CFormLabel,
  CFormSelect,
} from '@coreui/react-pro'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import OCard from '../../../../components/ReusableComponent/OCard'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import OAutoComplete from '../../../../components/ReusableComponent/OAutoComplete'
import { GetList } from '../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import {
  GetAutoCompleteList,
  GetOnSelect,
  ProjectClients,
  ProjectDetail,
} from '../../../../types/ProjectManagement/Project/AddProject/AddProjectTypes'
import OInputField from '../../../../components/ReusableComponent/OInputField'
import OSelectList from '../../../../components/ReusableComponent/OSelectList'
import { showIsRequired } from '../../../../utils/helper'
import { dateFormat } from '../../../../constant/DateFormat'
import { ckeditorConfig } from '../../../../utils/ckEditorUtils'

const AddProject = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const isLoading = ApiLoadingState.succeeded
  const classNameStyle = 'col-sm-3 col-form-label text-end'

  const dynamicFormLabelProps = (htmlFor: string, className: string) => {
    return {
      htmlFor,
      className,
    }
  }

  const initProject = {} as ProjectDetail
  const [project, setProject] = useState(initProject)

  const [projectName, setProjectName] = useState<string>('')
  const [isGreaterThanStart, setIsGreaterThanStart] = useState(false)

  useEffect(() => {
    const newDateFormatForIsBefore = 'YYYY-MM-DD'
    const start = moment(project.startdate, dateFormat).format(
      newDateFormatForIsBefore,
    )
    const end = moment(project.enddate, dateFormat).format(
      newDateFormatForIsBefore,
    )

    setIsGreaterThanStart(moment(end).isBefore(start))
  }, [project.startdate, project.enddate])

  useEffect(() => {
    dispatch(reduxServices.projectManagement.getProjectClients())
  }, [dispatch])

  const projectClients = useTypedSelector(
    reduxServices.projectManagement.selectors.projectClients,
  )

  const clientOrganizationList = projectClients
    ?.filter((filterClient: ProjectClients) => filterClient.name != null)
    .map((mapClient) => {
      return {
        id: mapClient.id,
        name: mapClient.name == null ? '' : mapClient.name,
      } as GetAutoCompleteList
    })

  const projectTypeList: GetList[] = [
    { id: 1, name: 'Development' },
    { id: 2, name: 'Support' },
  ]

  const priceModelList: GetList[] = [
    { id: 1, name: 'Fixed Bid' },
    { id: 2, name: 'Retainer' },
    { id: 3, name: 'Support' },
    { id: 4, name: 'T&M' },
  ]

  const healthList: GetList[] = [
    { id: 1, name: 'Project not yet started' },
    { id: 2, name: 'Good' },
    { id: 3, name: 'Critical' },
    { id: 4, name: 'Danger' },
  ]

  const handleClientSelect = (value: GetOnSelect) => {
    console.log(value)
  }

  const handleProjectName = (value: string) => {
    console.log(value)
  }

  const handlePriceModel = (value: string) => {
    setProject({ ...project, type: value })
  }

  const onHandleStartDate = (value: Date) => {
    setProject({
      ...project,
      startdate: moment(value).format(dateFormat),
    })
  }

  const onHandleEndDate = (value: Date) => {
    setProject({
      ...project,
      enddate: moment(value).format(dateFormat),
    })
  }

  const onHandleHealth = (e: { target: { value: string } }) => {
    setProject({ ...project, health: e.target.value })
  }

  const onHandleDescription = (value: string) => {
    setProject({ ...project, description: value })
  }

  return (
    <OCard
      className="mb-4 myprofile-wrapper"
      title="Add Project"
      CBodyClassName="ps-0 pe-0"
      CFooterClassName="d-none"
    >
      {isLoading === ApiLoadingState.succeeded ? (
        <>
          <CRow className="justify-content-end">
            <CCol className="text-end" md={4}>
              {/* Partial route */}
              <Link to="/">
                <CButton
                  data-testid="back-btn"
                  color="info"
                  className="btn-ovh me-1"
                >
                  <i className="fa fa-arrow-left me-1"></i>Back
                </CButton>
              </Link>
            </CCol>
            <CCol xs={12} className="mt-2 mb-2 ps-0 pe-0">
              <OAutoComplete
                list={clientOrganizationList}
                onSelect={handleClientSelect}
                shouldReset={false}
                value={''}
                isRequired={true}
                label={'Client Organization'}
                placeholder={'Client'}
                name={'clientOrganization'}
                dynamicFormLabelProps={dynamicFormLabelProps}
              />
              <OInputField
                onChangeHandler={setProjectName}
                onBlurHandler={handleProjectName}
                value={projectName}
                isRequired={true}
                label={'Project Name'}
                name={'projectName'}
                placeholder={'Project Name'}
                dynamicFormLabelProps={dynamicFormLabelProps}
              />
              <OSelectList
                isRequired={true}
                list={priceModelList}
                setValue={handlePriceModel}
                value={project.type}
                label="Pricing Model"
                name="pricingModel"
                placeHolder="---Pricing Model---"
                dynamicFormLabelProps={dynamicFormLabelProps}
              />
              <CRow className="mb-3 align-items-center">
                <CCol sm={3} />
                <CCol sm={3}>
                  <CFormCheck
                    inline
                    type="checkbox"
                    name="employmentcontract"
                    id="employmentcontractyes"
                    label="Internal Project"
                    checked
                  />
                </CCol>
              </CRow>
              <OSelectList
                isRequired={true}
                list={projectTypeList}
                setValue={handlePriceModel}
                value={project.type}
                name="projectType"
                label="Project Type"
                placeHolder="---Project Type---"
                dynamicFormLabelProps={dynamicFormLabelProps}
              />
              <OAutoComplete
                list={clientOrganizationList}
                onSelect={handleClientSelect}
                shouldReset={false}
                value={projectName}
                isRequired={true}
                label={'Project Manager'}
                placeholder={'Project Manager'}
                name={'projectManager'}
                dynamicFormLabelProps={dynamicFormLabelProps}
              />
              <CRow className="mb-3">
                <CFormLabel
                  {...dynamicFormLabelProps('projectstartdate', classNameStyle)}
                >
                  Start Date:
                  <span className={showIsRequired(project.startdate)}>*</span>
                </CFormLabel>
                <CCol sm={3}>
                  <DatePicker
                    id="projectstartdate"
                    className="form-control form-control-sm sh-date-picker"
                    maxDate={new Date()}
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    data-testid="start-date-picker"
                    placeholderText="dd/mm/yy"
                    dateFormat="dd/mm/yy"
                    name="projectstartdate"
                    value={project.startdate}
                    onChange={(date: Date) => onHandleStartDate(date)}
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel
                  {...dynamicFormLabelProps('projectenddate', classNameStyle)}
                >
                  End Date:
                </CFormLabel>
                <CCol sm={3}>
                  <DatePicker
                    id="projectenddate"
                    className="form-control form-control-sm sh-date-picker"
                    maxDate={new Date()}
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    placeholderText="dd/mm/yy"
                    data-testid="end-date-picker"
                    dateFormat="dd/mm/yy"
                    name="projectenddate"
                    value={project.enddate}
                    onChange={(date: Date) => onHandleEndDate(date)}
                  />
                  <span></span>
                </CCol>
                {isGreaterThanStart && (
                  <CCol sm={3}>
                    <p style={{ color: 'red' }}>
                      <b>End date should be greater than Start date</b>
                    </p>
                  </CCol>
                )}
              </CRow>
              <CRow className="mb-3">
                <CFormLabel
                  data-testId="selectLabel"
                  {...dynamicFormLabelProps('health', classNameStyle)}
                >
                  Health:
                </CFormLabel>
                <CCol sm={3}>
                  <CFormSelect
                    id="health"
                    size="sm"
                    aria-label="health"
                    data-testid="formHealth"
                    name="health"
                    value={project.health}
                    onChange={onHandleHealth}
                  >
                    <option value={''}>Select</option>
                    {healthList?.map((item, index) => {
                      const { name: optionName } = item
                      return (
                        <option key={index} value={optionName}>
                          {optionName}
                        </option>
                      )
                    })}
                  </CFormSelect>
                </CCol>
              </CRow>
              <OInputField
                onChangeHandler={setProjectName}
                onBlurHandler={handleProjectName}
                value={projectName}
                isRequired={false}
                label="Hive Project Name"
                name="hiveProjectName"
                placeholder="Project Name in Hive"
                dynamicFormLabelProps={dynamicFormLabelProps}
              />
              <CRow className="mt-4 mb-4">
                <CFormLabel
                  data-testId="selectLabel"
                  {...dynamicFormLabelProps('description', classNameStyle)}
                >
                  Description:
                </CFormLabel>
                <CCol sm={9}>
                  <CKEditor<{
                    onChange: CKEditorEventHandler<'change'>
                  }>
                    config={ckeditorConfig}
                    debug={true}
                    onChange={({ editor }) => {
                      onHandleDescription(editor.getData().trim())
                    }}
                  />
                </CCol>
              </CRow>
            </CCol>
          </CRow>
        </>
      ) : (
        <CCol data-testid="spinner">
          <CRow className="category-loading-spinner">
            <CSpinner />
          </CRow>
        </CCol>
      )}
    </OCard>
  )
}

export default AddProject
