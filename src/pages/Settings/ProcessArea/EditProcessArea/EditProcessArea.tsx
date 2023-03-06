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
  const [isActiveValue, setIsActiveValue] = useState<boolean>(false)
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
      setIsActiveValue(value === 'true')
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
    setIsActiveValue(processAreaDetails.status as boolean)
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
      !isActiveValue
    ) {
      setIsUpdateBtnEnabled(true)
    } else if (
      processArea.documentName &&
      processArea.responsible &&
      processArea.link &&
      processArea.processSubHeadName &&
      isActiveValue &&
      requireOrder
    ) {
      setIsUpdateBtnEnabled(true)
    } else {
      setIsUpdateBtnEnabled(false)
    }
  }, [processArea, isActiveValue, requireOrder])

  const updatedToastMessage = (
    <OToast
      toastMessage="Process Area Updated successfully
    "
      toastColor="success"
    />
  )

  const prepareObject = {
    categoryId: processArea.categoryId,
    documentName: processArea.documentName,
    link: processArea.link,
    order: requireOrder,
    processAreaId: processArea.processAreaId,
    responsible: processArea.responsible,
    status: isActiveValue,
    comments: processArea.comments,
    common: processArea.common,
    id: processArea.id,
    processName: processArea.processName,
    processSubHeadId: processArea.processSubHeadId,
    processSubHeadName: processArea.processSubHeadName,
    specificToProject: processArea.specificToProject,
    sqaApproval: processArea.sqaApproval,
    sqaComments: processArea.sqaComments,
  }
  const updateButtonHandler = async () => {
    const updateProcessNameResultAction = await dispatch(
      reduxServices.processArea.saveProcessArea(prepareObject),
    )
    if (
      reduxServices.processArea.saveProcessArea.fulfilled.match(
        updateProcessNameResultAction,
      )
    ) {
      dispatch(
        reduxServices.processArea.getOrderCountOfActiveProcesses(
          processArea.categoryId,
        ),
      )
      dispatch(
        reduxServices.processArea.incrementOrDecrementOrder(prepareObject),
      )
      dispatch(
        reduxServices.processArea.getProjectTailoringDocument('totalList'),
      )
      dispatch(reduxServices.app.actions.addToast(updatedToastMessage))
      setToggle('')
      dispatch(reduxServices.app.actions.addToast(undefined))
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
                label="Active "
                inline
                checked={isActiveValue}
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
                checked={!isActiveValue}
                onChange={onChangeInputHandler}
              />
            </CCol>
          </CRow>
          {isActiveValue === true && (
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
