import {
  CForm,
  CRow,
  CFormLabel,
  CCol,
  CFormInput,
  CFormCheck,
  CButton,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import moment from 'moment'
import { Cycle } from '../../../types/Finance/ITDeclarationList/itDeclarationListTypes'
import { showIsRequired } from '../../../utils/helper'
import { TextDanger, TextWhite } from '../../../constant/ClassName'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch } from '../../../stateStore'
import OToast from '../../../components/ReusableComponent/OToast'

const AddNewInvestmentCycle = (): JSX.Element => {
  const formLabelProps = {
    htmlFor: 'inputAddCycle',
    className: 'col-form-label addCycle-label',
  }
  const initialCycleDetails = {} as Cycle
  const [addCycle, setAddCycle] = useState(initialCycleDetails)
  const [cycleStartDate, setCycleStartDate] = useState<Date>()
  const [cycleEndDate, setCycleEndDate] = useState<string>()
  const [isButtonEnabled, setIsButtonEnabled] = useState(false)
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (addCycle.cycleName && cycleStartDate) {
      setIsButtonEnabled(true)
    } else {
      setIsButtonEnabled(false)
    }
  }, [addCycle.cycleName, cycleStartDate])

  const handleClearInputs = () => {
    setAddCycle({
      cycleName: '',
      active: false,
      cycleId: 0,
      endDate: '',
      startDate: '',
    })
    setCycleStartDate(undefined)
    setIsChecked(false)
  }

  const onChangeStartDateHandler = (date: Date) => {
    console.log(date)
    const endDate = moment(date).add(11, 'months').format('MM/YYYY')
    setCycleEndDate(endDate)
    setCycleStartDate(date)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAddCycle((prevState) => {
      return { ...prevState, ...{ [name]: value } }
    })
  }

  const toastElement = (
    <OToast
      toastColor="success"
      toastMessage="Finance Cycle added Successfully"
    />
  )

  const alreadyExistToastElement = (
    <OToast toastColor="danger" toastMessage="Cycle already Exist" />
  )

  const handleAddNewInvestmentCycle = async () => {
    const prepareObject = {
      ...addCycle,
      cycleId: -1,
      active: isChecked,
      endDate: cycleEndDate as string,
      ...{
        startDate: moment(cycleStartDate).format('MM/YYYY'),
      },
    }
    const cycleExist = {
      cycleId: -1,
      cycleName: addCycle.cycleName,
    }
    const isCycleExistsResultAction = await dispatch(
      reduxServices.itDeclarationList.isCycleExist(cycleExist),
    )
    if (
      reduxServices.itDeclarationList.isCycleExist.fulfilled.match(
        isCycleExistsResultAction,
      ) &&
      isCycleExistsResultAction.payload === false
    ) {
      const addCycleResultAction = await dispatch(
        reduxServices.itDeclarationList.addCycle(prepareObject),
      )

      if (
        reduxServices.itDeclarationList.addCycle.fulfilled.match(
          addCycleResultAction,
        )
      ) {
        dispatch(reduxServices.app.actions.addToast(toastElement))
        dispatch(reduxServices.itDeclarationList.getCycles())
        handleClearInputs()
      }
    } else {
      dispatch(reduxServices.app.actions.addToast(alreadyExistToastElement))
      handleClearInputs()
    }
  }

  return (
    <>
      <CForm>
        <CRow className="mt-4 mb-4">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Cycle Name:
            <span className={showIsRequired(addCycle?.cycleName)}>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              className="ps-2"
              data-testid="addCycle-cycle-name"
              type="text"
              name="cycleName"
              placeholder="Cycle Name"
              autoComplete="off"
              maxLength={50}
              onChange={handleInputChange}
              value={addCycle.cycleName}
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4" data-testid="dateOfBirthInput">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Start Date:
            <span className={cycleStartDate ? TextWhite : TextDanger}>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <ReactDatePicker
              autoComplete="off"
              className="form-control form-control-sm sh-date-picker"
              selected={cycleStartDate}
              onChange={(date: Date) => onChangeStartDateHandler(date)}
              dateFormat="MM/yyyy"
              maxDate={new Date()}
              showMonthYearPicker
              placeholderText="mm/yyyy"
              data-testid="startDate-picker-input"
            />
          </CCol>
        </CRow>
        {cycleStartDate && (
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              End Date:
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                disabled
                className="ps-2"
                data-testid="endDate-input"
                type="text"
                name="cycleEndDate"
                autoComplete="off"
                maxLength={50}
                value={cycleEndDate}
              />
            </CCol>
          </CRow>
        )}
        <CRow className="mt-2 mb-2">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Active:
          </CFormLabel>
          <CCol sm={3} className="mt-2">
            <CFormCheck
              name="workFlow"
              data-testid="ch-workFlow"
              onChange={() => setIsChecked(!isChecked)}
              checked={isChecked}
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CCol md={{ span: 6, offset: 3 }}>
            <CButton
              data-testid="ac-add-btn"
              className="btn-ovh me-1 text-white"
              color="success"
              onClick={handleAddNewInvestmentCycle}
              disabled={!isButtonEnabled}
            >
              Add
            </CButton>
            <CButton
              data-testid="ac-clear-btn"
              color="warning "
              className="btn-ovh text-white"
              onClick={handleClearInputs}
            >
              Clear
            </CButton>
          </CCol>
        </CRow>
      </CForm>
    </>
  )
}

export default AddNewInvestmentCycle
