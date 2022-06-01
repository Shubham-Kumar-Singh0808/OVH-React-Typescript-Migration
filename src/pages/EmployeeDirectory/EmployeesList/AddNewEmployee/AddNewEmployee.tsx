import {
  Birthday,
  DateOfJoining,
  Department,
  Experience,
  FullName,
  Gender,
  UserNameEmail,
} from './index'
import {
  CButton,
  CCol,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormSwitch,
  CRow,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'

import DatePicker from 'react-datepicker'
import OCard from '../../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../../reducers/reduxServices'

const AddNewEmployee = (): JSX.Element => {
  const [contractIsDisable, setContractIsDisable] = useState<boolean>(false)
  const dynamicFormLabelProps = (htmlFor: string, className: string) => {
    return {
      htmlFor: htmlFor,
      className: className,
    }
  }
  const onDateChangeHandler = (e: Date) => {
    console.log(e)
  }

  //   const handleContractIsDisable = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     console.log(e.currentTarget.value)
  //   }

  //making dispatch
  const dispatch = useAppDispatch()
  const isLoading = useTypedSelector(
    reduxServices.getEmpDepartments.employeeDepartmentsService.selectors
      .isLoading,
  )
  const departmentsList = useTypedSelector(
    reduxServices.getEmpDepartments.employeeDepartmentsService.selectors
      .employeeDepartments,
  )
  useEffect(() => {
    dispatch(
      reduxServices.getEmpDepartments.employeeDepartmentsService.getEmployeeDepartments(),
    )
  }, [dispatch])

  return (
    <>
      <OCard
        className="mb-4"
        title="Add New Employee"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end mb-3">
          <CCol className="text-end" md={4}>
            <CButton color="info" className="btn-ovh me-1">
              <i className="fa fa-arrow-left  me-1"></i>Back
            </CButton>
          </CCol>
        </CRow>

        <UserNameEmail dynamicFormLabelProps={dynamicFormLabelProps} />

        <FullName dynamicFormLabelProps={dynamicFormLabelProps} />

        <Gender dynamicFormLabelProps={dynamicFormLabelProps} />

        <Birthday
          dynamicFormLabelProps={dynamicFormLabelProps}
          onDateChangeHandler={onDateChangeHandler}
        />

        <DateOfJoining
          dynamicFormLabelProps={dynamicFormLabelProps}
          onDateChangeHandler={onDateChangeHandler}
        />

        <Experience dynamicFormLabelProps={dynamicFormLabelProps} />

        <Department
          dynamicFormLabelProps={dynamicFormLabelProps}
          departmentsList={departmentsList}
        />

        <CRow className="mb-3">
          <CFormLabel
            {...dynamicFormLabelProps(
              'technology',
              'col-sm-3 col-form-label text-end',
            )}
          >
            Technology:
            <span
            //   className={
            //     employeeBasicInformationEditData.curentLocation
            //       ? 'text-white'
            //       : 'text-danger'
            //   }
            >
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              id="technology"
              size="sm"
              aria-label="technology"
              name="technology"
              value=""
            >
              <option value={''}>Select Technology</option>
              <option value="Accounts">Accounts</option>
              <option value="Marketing">Marketing</option>
              <option value="Networking">Networking</option>
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel
            {...dynamicFormLabelProps(
              'designation',
              'col-sm-3 col-form-label text-end',
            )}
          >
            Designation:
            <span
            //   className={
            //     employeeBasicInformationEditData.curentLocation
            //       ? 'text-white'
            //       : 'text-danger'
            //   }
            >
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              id="designation"
              size="sm"
              aria-label="designation"
              name="designation"
              value=""
            >
              <option value={''}>Select Designation</option>
              <option value="Accounts">Accounts</option>
              <option value="Marketing">Marketing</option>
              <option value="Networking">Networking</option>
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel
            {...dynamicFormLabelProps(
              'role',
              'col-sm-3 col-form-label text-end',
            )}
          >
            Role:
            <span
            //   className={
            //     employeeBasicInformationEditData.curentLocation
            //       ? 'text-white'
            //       : 'text-danger'
            //   }
            >
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              id="role"
              size="sm"
              aria-label="role"
              name="role"
              value=""
            >
              <option value={''}>Select Role</option>
              <option value="Accounts">Accounts</option>
              <option value="Marketing">Marketing</option>
              <option value="Networking">Networking</option>
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel
            {...dynamicFormLabelProps(
              'reportingmanager',
              'col-sm-3 col-form-label text-end',
            )}
          >
            Reporting Manager:
            <span
            //   className={
            //     employeeBasicInformationEditData.curentLocation
            //       ? 'text-white'
            //       : 'text-danger'
            //   }
            >
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              id="reportingmanager"
              size="sm"
              type="text"
              name="reportingmanager"
              placeholder="Reporting Manager"
              value=""
            />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel
            {...dynamicFormLabelProps(
              'projectmanager',
              'col-sm-3 col-form-label text-end',
            )}
          >
            Project Manager:
            <span
            //   className={
            //     employeeBasicInformationEditData.curentLocation
            //       ? 'text-white'
            //       : 'text-danger'
            //   }
            >
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              id="projectmanager"
              size="sm"
              type="text"
              name="projectmanager"
              placeholder="Project Manager"
              value=""
            />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel
            {...dynamicFormLabelProps(
              'hrassociate',
              'col-sm-3 col-form-label text-end',
            )}
          >
            HR Associate:
            <span
            //   className={
            //     employeeBasicInformationEditData.curentLocation
            //       ? 'text-white'
            //       : 'text-danger'
            //   }
            >
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              id="hrassociate"
              size="sm"
              type="text"
              name="hrassociate"
              placeholder="HR Associate"
              value=""
            />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel
            {...dynamicFormLabelProps(
              'employmenttype',
              'col-sm-3 col-form-label text-end',
            )}
          >
            Employment Type:
            <span
            //   className={
            //     employeeBasicInformationEditData.curentLocation
            //       ? 'text-white'
            //       : 'text-danger'
            //   }
            >
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              id="employmenttype"
              size="sm"
              aria-label="employmenttype"
              name="employmenttype"
              value=""
            >
              <option value={''}>Select Type</option>
              <option value="Accounts">Accounts</option>
              <option value="Marketing">Marketing</option>
              <option value="Networking">Networking</option>
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel
            {...dynamicFormLabelProps(
              'jobtype',
              'col-sm-3 col-form-label text-end',
            )}
          >
            Job Type:
            <span
            //   className={
            //     employeeBasicInformationEditData.curentLocation
            //       ? 'text-white'
            //       : 'text-danger'
            //   }
            >
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              id="jobtype"
              size="sm"
              aria-label="jobtype"
              name="jobtype"
              value=""
            >
              <option value={''}>Select Job Type</option>
              <option value="Accounts">Accounts</option>
              <option value="Marketing">Marketing</option>
              <option value="Networking">Networking</option>
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel
            {...dynamicFormLabelProps(
              'country',
              'col-sm-3 col-form-label text-end',
            )}
          >
            Country:
            <span
            //   className={
            //     employeeBasicInformationEditData.curentLocation
            //       ? 'text-white'
            //       : 'text-danger'
            //   }
            >
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              id="country"
              size="sm"
              aria-label="country"
              name="country"
              value=""
            >
              <option value={''}>Select Country</option>
              <option value="Accounts">Accounts</option>
              <option value="Marketing">Marketing</option>
              <option value="Networking">Networking</option>
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel
            {...dynamicFormLabelProps(
              'shift',
              'col-sm-3 col-form-label text-end',
            )}
          >
            Shift:
            <span
            //   className={
            //     employeeBasicInformationEditData.curentLocation
            //       ? 'text-white'
            //       : 'text-danger'
            //   }
            >
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              id="shift"
              size="sm"
              aria-label="shift"
              name="shift"
              value=""
            >
              <option value={''}>Select Shift</option>
              <option value="Accounts">Accounts</option>
              <option value="Marketing">Marketing</option>
              <option value="Networking">Networking</option>
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mb-3 align-items-center">
          <CFormLabel
            {...dynamicFormLabelProps(
              'employmentcontract',
              'col-sm-3 col-form-label text-end',
            )}
          >
            Employment Contract:
            <span
            //   className={
            //     employeeBasicInformationEditData.curentLocation
            //       ? 'text-white'
            //       : 'text-danger'
            //   }
            >
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormCheck
              inline
              type="radio"
              name="employmentcontract"
              id="inlineCheckbox1"
              value="Yes"
              label="Yes"
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                setContractIsDisable(true)
              }
            />
            <CFormCheck
              inline
              type="radio"
              name="employmentcontract"
              id="inlineCheckbox2"
              value="No"
              label="No"
              defaultChecked
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                setContractIsDisable(false)
              }
            />
          </CCol>
        </CRow>
        {contractIsDisable ? (
          <>
            <CRow className="mb-3">
              <CFormLabel
                {...dynamicFormLabelProps(
                  'contractstartdate',
                  'col-sm-3 col-form-label text-end',
                )}
              >
                Contract Start Date:
                <span
                //   className={
                //     employeeBasicInformationEditData.curentLocation
                //       ? 'text-white'
                //       : 'text-danger'
                //   }
                >
                  *
                </span>
              </CFormLabel>
              <CCol sm={3}>
                <DatePicker
                  id="contractstartdate"
                  className="form-control form-control-sm sh-date-picker"
                  maxDate={new Date()}
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  placeholderText="dd/mm/yyyy"
                  name="contractstartdate"
                  value=""
                  onChange={(date: Date) => onDateChangeHandler(date)}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                {...dynamicFormLabelProps(
                  'contractenddate',
                  'col-sm-3 col-form-label text-end',
                )}
              >
                Contract End Date:
                <span
                //   className={
                //     employeeBasicInformationEditData.curentLocation
                //       ? 'text-white'
                //       : 'text-danger'
                //   }
                >
                  *
                </span>
              </CFormLabel>
              <CCol sm={3}>
                <DatePicker
                  id="contractenddate"
                  className="form-control form-control-sm sh-date-picker"
                  maxDate={new Date()}
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  placeholderText="dd/mm/yyyy"
                  name="contractenddate"
                  value=""
                  onChange={(date: Date) => onDateChangeHandler(date)}
                />
                <span></span>
              </CCol>
            </CRow>
          </>
        ) : (
          <></>
        )}

        <CRow className="mb-3 align-items-center">
          <CFormLabel
            {...dynamicFormLabelProps(
              'workfrom',
              'col-sm-3 col-form-label text-end',
            )}
          >
            Work From:
            <span
            //   className={
            //     employeeBasicInformationEditData.curentLocation
            //       ? 'text-white'
            //       : 'text-danger'
            //   }
            >
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSwitch
              size="lg"
              label="No"
              id="formSwitchCheckCheckedDisabled"
              defaultChecked
            />

            <CFormCheck
              inline
              type="radio"
              name="workfrom"
              id="inlineCheckbox1"
              value="Office"
              label="Office"
              defaultChecked
            />
            <CFormCheck
              inline
              type="radio"
              name="workfrom"
              id="inlineCheckbox2"
              value="Home"
              label="Home"
            />
          </CCol>
        </CRow>
        <CRow className="mb-3 align-items-center">
          <CCol sm={{ span: 6, offset: 3 }}>
            <CButton className="btn-ovh me-1" color="success">
              Add
            </CButton>
            <CButton color="warning " className="btn-ovh">
              Clear
            </CButton>
          </CCol>
        </CRow>
      </OCard>
    </>
  )
}

export default AddNewEmployee
