import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react-pro'
import { Link, useParams } from 'react-router-dom'
import AssignTemplateTable from './AssignTemplateTable'
import OCard from '../../../components/ReusableComponent/OCard'
import { TextDanger, TextWhite } from '../../../constant/ClassName'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import { DesignationWiseKRA } from '../../../types/Settings/Configurations/assignTemplateTypes'

const AssignTemplate = (): JSX.Element => {
  const [selectDepartment, setSelectDepartment] = useState<number>()
  const [selectDesignation, setSelectDesignation] = useState<number>()
  const [selectPreviousCycle, setSelectPreviousCycle] = useState('')
  const [isCopyBtnEnabled, setIsCopyBtnEnabled] = useState<boolean>(false)

  const [checkList, setCheckList] = useState<DesignationWiseKRA[]>([])
  const [cycleChecked, setCycleChecked] = useState<DesignationWiseKRA>()
  const [cbFromApi, setCbFromApi] = useState<DesignationWiseKRA[]>([])

  const { cycleId } = useParams<{ cycleId: string }>()
  useEffect(() => {
    if (cycleChecked) {
      const tmpArr: DesignationWiseKRA[] = []
      cbFromApi.forEach((item) => {
        tmpArr.push(item)
        return ''
      })
      let ndx = 9999
      tmpArr.forEach((el, i) => {
        if (el.id === cycleChecked.id) {
          ndx = i
        }
        return ''
      })
      if (ndx < 9999) {
        tmpArr.splice(ndx, 1)
      } else {
        tmpArr.push(cycleChecked)
      }
      setCbFromApi(tmpArr)
      setCheckList([...checkList, cycleChecked])
    }
  }, [cycleChecked])

  const formLabelProps = {
    htmlFor: 'inputNewHandbook',
    className: 'col-form-label category-label',
  }
  const getEditAppraisal = useTypedSelector(
    reduxServices.appraisalConfigurations.selectors.getEditAppraisal,
  )

  const dispatch = useAppDispatch()

  const departments = useTypedSelector(
    reduxServices.assignTemplate.selectors.empDepartments,
  )

  const appraisalCycleName = useTypedSelector(
    reduxServices.appraisalConfigurations.selectors.appraisalCycle,
  )

  const designations = useTypedSelector(
    reduxServices.assignTemplate.selectors.empDesignations,
  )

  useEffect(() => {
    dispatch(reduxServices.assignTemplate.getAllEmpDepartmentNames())
  }, [dispatch])

  useEffect(() => {
    dispatch(reduxServices.assignTemplate.alreadyExistingCycle(Number(cycleId)))
  }, [dispatch])

  useEffect(() => {
    if (selectDepartment) {
      dispatch(
        reduxServices.assignTemplate.getDesignations(Number(selectDepartment)),
      )
    }
  }, [selectDepartment])

  useEffect(() => {
    if (selectDesignation) {
      dispatch(
        reduxServices.assignTemplate.getDesignationWiseKRAs({
          departmentId: selectDepartment as number,
          designationId: selectDesignation,
        }),
      )
    }
  }, [selectDepartment, selectDesignation])

  useEffect(() => {
    if (selectPreviousCycle) {
      setIsCopyBtnEnabled(true)
    } else {
      setIsCopyBtnEnabled(false)
    }
  }, [selectPreviousCycle])

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Assign Template"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <Link to={`/appraisalCycle`}>
              <CButton
                color="info"
                className="btn-ovh me-1"
                data-testid="back-button"
              >
                <i className="fa fa-arrow-left  me-1"></i>Back
              </CButton>
            </Link>
          </CCol>
        </CRow>
        <CForm>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Appraisal Title:
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                className="form-control form-control-not-allowed"
                data-testid="appraisalTitle"
                type="text"
                id="appraisalTitle"
                size="sm"
                name="name"
                disabled={true}
                value={getEditAppraisal.name}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CCol sm={3} className="text-end">
              <CFormLabel className="mt-1">Copy from previous cycle</CFormLabel>
            </CCol>
            <CCol sm={3}>
              <CFormSelect
                aria-label="Default select example"
                size="sm"
                id="previousCycle"
                data-testid="form-select1"
                name="previousCycle"
                value={selectPreviousCycle}
                onChange={(e) => {
                  setSelectPreviousCycle(e.target.value)
                }}
              >
                <option value={''}>Select Appraisal Title</option>
                {appraisalCycleName.map((cycle, index) => (
                  <option key={index} value={cycle.id}>
                    {cycle.name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol sm={6}>
              <CButton
                data-testid="save-btn"
                className="btn-ovh me-1 text-white"
                color="success"
                disabled={!isCopyBtnEnabled}
              >
                Copy
              </CButton>
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CCol sm={3} className="text-end">
              <CFormLabel className="mt-1">
                Department:
                <span className={selectDepartment ? TextWhite : TextDanger}>
                  *
                </span>
              </CFormLabel>
            </CCol>
            <CCol sm={3}>
              <CFormSelect
                aria-label="Default select example"
                size="sm"
                id="department"
                data-testid="form-select1"
                name="department"
                value={selectDepartment}
                onChange={(e) => {
                  setSelectDepartment(Number(e.target.value))
                }}
              >
                <option value={''}>Select Department</option>
                {departments &&
                  departments?.map((department) => (
                    <option
                      key={department.departmentId}
                      value={department.departmentId}
                    >
                      {department.departmentName}
                    </option>
                  ))}
              </CFormSelect>
            </CCol>
          </CRow>

          <CRow className="mt-4 mb-4">
            <CCol sm={3} className="text-end">
              <CFormLabel className="mt-1">
                Designation:
                <span className={selectDesignation ? TextWhite : TextDanger}>
                  *
                </span>
              </CFormLabel>
            </CCol>
            <CCol sm={3}>
              <CFormSelect
                aria-label="Default select example"
                size="sm"
                className="form-control-not-allowed"
                id="designation"
                data-testid="form-select1"
                name="designation"
                defaultValue={selectDesignation}
                disabled={!selectDepartment}
                value={selectDesignation}
                onChange={(e) => {
                  setSelectDesignation(Number(e.target.value))
                }}
              >
                <option value={''}>Select Designation</option>
                {designations.map((designation, index) => (
                  <option key={index} value={designation.id}>
                    {designation.name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>
        </CForm>
        <AssignTemplateTable
          selectDepartment={selectDepartment as number}
          selectDesignation={selectDesignation as number}
          setCycleChecked={setCycleChecked}
          selChkBoxesFromApi={cbFromApi}
          checkList={checkList}
          cbFromApi={cbFromApi}
          cycleChecked={{
            id: 0,
            name: '',
            description: '',
            kpiLookps: null,
            count: 0,
            checkType: null,
            designationName: '',
            designationId: 0,
            departmentName: '',
            departmentId: 0,
            designationKraPercentage: 0,
          }}
        />
      </OCard>
    </>
  )
}

export default AssignTemplate
