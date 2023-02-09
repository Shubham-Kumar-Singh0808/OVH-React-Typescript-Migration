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
  const [isEditActiveValue, setIsEditActiveValue] = useState<boolean>(false)

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
  }, [processAreaDetails])

  useEffect(() => {
    if (processAreaDetails?.id === '') {
      dispatch(reduxServices.processArea.actions.clearCategoryId())
    }
  }, [dispatch, processAreaDetails?.id])

  const onChangeInputHandler = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target
    if (name === 'activeState') {
      setIsEditActiveValue(value === 'true')
      const status = value === 'true'
      setProcessArea((values) => {
        return { ...values, ...{ [name]: status } }
      })
    } else {
      setProcessArea((values) => {
        return { ...values, ...{ [name]: value } }
      })
    }
  }

  useEffect(() => {
    if (
      processArea.documentName &&
      processArea.responsible &&
      processArea.link &&
      processArea.order &&
      processArea.processSubHeadName
    ) {
      setIsUpdateBtnEnabled(true)
    } else {
      setIsUpdateBtnEnabled(false)
    }
  }, [processArea])

  const addedToastMessage = (
    <OToast
      toastMessage="Process Area Updated successfully
    "
      toastColor="success"
    />
  )

  const updateButtonHandler = async () => {
    const updateProcessNameResultAction = await dispatch(
      reduxServices.processArea.saveProcessArea({
        categoryId: processArea.categoryId,
        documentName: processArea.documentName,
        link: processArea.link,
        order: processArea.order,
        processAreaId: processArea.processAreaId,
        responsible: processArea.responsible,
        status: processArea.status,
        comments: processArea.comments,
        common: processArea.common,
        id: processArea.id,
        processName: processArea.processName,
        processSubHeadId: processArea.processSubHeadId,
        processSubHeadName: processArea.processSubHeadName,
        specificToProject: processArea.specificToProject,
        sqaApproval: processArea.sqaApproval,
        sqaComments: processArea.sqaComments,
      }),
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
        reduxServices.processArea.incrementOrDecrementOrder({
          categoryId: processArea.categoryId,
          documentName: processArea.documentName,
          link: processArea.link,
          order: processArea.order,
          processAreaId: processArea.processAreaId,
          responsible: processArea.responsible,
          status: processArea.status,
          comments: processArea.comments,
          common: processArea.common,
          id: processArea.id,
          processName: processArea.processName,
          processSubHeadId: processArea.processSubHeadId,
          processSubHeadName: processArea.processSubHeadName,
          specificToProject: processArea.specificToProject,
          sqaApproval: processArea.sqaApproval,
          sqaComments: processArea.sqaComments,
        }),
      )
      dispatch(
        reduxServices.processArea.getProjectTailoringDocument('totalList'),
      )
      dispatch(reduxServices.app.actions.addToast(addedToastMessage))
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
                id="selectCategory"
                data-testid="form-select1"
                name="selectCategory"
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
                id="selectProcessAreaName"
                data-testid="form-select2"
                name="selectProcessAreaName"
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
                id="documentLink"
                autoComplete="off"
                size="sm"
                name="documentLink"
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
                checked={isEditActiveValue}
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
                checked={!isEditActiveValue}
                onChange={onChangeInputHandler}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Order
              <span className={processArea.order ? TextWhite : TextDanger}>
                *
              </span>
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
                value={processArea.order}
                onChange={onChangeInputHandler}
              />
            </CCol>
          </CRow>
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
