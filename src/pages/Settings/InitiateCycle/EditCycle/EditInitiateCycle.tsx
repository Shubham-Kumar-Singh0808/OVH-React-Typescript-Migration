import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CRow,
} from '@coreui/react-pro'
import ReactDatePicker from 'react-datepicker'
import moment from 'moment'
import { TextDanger, TextWhite } from '../../../../constant/ClassName'
import OCard from '../../../../components/ReusableComponent/OCard'
import { NominationCycleDto } from '../../../../types/Settings/InitiateCycle/initiateCycleTypes'
import { deviceLocale } from '../../../../utils/dateFormatUtils'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch } from '../../../../stateStore'

const EditInitiateCycle = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const [isButtonEnabled, setIsButtonEnabled] = useState(false)
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const editCycles = {} as NominationCycleDto
  const [editInitiateCycle, setEditInitiateCycle] = useState(editCycles)
  const [cycleFromMonth, setCycleFromMonth] = useState<string>(
    editInitiateCycle.fromMonth,
  )
  const [cycleToMonth, setCycleToMonth] = useState<string>(
    editInitiateCycle.toMonth,
  )

  const [cycleFromDate, setCycleFromDate] = useState<string>(
    editInitiateCycle.startDate,
  )
  const [cycleToDate, setCycleToDate] = useState<string>(
    editInitiateCycle.endDate,
  )

  const commonFormatDate = 'L'
  const onChangeHandler = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    if (name === 'cycleName') {
      const cycleNameInput = value.replace(/\D/g, '')
      setEditInitiateCycle((values) => {
        return { ...values, ...{ [name]: cycleNameInput } }
      })
    }
  }

  useEffect(() => {
    if (
      editInitiateCycle?.cycleName &&
      cycleFromMonth &&
      cycleToMonth &&
      cycleFromDate &&
      cycleToDate
    ) {
      setIsButtonEnabled(true)
    } else {
      setIsButtonEnabled(false)
    }
  }, [
    editInitiateCycle,
    cycleFromMonth,
    cycleToMonth,
    cycleToDate,
    cycleFromDate,
  ])

  const formLabelProps = {
    htmlFor: 'inputNewHandbook',
    className: 'col-form-label category-label',
  }

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Edit Month Cycle"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <CButton
              color="info"
              className="btn-ovh me-1"
              data-testid="back-button"
              onClick={() =>
                dispatch(reduxServices.initiateCycle.actions.setToggle(''))
              }
            >
              <i className="fa fa-arrow-left  me-1"></i>Back
            </CButton>
          </CCol>
        </CRow>
        <CForm>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Cycle Name:
              <span
                className={
                  editInitiateCycle?.cycleName ? TextWhite : TextDanger
                }
              >
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                data-testid="cycleName"
                type="text"
                id="cycleName"
                autoComplete="off"
                size="sm"
                name="cycleName"
                placeholder="Enter Cycle Name"
                value={editInitiateCycle?.cycleName}
                onChange={onChangeHandler}
              />
            </CCol>
          </CRow>
          <CRow className="mt-3">
            <CCol sm={3} md={3} className="text-end">
              <CFormLabel className="mt-2 text-decoration-none">
                From Month :
                <span
                  className={
                    editInitiateCycle?.fromMonth ? TextWhite : TextDanger
                  }
                >
                  *
                </span>
              </CFormLabel>
            </CCol>
            <CCol sm={3}>
              <ReactDatePicker
                autoComplete="off"
                className="form-control form-control-sm sh-date-picker"
                value={cycleFromMonth}
                onChange={(date: Date) => {
                  setCycleFromMonth(moment(date).format(commonFormatDate))
                }}
                dateFormat="MM/yyyy"
                maxDate={new Date()}
                showMonthYearPicker
                placeholderText="mm/yyyy"
                data-testid="cycleFromMonth-input"
              />
            </CCol>
          </CRow>
          <CRow className="mt-3">
            <CCol sm={3} md={3} className="text-end">
              <CFormLabel className="mt-2 text-decoration-none">
                To Month :
                <span
                  className={
                    editInitiateCycle?.toMonth ? TextWhite : TextDanger
                  }
                >
                  *
                </span>
              </CFormLabel>
            </CCol>
            <CCol sm={3}>
              <ReactDatePicker
                autoComplete="off"
                className="form-control form-control-sm sh-date-picker"
                value={cycleToMonth}
                onChange={(date: Date) => {
                  setCycleToMonth(moment(date).format(commonFormatDate))
                }}
                dateFormat="MM/yyyy"
                maxDate={new Date()}
                showMonthYearPicker
                placeholderText="mm/yyyy"
                data-testid="cycleToMonth-input"
              />
            </CCol>
          </CRow>
          <CRow className="mt-3">
            <CCol sm={3} md={3} className="text-end">
              <CFormLabel className="mt-1">
                From Date :
                <span
                  className={
                    editInitiateCycle?.startDate ? TextWhite : TextDanger
                  }
                >
                  *
                </span>
              </CFormLabel>
            </CCol>
            <CCol sm={3}>
              <ReactDatePicker
                autoComplete="off"
                className="form-control form-control-sm sh-date-picker"
                value={cycleFromDate}
                onChange={(date: Date) =>
                  setCycleFromDate(
                    date
                      ? new Date(date).toLocaleDateString(deviceLocale, {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                        })
                      : '',
                  )
                }
                dateFormat="dd/mm/yyyy"
                maxDate={new Date()}
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                placeholderText="dd/mm/yyyy"
                name="cycleStartDate"
                data-testid="cycleStartDate-input"
              />
            </CCol>
          </CRow>
          <CRow className="mt-3">
            <CCol sm={3} md={3} className="text-end">
              <CFormLabel className="mt-1">
                To Date :
                <span
                  className={
                    editInitiateCycle?.endDate ? TextWhite : TextDanger
                  }
                >
                  *
                </span>
              </CFormLabel>
            </CCol>
            <CCol sm={3}>
              <ReactDatePicker
                autoComplete="off"
                className="form-control form-control-sm sh-date-picker"
                value={cycleToDate}
                onChange={(date: Date) =>
                  setCycleToDate(
                    date
                      ? new Date(date).toLocaleDateString(deviceLocale, {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                        })
                      : '',
                  )
                }
                dateFormat="dd/mm/yyyy"
                maxDate={new Date()}
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                placeholderText="dd/mm/yyyy"
                name="cycleToDate"
                data-testid="cycleToDate-input"
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Activate :
            </CFormLabel>
            <CCol sm={3} className="pt-2">
              <CFormCheck
                data-testid="ch-All"
                id="activate"
                name="activate"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              />
            </CCol>
          </CRow>
        </CForm>
        <CRow>
          <CCol md={{ span: 6, offset: 3 }}>
            <CButton
              data-testid="update-btn"
              className="btn-ovh me-1 text-white"
              color="success"
              disabled={!isButtonEnabled}
            >
              Update
            </CButton>
          </CCol>
        </CRow>
      </OCard>
    </>
  )
}

export default EditInitiateCycle
