import {
  CButton,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CRow,
  CSpinner,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import TrackerListTable from './TrackerListTable'
import OCard from '../../../../components/ReusableComponent/OCard'
import OToast from '../../../../components/ReusableComponent/OToast'
import { TextDanger } from '../../../../constant/ClassName'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'

const TrackerList = ({
  setToggle,
}: {
  setToggle: (value: string) => void
}): JSX.Element => {
  const [isTrackerName, setIsTrackerName] = useState('')
  const [isTrackerNameExist, setIsTrackerNameExist] = useState('')
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [isAddButtonEnabled, setIsAddButtonEnabled] = useState(false)

  const formLabelProps = {
    htmlFor: 'inputNewCertificateType',
    className: 'col-form-label',
  }

  const dispatch = useAppDispatch()

  const trackerList = useTypedSelector(
    reduxServices.ticketApprovals.selectors.trackerList,
  )

  useEffect(() => {
    dispatch(reduxServices.ticketApprovals.getTrackerList())
  }, [dispatch])

  const trackerNameExists = (name: string) => {
    return trackerList?.find((trackerName) => {
      return trackerName.name.toLowerCase() === name.toLowerCase()
    })
  }

  const handledInputChange = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target
    if (name === 'name') {
      const newValue = value.replace(/[^a-zA-Z\s]/gi, '').replace(/^\s*/, '')
      setIsTrackerName(newValue)
    }
    if (trackerNameExists(value)) {
      setIsTrackerNameExist(value)
    } else {
      setIsTrackerNameExist('')
    }
  }

  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked)
  }

  const successToast = (
    <OToast toastMessage="Tracker Added Successfully" toastColor="success" />
  )

  const addButtonHandler = async () => {
    const prepareObj = {
      name: isTrackerName,
      permission: isChecked,
    }
    const isAddTracker = await dispatch(
      reduxServices.addTrackersLists.addNewTracker(prepareObj),
    )
    if (
      reduxServices.addTrackersLists.addNewTracker.fulfilled.match(isAddTracker)
    ) {
      dispatch(reduxServices.ticketApprovals.getTrackerList())
      setIsTrackerName('')
      setIsChecked(false)
      dispatch(reduxServices.app.actions.addToast(successToast))
    }
  }

  const clearData = () => {
    setIsChecked(false)
    setIsTrackerName('')
    setIsTrackerNameExist('')
  }

  useEffect(() => {
    if (isTrackerName) {
      setIsAddButtonEnabled(true)
    } else {
      setIsAddButtonEnabled(false)
    }
  }, [isTrackerName])

  const isLoading = useTypedSelector(
    reduxServices.scheduledInterviews.selectors.isLoading,
  )

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Tracker List"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <CButton
              color="info"
              className="btn-ovh me-1"
              data-testid="back-button"
              onClick={() => setToggle('')}
            >
              <i className="fa fa-arrow-left  me-1"></i>Back
            </CButton>
          </CCol>
        </CRow>
        <CForm>
          <CRow className="mt-3 mb-3">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Name:
              <span className={isTrackerName ? 'text-white' : 'text-danger'}>
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                data-testid="tracker-name"
                type="text"
                id="Name"
                size="sm"
                name="name"
                placeholder="Name"
                maxLength={32}
                value={isTrackerName}
                onChange={handledInputChange}
              />
            </CCol>
            <CCol sm={3}>
              {isTrackerNameExist && (
                <p className={TextDanger} data-testid="nameAlreadyExist">
                  Name Already Exist
                </p>
              )}
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Work Flow:
            </CFormLabel>
            <CCol sm={3}>
              <CFormCheck
                data-testid="ch-All"
                id="workflow"
                name="workflow"
                checked={isChecked}
                onChange={handleChecked}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol md={{ span: 6, offset: 3 }}>
              <CButton
                data-testid="save-btn"
                className="btn-ovh me-1 text-white"
                color="success"
                onClick={addButtonHandler}
                disabled={
                  isAddButtonEnabled
                    ? isAddButtonEnabled && isTrackerNameExist.length > 0
                    : !isAddButtonEnabled
                }
              >
                Add
              </CButton>
              <CButton
                data-testid="clear-btn"
                color="warning"
                className="btn-ovh text-white"
                onClick={clearData}
              >
                Clear
              </CButton>
            </CCol>
          </CRow>
        </CForm>

        {isLoading !== ApiLoadingState.loading ? (
          <TrackerListTable />
        ) : (
          <>
            <CSpinner />
          </>
        )}
      </OCard>
    </>
  )
}
export default TrackerList
