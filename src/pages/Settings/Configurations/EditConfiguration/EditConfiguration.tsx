import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react-pro'
import { Link, useHistory, useParams } from 'react-router-dom'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import OCard from '../../../../components/ReusableComponent/OCard'
import { getAppraisalCycle } from '../../../../types/Settings/Configurations/appraisalConfigurationsTypes'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { TextDanger, TextWhite } from '../../../../constant/ClassName'
import { ckeditorConfig } from '../../../../utils/ckEditorUtils'
import OToast from '../../../../components/ReusableComponent/OToast'

const EditConfiguration = (): JSX.Element => {
  const { cycleId } = useParams<{ cycleId: string }>()

  const initialCycle = {} as getAppraisalCycle
  const [cycle, setCycle] = useState(initialCycle)
  const [textEditor, setTextEditor] = useState<boolean>(true)
  const [isUpdateButtonEnabled, setIsUpdateButtonEnabled] =
    useState<boolean>(false)
  const [isActive, setIsActive] = useState(false)

  const dispatch = useAppDispatch()

  const getEditAppraisal = useTypedSelector(
    reduxServices.appraisalConfigurations.selectors.getEditAppraisal,
  )

  useEffect(() => {
    dispatch(
      reduxServices.appraisalConfigurations.getCycleToEdit(Number(cycleId)),
    )
  }, [dispatch])

  const formLabelProps = {
    htmlFor: 'inputNewHandbook',
    className: 'col-form-label category-label',
  }

  const dynamicFormLabelProps = (htmlFor: string, className: string) => {
    return {
      htmlFor,
      className,
    }
  }

  const onChangeHandler = (description: string) => {
    setCycle((prevState) => {
      return { ...prevState, ...{ description } }
    })
  }

  const reviewTitleRegExpression = /-_[^a-z0-9\s]/gi
  const levelValueRegExpression = /\D/g
  const inputHandler = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target
    if (name === 'activeState') {
      setIsActive(value === 'true')
      const activeStatus = value === 'true'
      setCycle((values) => {
        return { ...values, ...{ [name]: activeStatus } }
      })
    } else if (name === 'editReviewTitle') {
      const reviewTitle = value.replace(reviewTitleRegExpression, '')
      setCycle((values) => {
        return { ...values, ...{ [name]: reviewTitle } }
      })
    } else if (name === 'editReviewType') {
      const reviewType = value.replace(reviewTitleRegExpression, '')
      setCycle((values) => {
        return { ...values, ...{ [name]: reviewType } }
      })
    } else if (name === 'level') {
      const levelValue = value.replace(levelValueRegExpression, '')
      setCycle((values) => {
        return { ...values, ...{ [name]: Number(levelValue) } }
      })
    } else if (name === 'minimumServicePeriod') {
      const servicePeriodDays = value.replace(levelValueRegExpression, '')
      setCycle((values) => {
        return { ...values, ...{ [name]: Number(servicePeriodDays) } }
      })
    } else {
      setCycle((values) => {
        const trimValue = value.trimStart()
        return { ...values, ...{ [name]: trimValue } }
      })
    }
  }

  const formLabel = 'col-sm-3 col-form-label text-end'

  useEffect(() => {
    if (getEditAppraisal != null) {
      setCycle({
        id: getEditAppraisal.id,
        name: getEditAppraisal.name,
        description: getEditAppraisal.description,
        toDate: getEditAppraisal.toDate,
        fromDate: getEditAppraisal.fromDate,
        active: getEditAppraisal.active,
        appraisalType: getEditAppraisal.appraisalType,
        appraisalDuration: getEditAppraisal.appraisalDuration,
        level: getEditAppraisal.level,
        cycleStartedFlag: getEditAppraisal.cycleStartedFlag,
        appraisalStartDate: getEditAppraisal.appraisalStartDate,
        appraisalEndDate: getEditAppraisal.appraisalEndDate,
        servicePeriod: getEditAppraisal.servicePeriod,
      })
    }

    setTextEditor(false)
    setTimeout(() => {
      setTextEditor(true)
    }, 100)
  }, [getEditAppraisal])

  useEffect(() => {
    if (
      cycle.name &&
      cycle.appraisalType &&
      cycle.level &&
      cycle.servicePeriod
    ) {
      setIsUpdateButtonEnabled(true)
    } else {
      setIsUpdateButtonEnabled(false)
    }
  }, [cycle])
  const history = useHistory()

  const updateSuccessToastMessage = (
    <OToast
      toastMessage="Configuration has been updated"
      toastColor="success"
    />
  )

  const updateFailedToastMessage = (
    <OToast toastMessage="Cycle name should be unique." toastColor="danger" />
  )

  const selectError = useTypedSelector(
    reduxServices.appraisalConfigurations.selectors.selectError,
  )

  const updateAppraisalCycleAction = async () => {
    const prepareObject = {
      ...cycle,
    }
    const updateAppraisalCycleResultAction = await dispatch(
      reduxServices.appraisalConfigurations.updateAppraisalCycle(prepareObject),
    )
    if (
      reduxServices.appraisalConfigurations.updateAppraisalCycle.fulfilled.match(
        updateAppraisalCycleResultAction,
      )
    ) {
      history.push('/appraisalCycle')
      dispatch(reduxServices.app.actions.addToast(updateSuccessToastMessage))
    } else if (selectError === 417) {
      dispatch(reduxServices.app.actions.addToast(updateFailedToastMessage))
      dispatch(reduxServices.app.actions.addToast(undefined))
    }
  }

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Edit Configuration"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <Link to={`/appraisalCycle`}>
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
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Review Title:
              <span className={cycle.name ? TextWhite : TextDanger}>*</span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                data-testid="editReviewTitle"
                type="text"
                id="editReviewTitle"
                autoComplete="off"
                size="sm"
                name="editReviewTitle"
                placeholder="Name"
                value={cycle.name}
              />
            </CCol>
          </CRow>
          <CRow className="mt-3 ">
            <CFormLabel {...dynamicFormLabelProps('editReviewType', formLabel)}>
              Review Type:
            </CFormLabel>
            <CCol sm={3}>
              <CFormSelect
                id="editReviewType"
                data-testid="form-select1"
                size="sm"
                aria-label="editReviewType"
                name="editReviewType"
              >
                <option>Monthly</option>
                <option>Annual</option>
                <option>Probation</option>
                <option>Quarterly</option>
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow className="mt-3">
            <CCol sm={3} md={3} className="text-end">
              <CFormLabel className="mt-2 text-decoration-none">
                Review Period From:
              </CFormLabel>
            </CCol>
            <CCol sm={3}>
              <CFormInput
                className="form-control form-control-not-allowed"
                data-testid="reviewPeriodFrom"
                id="reviewPeriodFrom"
                size="sm"
                name="reviewPeriodFrom"
                value={cycle.fromDate}
                disabled={true}
              />
            </CCol>
          </CRow>
          <CRow className="mt-3">
            <CCol sm={3} md={3} className="text-end">
              <CFormLabel className="mt-2 text-decoration-none">
                Review Period To:
              </CFormLabel>
            </CCol>
            <CCol sm={3}>
              <CFormInput
                className="form-control form-control-not-allowed"
                data-testid="reviewPeriodTo"
                id="reviewPeriodTo"
                size="sm"
                name="reviewPeriodTo"
                value={cycle.toDate}
                disabled={true}
              />
            </CCol>
          </CRow>
          <CRow className="mt-3">
            <CCol sm={3} md={3} className="text-end">
              <CFormLabel className="mt-2 text-decoration-none">
                Review Start Date:
              </CFormLabel>
            </CCol>
            <CCol sm={3}>
              <CFormInput
                className="form-control form-control-not-allowed"
                data-testid="reviewStartDate"
                id="reviewStartDate"
                size="sm"
                name="reviewStartDate"
                value={cycle.appraisalStartDate}
                disabled={true}
              />
            </CCol>
          </CRow>
          <CRow className="mt-3">
            <CCol sm={3} md={3} className="text-end">
              <CFormLabel className="mt-2 text-decoration-none">
                Review End Date:
              </CFormLabel>
            </CCol>
            <CCol sm={3}>
              <CFormInput
                className="form-control form-control-not-allowed"
                data-testid="reviewEndDate"
                id="reviewEndDate"
                size="sm"
                name="reviewEndDate"
                value={cycle.appraisalEndDate}
                disabled={true}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Review Duration (days):
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                className="form-control form-control-not-allowed"
                data-testid="reviewDuration"
                id="reviewDuration"
                size="sm"
                name="reviewDuration"
                disabled={true}
                value={cycle.appraisalDuration}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Level:
              <span className={cycle.level ? TextWhite : TextDanger}>*</span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                data-testid="level"
                id="level"
                size="sm"
                name="level"
                placeholder="level"
                type="text"
                autoComplete="off"
                maxLength={1}
                value={cycle.level}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Minimum Service Period (days):
              <span className={cycle.servicePeriod ? TextWhite : TextDanger}>
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                type="text"
                data-testid="minimumServicePeriod"
                id="minimumServicePeriod"
                size="sm"
                name="minimumServicePeriod"
                placeholder="Minimum Service Period"
                autoComplete="off"
                maxLength={3}
                value={cycle.servicePeriod}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Active:
            </CFormLabel>
            <CCol sm={2} md={1}>
              <CFormCheck
                data-testid="active"
                className="mt-1"
                type="radio"
                name="activeState"
                id="yes"
                value="true"
                label="Yes"
                inline
                checked={isActive}
                onChange={inputHandler}
              />
            </CCol>
            <CCol sm={2} md={1}>
              <CFormCheck
                className="mt-1"
                type="radio"
                name="activeState"
                id="no"
                label="No"
                value="false"
                inline
                checked={!isActive}
                onChange={inputHandler}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Description:
            </CFormLabel>
            <CCol sm={8}>
              {textEditor && (
                <CKEditor<{
                  onChange: CKEditorEventHandler<'change'>
                }>
                  initData={cycle?.description}
                  config={ckeditorConfig}
                  debug={true}
                  onChange={({ editor }) => {
                    onChangeHandler(editor.getData().trim())
                  }}
                />
              )}
            </CCol>
          </CRow>
          <CRow>
            <CCol md={{ span: 6, offset: 3 }}>
              <CButton
                data-testid="updateBtn"
                className="btn-ovh me-1 text-white"
                color="success"
                disabled={!isUpdateButtonEnabled}
                onClick={updateAppraisalCycleAction}
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

export default EditConfiguration
