import {
  CButton,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTooltip,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import OCard from '../../../../components/ReusableComponent/OCard'
import OToast from '../../../../components/ReusableComponent/OToast'
import { TextDanger } from '../../../../constant/ClassName'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'

const AddTrackerList = (): JSX.Element => {
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

  useEffect(() => {
    dispatch(reduxServices.ticketApprovals.getTrackerList())
  }, [dispatch])

  const deleteSuccessToastMessage = (
    <OToast toastMessage="Tracker Deleted Successfully" toastColor="success" />
  )

  const deleteFailedToastMessage = (
    <OToast
      toastMessage="This tracker is already used in tickets, So you cannot delete"
      toastColor="danger"
    />
  )

  const deleteTrackerButtonHandler = async (id: number) => {
    const isDeleteTracker = await dispatch(
      reduxServices.addTrackersLists.deleteTrackerList(id),
    )
    if (
      reduxServices.addTrackersLists.deleteTrackerList.fulfilled.match(
        isDeleteTracker,
      )
    ) {
      dispatch(reduxServices.ticketApprovals.getTrackerList())
      dispatch(reduxServices.app.actions.addToast(deleteSuccessToastMessage))
    } else if (
      (reduxServices.addTrackersLists.deleteTrackerList.rejected.match(
        isDeleteTracker,
      ) &&
        isDeleteTracker.payload === 405) ||
      isDeleteTracker.payload === 500
    ) {
      await dispatch(
        reduxServices.app.actions.addToast(deleteFailedToastMessage),
      )
      dispatch(reduxServices.app.actions.addToast(undefined))
    }
  }

  const clearData = () => {
    setIsChecked(false)
    setIsTrackerName('')
  }

  useEffect(() => {
    if (isTrackerName) {
      setIsAddButtonEnabled(true)
    } else {
      setIsAddButtonEnabled(false)
    }
  }, [isTrackerName])

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
            <Link to={`/createTicket`}>
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
                <p className={TextDanger} data-testid="name-already-exist">
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
          <CTable striped responsive className="mt-5">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Approval</CTableHeaderCell>
                <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {trackerList.map((tracker, index) => {
                return (
                  <CTableRow key={index}>
                    <CTableDataCell>{index + 1}</CTableDataCell>
                    <CTableDataCell>{tracker.name}</CTableDataCell>
                    <CTableDataCell>
                      <CFormCheck
                        className="cursor-not-allowed"
                        name="workflow"
                        checked={tracker.permission}
                        disabled={true}
                      />
                    </CTableDataCell>
                    <CTableDataCell>
                      <CTooltip content="Delete">
                        <CButton
                          data-testid={`btn-delete${index}`}
                          size="sm"
                          className="btn-ovh me-2 cursor-pointer"
                          color="danger btn-ovh me-2"
                          onClick={() => deleteTrackerButtonHandler(tracker.id)}
                        >
                          <i className="fa fa-trash-o" aria-hidden="true"></i>
                        </CButton>
                      </CTooltip>
                    </CTableDataCell>
                  </CTableRow>
                )
              })}
            </CTableBody>
          </CTable>
          <CRow>
            <CCol xs={4}>
              <p>
                <strong>Total Records: {trackerList.length}</strong>
              </p>
            </CCol>
          </CRow>
        </CForm>
      </OCard>
    </>
  )
}
export default AddTrackerList
