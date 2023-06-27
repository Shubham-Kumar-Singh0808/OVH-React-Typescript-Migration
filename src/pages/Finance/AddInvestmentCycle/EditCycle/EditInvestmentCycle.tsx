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
import { Cycle } from '../../../../types/Finance/ITDeclarationList/itDeclarationListTypes'
import { showIsRequired } from '../../../../utils/helper'
import { TextDanger, TextWhite } from '../../../../constant/ClassName'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch } from '../../../../stateStore'
import OToast from '../../../../components/ReusableComponent/OToast'
import OModal from '../../../../components/ReusableComponent/OModal'
import OCard from '../../../../components/ReusableComponent/OCard'

const EditInvestmentCycle = ({
  editCycle,
}: {
  editCycle: Cycle
}): JSX.Element => {
  const formLabelProps = {
    htmlFor: 'inputAddCycle',
    className: 'col-form-label addCycle-label',
  }

  console.log(editCycle)

  const [editCycleCopy, setEditCycleCopy] = useState(editCycle)
  const [cycleStartDate, setCycleStartDate] = useState<string>(
    editCycle.startDate,
  )
  const [cycleEndDate, setCycleEndDate] = useState<string>(editCycle.endDate)
  const [isUpdateButtonEnabled, setIsUpdateButtonEnabled] = useState(false)
  const [isCycleChecked, setIsCycleChecked] = useState<boolean>(
    editCycle.active,
  )
  const [isActiveCycleModalVisible, setIsActiveCycleModalVisible] =
    useState(false)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (editCycleCopy.cycleName && cycleStartDate) {
      setIsUpdateButtonEnabled(true)
    } else {
      setIsUpdateButtonEnabled(false)
    }
  }, [editCycleCopy.cycleName, cycleStartDate])

  const onChangeStartDateHandler = (date: Date) => {
    const endDate = moment(date).add(11, 'months').format('MM/YYYY')
    setCycleEndDate(endDate)
    setCycleStartDate(moment(date).format('MM/YYYY'))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'cycleName') {
      const cycleNameValue = value.replace(/^\s*/, '')
      setEditCycleCopy((prevState) => {
        return { ...prevState, ...{ [name]: cycleNameValue } }
      })
    } else {
      setEditCycleCopy((prevState) => {
        return { ...prevState, ...{ [name]: value } }
      })
    }
  }

  const toastElement = (
    <OToast toastColor="success" toastMessage="Cycle Updated Successfully" />
  )

  const alreadyExistToastElement = (
    <OToast toastColor="danger" toastMessage="Cycle Name exist" />
  )
  const backButtonHandler = () => {
    dispatch(reduxServices.itDeclarationList.actions.clickBackButton())
  }
  const updateInvestmentCycle = async () => {
    const prepareObject = {
      ...editCycleCopy,
      active: isCycleChecked,
      endDate: cycleEndDate,
      startDate: cycleStartDate,
    }
    setIsActiveCycleModalVisible(false)
    const cycleExist = {
      cycleId: editCycleCopy.cycleId,
      cycleName: editCycleCopy.cycleName,
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
      const updateCycleResultAction = await dispatch(
        reduxServices.itDeclarationList.updateCycle(prepareObject),
      )

      if (
        reduxServices.itDeclarationList.updateCycle.fulfilled.match(
          updateCycleResultAction,
        )
      ) {
        dispatch(reduxServices.app.actions.addToast(toastElement))
        dispatch(reduxServices.itDeclarationList.getCycles())
        backButtonHandler()
      }
    } else {
      dispatch(reduxServices.app.actions.addToast(alreadyExistToastElement))
    }
  }

  const handleUpdateBtn = () => {
    if (isCycleChecked) {
      setIsActiveCycleModalVisible(true)
    } else {
      updateInvestmentCycle()
    }
  }

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Edit Cycle"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <CButton
              color="info"
              className="btn-ovh me-1"
              data-testid="ec-back-btn"
              onClick={backButtonHandler}
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
              <span className={showIsRequired(editCycle?.cycleName)}>*</span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                className="ps-2"
                data-testid="editCycle-cycle-name"
                type="text"
                name="cycleName"
                placeholder="Cycle Name"
                autoComplete="off"
                maxLength={50}
                onChange={handleInputChange}
                value={editCycleCopy.cycleName}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4" data-testid="dateOfBirthInput">
            <CFormLabel className="col-sm-3 col-form-label text-end">
              Start Date:
              <span className={editCycle?.startDate ? TextWhite : TextDanger}>
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <ReactDatePicker
                autoComplete="off"
                className="form-control form-control-sm sh-date-picker"
                value={cycleStartDate}
                onChange={(date: Date) => onChangeStartDateHandler(date)}
                dateFormat="MM/yyyy"
                maxDate={new Date()}
                showMonthYearPicker
                placeholderText="mm/yyyy"
                data-testid="startDate-input"
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
                data-testid="ch-active"
                onChange={() => setIsCycleChecked(!isCycleChecked)}
                checked={isCycleChecked}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CCol md={{ span: 6, offset: 3 }}>
              <CButton
                data-testid="ec-update-btn"
                className="btn-ovh me-1 text-white"
                color="success"
                onClick={handleUpdateBtn}
                disabled={!isUpdateButtonEnabled}
              >
                Update
              </CButton>
            </CCol>
          </CRow>
        </CForm>
      </OCard>
      <OModal
        visible={isActiveCycleModalVisible}
        setVisible={setIsActiveCycleModalVisible}
        modalBodyClass="mt-0"
        modalTitle="Activate Cycle"
        confirmButtonText="Yes"
        cancelButtonText="No"
        closeButtonClass="d-none"
        confirmButtonAction={updateInvestmentCycle}
      >
        <>Do you really want to activate this cycle ?</>
      </OModal>
    </>
  )
}

export default EditInvestmentCycle
