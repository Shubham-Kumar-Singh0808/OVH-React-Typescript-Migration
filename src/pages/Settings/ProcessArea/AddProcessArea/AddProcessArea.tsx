import {
  CRow,
  CCol,
  CButton,
  CForm,
  CFormLabel,
  CFormSelect,
  CFormInput,
  CFormCheck,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import OCard from '../../../../components/ReusableComponent/OCard'
import OToast from '../../../../components/ReusableComponent/OToast'
import { TextWhite, TextDanger } from '../../../../constant/ClassName'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'

const AddProcessArea = ({
  setToggle,
}: {
  setToggle: (value: string) => void
}): JSX.Element => {
  const [selectCategory, setSelectCategory] = useState<number | string>()
  const [documentName, setDocumentName] = useState<string>('')
  const [responsible, setResponsible] = useState<string>('')
  const [documentLink, setDocumentLink] = useState<string>('')
  const [selectProcessAreaName, setSelectProcessAreaName] = useState<
    number | string
  >()
  const [selectActiveStatus, setSelectActiveStatus] = useState<boolean>(true)
  const [selectOrder, setSelectOrder] = useState<string>('')
  const [isAddButtonEnabled, setIsAddButtonEnabled] = useState(false)
  const [documentNameExist, setDocumentNameExist] = useState('')

  useEffect(() => {
    if (
      selectCategory &&
      documentName &&
      responsible &&
      documentLink &&
      selectProcessAreaName &&
      !selectActiveStatus
    ) {
      setIsAddButtonEnabled(true)
    } else if (
      selectCategory &&
      documentName &&
      responsible &&
      documentLink &&
      selectProcessAreaName &&
      selectActiveStatus &&
      selectOrder
    ) {
      setIsAddButtonEnabled(true)
    } else {
      setIsAddButtonEnabled(false)
    }
  }, [
    selectCategory,
    documentName,
    responsible,
    documentLink,
    selectProcessAreaName,
    selectOrder,
    selectActiveStatus,
  ])

  const formLabelProps = {
    htmlFor: 'inputNewHandbook',
    className: 'col-form-label category-label',
  }

  const ProjectTailoringList = useTypedSelector(
    reduxServices.processArea.selectors.ProjectTailoringList,
  )

  const ProcessArea = useTypedSelector(
    reduxServices.processArea.selectors.ProcessArea,
  )

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (selectCategory)
      dispatch(
        reduxServices.processArea.getProcessAreas(selectCategory as number),
      )
  }, [dispatch, selectCategory])

  const trackerNameExists = (name: string) => {
    return ProcessArea?.find((trackerName) => {
      return trackerName.name.toLowerCase() === name.toLowerCase()
    })
  }
  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target
    if (name === 'documentName') {
      const newValue = value.replace(/^\s*/, '').replace(/[^a-z\s]/gi, '')
      setDocumentName(newValue)
    } else if (name === 'responsible') {
      const newValue = value.replace(/-_[^a-z0-9\s]/gi, '').replace(/^\s*/, '')
      setResponsible(newValue)
    } else if (name === 'documentLink') {
      const newValue = value.replace(/-_[^a-z0-9\s]/gi, '').replace(/^\s*/, '')
      setDocumentLink(newValue)
    } else if (name === 'selectOrder') {
      const newValue = value.replace(/\D/g, '').replace(/^0+/, '')
      setSelectOrder(newValue)
    } else if (name === 'activeState') {
      setSelectActiveStatus(value === 'true')
    }
    if (trackerNameExists(value)) {
      setDocumentNameExist(value)
    } else {
      setDocumentNameExist('')
    }
  }

  const clearData = () => {
    setDocumentName('')
    setResponsible('')
    setDocumentLink('')
    setSelectActiveStatus(true)
    setSelectOrder('')
    setSelectCategory('')
    setSelectProcessAreaName('')
  }

  const maxObjectProject = ProjectTailoringList[0]?.processSubHeadsDto.reduce(
    (prev, current) => (prev.order > current.order ? prev : current),
  )
  const maxObjEng = ProjectTailoringList[1]?.processSubHeadsDto.reduce(
    (prev, current) => (prev.order > current.order ? prev : current),
  )
  const maxObjSupport = ProjectTailoringList[2]?.processSubHeadsDto.reduce(
    (prev, current) => (prev.order > current.order ? prev : current),
  )
  const maxOrderProject = Number(maxObjectProject?.order) + 1
  const maxOrderEng = Number(maxObjEng?.order) + 1
  const maxOrderSupport = Number(maxObjSupport?.order) + 1

  const addedToastMessage = (
    <OToast
      toastMessage="Process Area saved successfully.
    "
      toastColor="success"
    />
  )

  const orderErrorToastMessage = (maxOrder: number) => (
    <OToast
      toastMessage={`order should be ${maxOrder} or below ${maxOrder}`}
      toastColor="danger"
    />
  )

  const dispatchFunctions = () => {
    dispatch(
      reduxServices.processArea.getOrderCountOfActiveProcesses(
        Number(selectCategory),
      ),
    )
    dispatch(
      reduxServices.processArea.incrementOrDecrementOrder({
        categoryId: Number(selectCategory),
        documentName,
        link: documentLink,
        order: selectOrder,
        processAreaId: Number(selectProcessAreaName),
        responsible,
        status: selectActiveStatus,
      }),
    )
    dispatch(
      reduxServices.processArea.saveProcessArea({
        categoryId: Number(selectCategory),
        documentName,
        link: documentLink,
        order: selectOrder,
        processAreaId: Number(selectProcessAreaName),
        responsible,
        status: selectActiveStatus,
      }),
    )
    dispatch(reduxServices.processArea.getProjectTailoringDocument('totalList'))
    dispatch(reduxServices.app.actions.addToast(addedToastMessage))
    setToggle('')
  }

  const addButtonHandler = async () => {
    if (selectCategory === '1' && Number(selectOrder) > maxOrderProject) {
      dispatch(
        reduxServices.processArea.getOrderCountOfActiveProcesses(
          Number(selectCategory),
        ),
      )
      dispatch(
        reduxServices.app.actions.addToast(
          orderErrorToastMessage(maxOrderProject),
        ),
      )
    } else if (
      selectCategory === '1' &&
      Number(selectOrder) <= maxOrderProject
    ) {
      await dispatch(
        reduxServices.processArea.getOrderCountOfActiveProcesses(
          Number(selectCategory),
        ),
      )
      dispatchFunctions()
    }
    if (selectCategory === '2' && Number(selectOrder) > maxOrderEng) {
      dispatch(
        reduxServices.processArea.getOrderCountOfActiveProcesses(
          Number(selectCategory),
        ),
      )
      dispatch(
        reduxServices.app.actions.addToast(orderErrorToastMessage(maxOrderEng)),
      )
    } else if (selectCategory === '2' && Number(selectOrder) <= maxOrderEng) {
      await dispatch(
        reduxServices.processArea.getOrderCountOfActiveProcesses(
          Number(selectCategory),
        ),
      )
      dispatchFunctions()
    }
    if (selectCategory === '3' && Number(selectOrder) > maxOrderSupport) {
      dispatch(
        reduxServices.processArea.getOrderCountOfActiveProcesses(
          Number(selectCategory),
        ),
      )
      dispatch(
        reduxServices.app.actions.addToast(
          orderErrorToastMessage(maxOrderSupport),
        ),
      )
    } else if (
      selectCategory === '3' &&
      Number(selectOrder) <= maxOrderSupport
    ) {
      await dispatch(
        reduxServices.processArea.getOrderCountOfActiveProcesses(
          Number(selectCategory),
        ),
      )
      dispatchFunctions()
    }
  }

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Add Process Area"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CForm>
          <CRow className="mt-2 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Category:
              <span className={selectCategory ? TextWhite : TextDanger}>*</span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormSelect
                aria-label="Default select example"
                size="sm"
                id="selectCategory"
                data-testid="form-select1"
                name="selectCategory"
                value={selectCategory}
                onChange={(e) => setSelectCategory(e.target.value)}
              >
                <option value={''}>-- Select Category --</option>
                {ProjectTailoringList?.map((item, index) => (
                  <option key={index} value={item.processHeadId}>
                    {item.processHeadname}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol className="text-end" md={6}>
              <CButton
                color="info"
                className="btn-ovh me-1"
                data-testid="back-btn"
                onClick={() => setToggle('')}
              >
                <i className="fa fa-arrow-left  me-1"></i>Back
              </CButton>
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Process Area Name:
              <span className={selectProcessAreaName ? TextWhite : TextDanger}>
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormSelect
                aria-label="Default select example"
                size="sm"
                id="selectProcessAreaName"
                data-testid="form-select2"
                name="selectProcessAreaName"
                value={selectProcessAreaName}
                onChange={(e) => setSelectProcessAreaName(e.target.value)}
              >
                <option value={''}>-- Select Process Areas --</option>
                {ProcessArea?.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol className="col-sm-3">
              <CButton
                color="info btn-ovh me-1"
                data-testid="add-inner"
                onClick={() => setToggle('addNewProcessArea')}
              >
                <i className="fa fa-plus me-1"></i>Add
              </CButton>
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Document Name:
              <span className={documentName ? TextWhite : TextDanger}>*</span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                data-testid="documentName"
                type="text"
                id="documentName"
                autoComplete="off"
                size="sm"
                name="documentName"
                placeholder="Document Name"
                value={documentName}
                onChange={handleInputChange}
                required
              />
            </CCol>
            <CCol sm={3}>
              {documentNameExist && (
                <p className={TextDanger} data-testid="nameAlreadyExist">
                  Document Name Already Exists
                </p>
              )}
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Responsible:
              <span className={responsible ? TextWhite : TextDanger}>*</span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                data-testid="responsible"
                type="text"
                id="responsible"
                autoComplete="off"
                size="sm"
                name="responsible"
                placeholder="Responsible"
                value={responsible}
                onChange={handleInputChange}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Document Link:
              <span className={documentLink ? TextWhite : TextDanger}>*</span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                data-testid="documentLink"
                type="text"
                id="documentLink"
                autoComplete="off"
                size="sm"
                name="documentLink"
                placeholder="Link"
                value={documentLink}
                onChange={handleInputChange}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Status:
            </CFormLabel>
            <CCol sm={3}>
              <CFormCheck
                data-testid="active"
                className="mt-2 sh-hover-handSymbol"
                type="radio"
                name="activeState"
                id="Active"
                label="Active"
                value="true"
                inline
                checked={selectActiveStatus}
                onChange={handleInputChange}
              />
              <CFormCheck
                className="mt-2 sh-hover-handSymbol"
                type="radio"
                name="activeState"
                id="Inactive"
                label="Inactive"
                value="false"
                inline
                checked={!selectActiveStatus}
                onChange={handleInputChange}
              />
            </CCol>
          </CRow>
          {selectActiveStatus === true && (
            <CRow className="mt-4 mb-4">
              <CFormLabel
                {...formLabelProps}
                className="col-sm-3 col-form-label text-end"
              >
                Order
                <span className={selectOrder ? TextWhite : TextDanger}>*</span>
              </CFormLabel>
              <CCol sm={3}>
                <CFormInput
                  data-testid="selectOrder"
                  type="text"
                  id="selectOrder"
                  autoComplete="off"
                  size="sm"
                  maxLength={2}
                  min={1}
                  max={99}
                  name="selectOrder"
                  value={selectOrder || ''}
                  onChange={handleInputChange}
                />
              </CCol>
            </CRow>
          )}
          <CRow>
            <CCol md={{ span: 6, offset: 3 }}>
              <CButton
                data-testid="save-btn"
                className="btn-ovh me-1 text-white"
                color="success"
                disabled={
                  isAddButtonEnabled
                    ? isAddButtonEnabled && documentNameExist?.length > 0
                    : !isAddButtonEnabled
                }
                onClick={addButtonHandler}
              >
                Add
              </CButton>
              <CButton
                data-testid="clear-btn"
                color="warning"
                className="btn-ovh text-white"
                onClick={clearData}
                type="submit"
              >
                Clear
              </CButton>
            </CCol>
          </CRow>
        </CForm>
      </OCard>
    </>
  )
}

export default AddProcessArea
