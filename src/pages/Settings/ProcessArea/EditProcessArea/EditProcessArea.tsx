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
import { GetProcessAreaDetails } from '../../../../types/Settings/ProcessAreas/processAreaTypes'

const EditProcessArea = ({
  setToggle,
}: {
  setToggle: (value: string) => void
}): JSX.Element => {
  const dispatch = useAppDispatch()

  const initialProcessAreaDetails = {} as GetProcessAreaDetails
  const [processArea, setProcessArea] = useState(initialProcessAreaDetails)
  const [isUpdateBtnEnabled, setIsUpdateBtnEnabled] = useState<boolean>(false)

  const [isActive, setIsActive] = useState(false)

  const [requireOrder, setRequiredOrder] = useState<string | number>(
    processArea.order,
  )

  const formLabelProps = {
    htmlFor: 'inputNewHandbook',
    className: 'col-form-label category-label',
  }

  const processAreaDetails = useTypedSelector(
    reduxServices.processArea.selectors.processAreaDetails,
  )

  const ProjectTailoringInfo = useTypedSelector(
    reduxServices.processArea.selectors.ProjectTailoringList,
  )

  const ProcessAreaList = useTypedSelector(
    reduxServices.processArea.selectors.ProcessArea,
  )
  const onChangeInputHandler = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target
    if (name === 'activeState') {
      setIsActive(value === 'true')
      const activeStatus = value === 'true'
      setProcessArea((values) => {
        return { ...values, ...{ [name]: activeStatus } }
      })
    } else {
      setProcessArea((prevState) => {
        return { ...prevState, ...{ [name]: value?.replace(/^\s*/, '') } }
      })
    }
  }

  useEffect(() => {
    if (processArea.categoryId)
      dispatch(
        reduxServices.processArea.getProcessAreas(processArea.categoryId),
      )
  }, [dispatch, processArea.categoryId])

  useEffect(() => {
    if (processAreaDetails != null) {
      setProcessArea(processAreaDetails)
    }
    setIsActive(processAreaDetails.status as boolean)
    setRequiredOrder(processAreaDetails.order)
  }, [processAreaDetails])

  useEffect(() => {
    if (processAreaDetails?.id === '') {
      dispatch(reduxServices.processArea.actions.clearCategoryId())
    }
  }, [dispatch, processAreaDetails?.id])

  useEffect(() => {
    if (
      processArea.documentName &&
      processArea.responsible &&
      processArea.link &&
      processArea.processSubHeadName &&
      !isActive
    ) {
      setIsUpdateBtnEnabled(true)
    } else if (
      processArea.documentName &&
      processArea.responsible &&
      processArea.link &&
      processArea.processSubHeadName &&
      isActive &&
      requireOrder
    ) {
      setIsUpdateBtnEnabled(true)
    } else {
      setIsUpdateBtnEnabled(false)
    }
  }, [processArea, isActive, requireOrder])

  const updatedToastMessage = (
    <OToast
      toastMessage="Process Area Updated successfully
    "
      toastColor="success"
    />
  )
  const editProjectTailoringList = useTypedSelector(
    reduxServices.processArea.selectors.ProjectTailoringList,
  )
  const editObjectProject =
    editProjectTailoringList[0]?.processSubHeadsDto.reduce((prev, current) =>
      prev.order > current.order ? prev : current,
    )
  const editObjEng = editProjectTailoringList[1]?.processSubHeadsDto.reduce(
    (prev, current) => (prev.order > current.order ? prev : current),
  )
  const editObjSupport = editProjectTailoringList[2]?.processSubHeadsDto.reduce(
    (prev, current) => (prev.order > current.order ? prev : current),
  )
  const editOrderProject = Number(editObjectProject?.order) + 1
  const editOrderEng = Number(editObjEng?.order) + 1
  const editOrderSupport = Number(editObjSupport?.order) + 1

  const editOrderErrorToastMessage = (maxOrder: number) => (
    <OToast
      toastMessage={`order should be ${maxOrder} or below ${maxOrder}`}
      toastColor="danger"
    />
  )

  const dispatchFunctions = () => {
    dispatch(
      reduxServices.processArea.getOrderCountOfActiveProcesses(
        Number(processArea.categoryId),
      ),
    )
    dispatch(
      reduxServices.processArea.incrementOrDecrementOrder({
        categoryId: Number(processArea.categoryId),
        documentName: processArea.documentName,
        link: processArea.link,
        order: requireOrder,
        processAreaId: Number(processArea.processSubHeadName),
        responsible: processArea.responsible,
        status: isActive,
      }),
    )
    dispatch(
      reduxServices.processArea.saveProcessArea({
        categoryId: Number(processArea.categoryId),
        documentName: processArea.documentName,
        link: processArea.link,
        order: requireOrder,
        processAreaId: Number(processArea.processSubHeadName),
        responsible: processArea.responsible,
        status: isActive,
      }),
    )
    dispatch(reduxServices.processArea.getProjectTailoringDocument('totalList'))
    dispatch(reduxServices.app.actions.addToast(updatedToastMessage))
    setToggle('')
  }
  const updateButtonHandler = async () => {
    if (
      processArea.categoryId === 1 &&
      Number(requireOrder) > editOrderProject
    ) {
      dispatch(
        reduxServices.processArea.getOrderCountOfActiveProcesses(
          Number(processArea.categoryId),
        ),
      )
      dispatch(
        reduxServices.app.actions.addToast(
          editOrderErrorToastMessage(editOrderProject),
        ),
      )
    } else if (
      processArea.categoryId === 1 &&
      Number(requireOrder) <= editOrderProject
    ) {
      await dispatch(
        reduxServices.processArea.getOrderCountOfActiveProcesses(
          Number(processArea.categoryId),
        ),
      )
      dispatchFunctions()
    }
    if (processArea.categoryId === 2 && Number(requireOrder) > editOrderEng) {
      dispatch(
        reduxServices.processArea.getOrderCountOfActiveProcesses(
          Number(processArea.categoryId),
        ),
      )
      dispatch(
        reduxServices.app.actions.addToast(
          editOrderErrorToastMessage(editOrderEng),
        ),
      )
    } else if (
      processArea.categoryId === 2 &&
      Number(requireOrder) <= editOrderEng
    ) {
      await dispatch(
        reduxServices.processArea.getOrderCountOfActiveProcesses(
          Number(processArea.categoryId),
        ),
      )
      dispatchFunctions()
    }
    if (
      processArea.categoryId === 3 &&
      Number(requireOrder) > editOrderSupport
    ) {
      dispatch(
        reduxServices.processArea.getOrderCountOfActiveProcesses(
          Number(processArea.categoryId),
        ),
      )
      dispatch(
        reduxServices.app.actions.addToast(
          editOrderErrorToastMessage(editOrderSupport),
        ),
      )
    } else if (
      processArea.categoryId === 3 &&
      Number(requireOrder) <= editOrderSupport
    ) {
      await dispatch(
        reduxServices.processArea.getOrderCountOfActiveProcesses(
          Number(processArea.categoryId),
        ),
      )
      dispatchFunctions()
    }
  }
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Edit Process Area"
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
            </CFormLabel>
            <CCol sm={3}>
              <CFormSelect
                aria-label="Default select example"
                size="sm"
                id="categoryId"
                data-testid="form-select1"
                name="categoryId"
                value={processArea.categoryId}
                onChange={onChangeInputHandler}
              >
                {ProjectTailoringInfo?.map((item, index) => (
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
                data-testid="back-btn-handler"
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
              <span
                className={
                  processArea.processSubHeadName ? TextWhite : TextDanger
                }
              >
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormSelect
                aria-label="Default select example"
                size="sm"
                id="processSubHeadName"
                data-testid="form-select2"
                name="processSubHeadName"
                value={processArea.processSubHeadName}
                onChange={onChangeInputHandler}
              >
                {ProcessAreaList?.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Document Name:
              <span
                className={processArea.documentName ? TextWhite : TextDanger}
              >
                *
              </span>
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
                value={processArea.documentName}
                onChange={onChangeInputHandler}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Responsible:
              <span
                className={processArea.responsible ? TextWhite : TextDanger}
              >
                *
              </span>
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
                value={processArea.responsible}
                onChange={onChangeInputHandler}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Project Document Link:
              <span className={processArea?.link ? TextWhite : TextDanger}>
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                data-testid="documentLink"
                type="text"
                id="link"
                autoComplete="off"
                size="sm"
                name="link"
                placeholder="Link"
                value={processArea?.link}
                onChange={onChangeInputHandler}
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
                id="yes"
                value="true"
                label="Active"
                inline
                checked={isActive}
                onChange={onChangeInputHandler}
              />
              <CFormCheck
                className="mt-2 sh-hover-handSymbol"
                type="radio"
                name="activeState"
                id="no"
                label="Inactive"
                value="false"
                inline
                checked={!isActive}
                onChange={onChangeInputHandler}
              />
            </CCol>
          </CRow>
          {isActive === true && (
            <CRow className="mt-4 mb-4">
              <CFormLabel
                {...formLabelProps}
                className="col-sm-3 col-form-label text-end"
              >
                Order
                <span className={requireOrder ? TextWhite : TextDanger}>*</span>
              </CFormLabel>
              <CCol sm={3}>
                <CFormInput
                  data-testid="selectOrder"
                  type="text"
                  id="order"
                  autoComplete="off"
                  size="sm"
                  maxLength={2}
                  min={1}
                  max={99}
                  name="order"
                  value={requireOrder || ''}
                  onChange={(e) =>
                    setRequiredOrder(
                      e.target.value.replace(/^\s*/, '').replace(/[\D]/gi, ''),
                    )
                  }
                />
              </CCol>
            </CRow>
          )}
          <CRow>
            <CCol md={{ span: 6, offset: 3 }}>
              <CButton
                data-testid="updateBtn"
                className="btn-ovh me-1 text-white"
                color="success"
                disabled={!isUpdateBtnEnabled}
                onClick={updateButtonHandler}
              >
                Update
              </CButton>
            </CCol>
          </CRow>
        </CForm>
      </OCard>
    </>
  )
}

export default EditProcessArea
