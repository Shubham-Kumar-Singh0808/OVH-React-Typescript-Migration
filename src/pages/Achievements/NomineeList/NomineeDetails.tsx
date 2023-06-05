import {
  CButton,
  CCol,
  CContainer,
  CForm,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react-pro'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import React, { useEffect, useState } from 'react'
import parse from 'html-react-parser'
import NomineeDetailsBasicInfoContainer from './NomineeDetailsBasicInfoContainer'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import {
  IncomingNomineeDetails,
  NomineeListDetailsProps,
  nomineeSelectionStatus,
  OutgoingNominationStatus,
} from '../../../types/Achievements/NomineeList/NomineeListTypes'
import {
  convertNomineeDisplayToApiValue,
  emptyString,
  getNomineeRatingNumber,
  getNomineeRatingString,
  NomineeRatingList,
  selectRating,
} from '../AchievementConstants'
import { TextDanger } from '../../../constant/ClassName'
import { ckeditorConfig } from '../../../utils/ckEditorUtils'
import { reduxServices } from '../../../reducers/reduxServices'
import OToast from '../../../components/ReusableComponent/OToast'
import OLoadingSpinner from '../../../components/ReusableComponent/OLoadingSpinner'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { LoadingType } from '../../../types/Components/loadingScreenTypes'

const NomineeDetails = (props: NomineeListDetailsProps): JSX.Element => {
  const { setViewNomination } = props
  const dispatch = useAppDispatch()
  const nomineeDetails = useTypedSelector(
    (state) => state.nomineeList.nomineeDetails,
  )
  const isLoading = useTypedSelector((state) => state.nomineeList.isLoading)
  const [nomineeRating, setNomineeRating] = useState<string>(
    getNomineeRatingString(nomineeDetails.rating),
  )

  const [displayEditor, setDisplayEditor] = useState<boolean>(true)
  const [nomineeDescription, setNomineeDescription] =
    useState<string>(emptyString)
  const [nomineeStatus, setNomineeStatus] = useState<string>(
    String(nomineeSelectionStatus.selectStatus),
  )
  const [isAddButtonEnabled, setAddButtonEnabled] = useState<boolean>(false)

  useEffect(() => {
    if (nomineeDetails.nominationStatus === null) {
      setNomineeStatus(String(nomineeSelectionStatus.selectStatus))
    } else if (
      nomineeDetails.nominationStatus ===
      String(OutgoingNominationStatus.selected)
    ) {
      setNomineeStatus(String(nomineeSelectionStatus.selected))
    } else {
      setNomineeStatus(String(nomineeSelectionStatus.notSelected))
    }
  }, [nomineeDetails.nominationStatus])

  const reRenderEditor = () => {
    setDisplayEditor(false)
    setTimeout(() => {
      setDisplayEditor(true)
    }, 10)
  }

  useEffect(() => {
    setNomineeRating(getNomineeRatingString(nomineeDetails.rating))
  }, [nomineeDetails.rating])

  useEffect(() => {
    if (nomineeDetails.finalComments !== null) {
      setNomineeDescription(nomineeDetails.finalComments)
    }
    reRenderEditor()
  }, [nomineeDetails.finalComments])

  const backButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setViewNomination(false)
  }

  const ratingChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNomineeRating(e.target.value)
  }

  const statusChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNomineeStatus(String(e.target.value))
  }

  const clearButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setNomineeRating(selectRating)
    setNomineeStatus(String(nomineeSelectionStatus.selectStatus))
    setNomineeDescription(emptyString)
    reRenderEditor()
  }

  useEffect(() => {
    if (
      nomineeDescription === emptyString ||
      nomineeRating === selectRating ||
      nomineeStatus === String(nomineeSelectionStatus.selectStatus) ||
      nomineeDescription.trim().length === 0
    ) {
      console.log(
        'Hello',
        nomineeDescription === emptyString,
        nomineeRating === selectRating,
        nomineeStatus === String(nomineeSelectionStatus.selectStatus),
        nomineeDescription.trim().length === 0,
      )
      setAddButtonEnabled(false)
    } else {
      setAddButtonEnabled(true)
    }
  }, [nomineeRating, nomineeStatus, nomineeDescription])

  const reviewNomineeAddButtonHandler = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault()
    const finalData: IncomingNomineeDetails = {
      ...nomineeDetails,
      rating: getNomineeRatingNumber(nomineeRating),
      nominationStatus: convertNomineeDisplayToApiValue(nomineeStatus),
      finalComments: nomineeDescription,
    }

    const successToast = (
      <OToast
        toastColor="success"
        toastMessage="Nominee Updated Successfully"
      />
    )

    const result = await dispatch(
      reduxServices.nomineeList.reviewNomineeThunk(finalData),
    )

    if (reduxServices.nomineeList.reviewNomineeThunk.fulfilled.match(result)) {
      dispatch(reduxServices.app.actions.addToast(successToast))
      setAddButtonEnabled(true)
      dispatch(
        reduxServices.nomineeList.getNominationDetailsThunk(nomineeDetails.id),
      )
    }
  }

  return (
    <>
      {isLoading === ApiLoadingState.loading ? (
        <OLoadingSpinner type={LoadingType.PAGE} />
      ) : (
        <CContainer>
          <CRow className="mt-2 justify-content-end">
            <CCol xs={2} className="px-0 text-end">
              <CButton
                color="info"
                data-testid="back-btn"
                className="btn-ovh me-1"
                onClick={backButtonHandler}
              >
                <i className="fa fa-arrow-left me-1"></i>Back
              </CButton>
            </CCol>
          </CRow>
          <CContainer className="mt-3">
            <div className="d-inline-flex flex-row flex-wrap">
              <NomineeDetailsBasicInfoContainer>
                <CFormLabel
                  data-testid="empName-label"
                  className="text-info nominee-detail"
                >
                  Employee Name:&nbsp;
                </CFormLabel>
                <p data-testid="empName-val">{nomineeDetails.employeeName}</p>
              </NomineeDetailsBasicInfoContainer>
              <NomineeDetailsBasicInfoContainer>
                <CFormLabel
                  data-testid="achType-label"
                  className="text-info nominee-detail"
                >
                  Achievement Type:&nbsp;
                </CFormLabel>
                <p data-testid="achName-val">
                  {nomineeDetails.achievementType}
                </p>
              </NomineeDetailsBasicInfoContainer>
              <NomineeDetailsBasicInfoContainer>
                <CFormLabel
                  className="text-info nominee-detail"
                  data-testid="cycle-label"
                >
                  Cycle:&nbsp;
                </CFormLabel>
                <p data-testid="cycle-val">{nomineeDetails.cycleName}</p>
              </NomineeDetailsBasicInfoContainer>
              <NomineeDetailsBasicInfoContainer>
                <CFormLabel
                  className="text-info nominee-detail"
                  data-testid="fromMonth-label"
                >
                  From Month:&nbsp;
                </CFormLabel>
                <p data-testid="fromMonth-val">{nomineeDetails.fromMonth}</p>
              </NomineeDetailsBasicInfoContainer>
              <NomineeDetailsBasicInfoContainer>
                <CFormLabel
                  className="text-info nominee-detail"
                  data-testid="toMonth-label"
                >
                  To Month:&nbsp;
                </CFormLabel>
                <p data-testid="toMonth-val">{nomineeDetails.toMonth}</p>
              </NomineeDetailsBasicInfoContainer>
            </div>
            {/* <div className="d-flex flex-row flex-wrap">
              
            </div> */}
          </CContainer>
          <CContainer className="mt-2">
            {nomineeDetails.nominationQuestionDataDtosId?.map((item, index) => (
              <CRow key={index} className="mt-2">
                <CFormLabel data-testid="inc-question">{`${index + 1}. ${
                  item.questions
                }`}</CFormLabel>
                <div data-testid="inc-answers">
                  {parse(item.feedBack ? item.feedBack : '')}
                </div>
              </CRow>
            ))}
          </CContainer>
          <CForm onSubmit={reviewNomineeAddButtonHandler}>
            <CContainer className="mt-3">
              <CRow className="align-items-center">
                <CFormLabel
                  data-testid="rating-label"
                  className="col-sm-1 col-form-label"
                >
                  Rating:{' '}
                  {nomineeRating === selectRating && (
                    <span className={TextDanger}>*</span>
                  )}
                </CFormLabel>
                <CCol md={3}>
                  <CFormSelect
                    size="sm"
                    data-testid="rating-select"
                    value={nomineeRating}
                    onChange={ratingChangeHandler}
                  >
                    <option data-testid="rating-options" value={selectRating}>
                      {selectRating}
                    </option>
                    {NomineeRatingList.map((item, index) => (
                      <option data-testid="rating-options" key={index}>
                        {item.ratingString}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
              </CRow>
            </CContainer>
            <CContainer className="mt-3">
              <CFormLabel data-testid="comments-label">
                Comments:{' '}
                {(nomineeDescription === emptyString ||
                  nomineeDescription.trim().length === 0) && (
                  <span className={TextDanger}>*</span>
                )}
              </CFormLabel>
              {displayEditor && (
                <CKEditor<{ onChange: CKEditorEventHandler<'change'> }>
                  initData={nomineeDescription}
                  config={ckeditorConfig}
                  debug={true}
                  onChange={({ editor }) =>
                    setNomineeDescription(editor.getData().trim())
                  }
                />
              )}
            </CContainer>
            <CContainer className="mt-3">
              <CRow className="align-items-center">
                <CFormLabel
                  data-testid="status-label"
                  className="col-sm-1 col-form-label"
                >
                  Status:{' '}
                  {nomineeStatus ===
                    String(nomineeSelectionStatus.selectStatus) && (
                    <span className={TextDanger}>*</span>
                  )}
                </CFormLabel>
                <CCol md={3}>
                  <CFormSelect
                    size="sm"
                    data-testid="status-select"
                    value={nomineeStatus}
                    onChange={statusChangeHandler}
                  >
                    <option
                      data-testid="status-options"
                      value={nomineeSelectionStatus.selectStatus}
                    >
                      {nomineeSelectionStatus.selectStatus}
                    </option>
                    <option
                      data-testid="status-options"
                      value={nomineeSelectionStatus.selected}
                    >
                      {nomineeSelectionStatus.selected}
                    </option>
                    <option
                      data-testid="status-options"
                      value={nomineeSelectionStatus.notSelected}
                    >
                      {nomineeSelectionStatus.notSelected}
                    </option>
                  </CFormSelect>
                </CCol>
              </CRow>
            </CContainer>
            <CContainer className="mt-4">
              <CRow>
                <CFormLabel className="col-form-label category-label col-sm-1 col-form-label text-end"></CFormLabel>
                <CCol sm={4}>
                  <CButton
                    data-testid="add-btn-id"
                    type="submit"
                    className="btn-ovh me-1"
                    color="success"
                    disabled={!isAddButtonEnabled}
                  >
                    Add
                  </CButton>
                  <CButton
                    data-testid="clear-btn-id"
                    color="warning"
                    className="btn-ovh me-1"
                    onClick={clearButtonHandler}
                  >
                    Clear
                  </CButton>
                </CCol>
              </CRow>
            </CContainer>
          </CForm>
        </CContainer>
      )}
    </>
  )
}

export default NomineeDetails
