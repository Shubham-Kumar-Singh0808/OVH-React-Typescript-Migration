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
import { deviceLocale } from '../../../../utils/dateFormatUtils'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { NominationCycleDto } from '../../../../types/Settings/InitiateCycle/initiateCycleTypes'
import OToast from '../../../../components/ReusableComponent/OToast'

const EditInitiateCycle = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const [isButtonEnabled, setIsButtonEnabled] = useState(false)
  const editCycles = {} as NominationCycleDto
  const [editInitiateCycle, setEditInitiateCycle] = useState(editCycles)
  const [cycleFromMonth, setCycleFromMonth] = useState<string>('')
  const [cycleToMonth, setCycleToMonth] = useState<string>('')
  const [cycleFromDate, setCycleFromDate] = useState<string>('')
  const [cycleToDate, setCycleToDate] = useState<string>('')
  const [isChecked, setIsChecked] = useState<boolean>(
    editInitiateCycle.activateFlag,
  )

  const editCycle = useTypedSelector(
    reduxServices.initiateCycle.selectors.editCycles,
  )

  useEffect(() => {
    if (editCycle != null) {
      setEditInitiateCycle(editCycle)
      setCycleFromMonth(editCycle.fromMonth)
      setCycleToMonth(editCycle.toMonth)
      setCycleFromDate(editCycle.startDate)
      setCycleToDate(editCycle.endDate)
    }
  }, [editCycle])

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'cycleName') {
      const cycleNameInput = value.replace(/^\s*/, '')
      setEditInitiateCycle((prevState) => {
        return { ...prevState, ...{ [name]: cycleNameInput } }
      })
    } else {
      setEditInitiateCycle((prevState) => {
        return { ...prevState, ...{ [name]: value } }
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

  const updateSuccessToastMessage = (
    <OToast toastMessage="Cycle updated successfully" toastColor="success" />
  )
  const updateFailedToastMessage = (
    <OToast
      toastMessage="  Sorry, Cycle already exist for this duration"
      toastColor="danger"
      data-testid="failedToast"
    />
  )

  const updateCycle = async () => {
    const prepareObject = {
      ...editInitiateCycle,
      endDate: cycleToDate,
      startDate: cycleFromDate,
      fromMonth: cycleFromMonth,
      toMonth: cycleToMonth,
      activateFlag: isChecked,
    }
    const updateCycleResultAction = await dispatch(
      reduxServices.initiateCycle.updateCycle(prepareObject),
    )
    if (
      reduxServices.initiateCycle.updateCycle.fulfilled.match(
        updateCycleResultAction,
      )
    ) {
      dispatch(reduxServices.app.actions.addToast(updateSuccessToastMessage))
      dispatch(reduxServices.app.actions.addToast(undefined))
    } else if (
      reduxServices.initiateCycle.updateCycle.rejected.match(
        updateCycleResultAction,
      ) &&
      updateCycleResultAction.payload === 409
    ) {
      dispatch(reduxServices.app.actions.addToast(updateFailedToastMessage))
      dispatch(reduxServices.app.actions.addToast(undefined))
    }
  }

  const onChangeStartDateHandler = (date: Date) => {
    setCycleFromMonth(moment(date).format('MM/YYYY'))
    setCycleToMonth(moment(date).format('MM/YYYY'))
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
                dispatch(
                  reduxServices.initiateCycle.actions.setToggle('addCycle'),
                )
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
                className="form-control form-control-sm sh-date-picker form-control-not-allowed"
                value={cycleFromMonth}
                onChange={(date: Date) => onChangeStartDateHandler(date)}
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
                className="form-control form-control-sm sh-date-picker form-control-not-allowed"
                value={cycleToMonth}
                onChange={(date: Date) => onChangeStartDateHandler(date)}
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
                className="form-control form-control-sm sh-date-picker form-control-not-allowed"
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
                data-testid="cycleFromDate-input"
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
                className="form-control form-control-sm sh-date-picker form-control-not-allowed"
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
                onChange={() => setIsChecked(!isChecked)}
                checked={isChecked}
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
              onClick={updateCycle}
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
