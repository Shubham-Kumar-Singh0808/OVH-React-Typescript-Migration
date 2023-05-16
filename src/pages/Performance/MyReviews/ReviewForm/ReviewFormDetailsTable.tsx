import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CLink,
  CFormSelect,
  CFormTextarea,
} from '@coreui/react-pro'
import React, { useEffect, useMemo, useState } from 'react'
import parse from 'html-react-parser'
import OLoadingSpinner from '../../../../components/ReusableComponent/OLoadingSpinner'
import OModal from '../../../../components/ReusableComponent/OModal'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { LoadingType } from '../../../../types/Components/loadingScreenTypes'
import { KPI } from '../../../../types/Performance/MyReview/myReviewTypes'

const ReviewFormDetailsTable = ({
  kpiData,
  KPIDetails,
  setKPIDetails,
  id,
}: {
  kpiData: KPI[]
  KPIDetails: KPI[]
  setKPIDetails: React.Dispatch<React.SetStateAction<KPI[] | undefined>>
  id: number
}): JSX.Element => {
  // const [KPIDetails, setKPIDetails] = useState<KPI[]>()
  const [isKPIDetailsModalVisible, setIsKPIDetailsModalVisible] =
    useState<boolean>(false)
  const [kpiDetails, setKpiDetails] = useState({} as KPI)
  const appraisalForm = useTypedSelector(
    reduxServices.myReview.selectors.appraisalForm,
  )

  console.log(id)

  const updatedAppraisalForm = useTypedSelector(
    reduxServices.myReview.actions.updateKPI,
  )

  console.log(updatedAppraisalForm)
  const [descriptionError, setDescriptionError] = useState(false)

  const dispatch = useAppDispatch()

  const isLoading = useTypedSelector(reduxServices.myReview.selectors.isLoading)
  const handlekpiDescriptionModal = (descKpi: KPI) => {
    setIsKPIDetailsModalVisible(true)
    setKpiDetails(descKpi)
  }

  const dynamicFormLabelProps = (rows: string, className: string) => {
    return {
      rows,
      className,
    }
  }

  const tableHeaderCellPropsIndex = {
    width: '26px',
    scope: 'col',
  }
  const tableHeaderCellPropsKpiName = {
    width: '127px',
    scope: 'col',
  }
  const tableHeaderCellPropsDesc = {
    width: '87px',
    scope: 'col',
  }

  const tableHeaderCellPropsFrequency = {
    width: '90px',
    scope: 'col',
  }
  useEffect(() => {
    if (kpiData) {
      setKPIDetails(kpiData)
      // setKPIDetails(appraisalForm.kra.)
    }
  }, [kpiData])

  const managerCommentExist = (kpi: KPI) => {
    const isManagerCmmntExist = kpi?.managerCommentsDtos?.length > 0
    if (!isManagerCmmntExist) {
      dispatch(reduxServices.myReview.actions.setIsButtonVisible(true))
    } else {
      dispatch(reduxServices.myReview.actions.setIsButtonVisible(false))
    }
  }

  // const onChangeSelfRating = (
  //   e:
  //     | React.ChangeEvent<HTMLSelectElement>
  //     | React.ChangeEvent<HTMLTextAreaElement>,
  // ) => {
  //   console.log(e.target.value)
  // }
  // console.log(kpiData)

  const onChangeSelfRating = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number,
  ) => {
    const newKPI: KPI[] = JSON.parse(JSON.stringify(KPIDetails))
    newKPI[index].employeeRating = e.target.value
    setKPIDetails(newKPI)
    dispatch(
      reduxServices.myReview.actions.updateKPI({
        kraId: id,
        kpi: newKPI[index],
        kpiId: newKPI[index].id,
      }),
    )
  }

  const commentOnChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    index: number,
  ) => {
    const newKPI: KPI[] = JSON.parse(JSON.stringify(KPIDetails))
    newKPI[index].employeeFeedback = e.target.value
    setKPIDetails(newKPI)
    // if (newKPI[index].employeeFeedback.length > 56) {
    //   setDescriptionError(false)
    // } else {
    //   setDescriptionError(true)
    // }
    dispatch(
      reduxServices.myReview.actions.updateKPI({
        kraId: id,
        kpi: newKPI[index],
        kpiId: newKPI[index].id,
      }),
    )
  }
  // const sortedKPIDetails = useMemo(() => {
  //   if (KPIDetails) {
  //     return KPIDetails.slice().sort((sortNode1, sortNode2) =>
  //       sortNode1.name.localeCompare(sortNode2.name),
  //     )
  //   }
  //   return []
  // }, [KPIDetails])
  return (
    <>
      <CTable
        responsive
        striped
        className="mt-0 text-start profile-tab-table-size w-100"
        align="middle"
      >
        <CTableHead className="profile-tab-header">
          <CTableRow>
            <CTableHeaderCell
              className="profile-tab-content"
              {...tableHeaderCellPropsIndex}
            >
              #
            </CTableHeaderCell>
            <CTableHeaderCell
              className="profile-tab-content"
              {...tableHeaderCellPropsKpiName}
            >
              KPI Name
            </CTableHeaderCell>
            <CTableHeaderCell
              className="profile-tab-content"
              {...tableHeaderCellPropsDesc}
            >
              Self Rating
            </CTableHeaderCell>
            <CTableHeaderCell
              className="profile-tab-content"
              {...tableHeaderCellPropsFrequency}
            >
              Comments
            </CTableHeaderCell>
            <CTableHeaderCell
              className="profile-tab-content"
              {...tableHeaderCellPropsFrequency}
            >
              Manager Rating
            </CTableHeaderCell>
            <CTableHeaderCell
              className="profile-tab-content"
              {...tableHeaderCellPropsFrequency}
            >
              Manager Comments
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {isLoading !== ApiLoadingState.loading ? (
            KPIDetails &&
            KPIDetails?.map((kpi, index) => {
              const removeTag = '/(<([^>]+)>)/gi'
              const removeSpaces = kpi?.name.replace(removeTag, '')
              const kpiNameLimit =
                removeSpaces && removeSpaces.length > 30
                  ? `${removeSpaces.substring(0, 30)}...`
                  : removeSpaces
              managerCommentExist(kpi)
              console.log(kpi.employeeRating)
              console.log(kpi.employeeFeedback)
              return (
                <CTableRow key={index}>
                  <CTableDataCell scope="row">{index + 1}</CTableDataCell>
                  {kpiNameLimit && (
                    <CTableDataCell scope="row" className="commentWidth">
                      <CLink
                        className="cursor-pointer text-primary centerAlignment-text"
                        data-testid="kra-Name"
                        onClick={() => handlekpiDescriptionModal(kpi)}
                      >
                        {parse(kpiNameLimit)}
                      </CLink>
                    </CTableDataCell>
                  )}
                  {appraisalForm.formStatusvalue >= 1 ? (
                    <CTableDataCell>{kpi.employeeRating}</CTableDataCell>
                  ) : (
                    <CTableDataCell>
                      <CFormSelect
                        aria-label="Default select example"
                        key={index}
                        size="sm"
                        name="rating"
                        id="empRating"
                        value={kpi.employeeRating}
                        onChange={(e) => onChangeSelfRating(e, index)}
                      >
                        <option value={''}>Select Rating</option>
                        <option value="5">5</option>
                        <option value="4">4</option>
                        <option value="3">3</option>
                        <option value="2">2</option>
                        <option value="1">1</option>
                        <option value="0">0</option>
                      </CFormSelect>
                    </CTableDataCell>
                  )}
                  {appraisalForm.formStatusvalue >= 1 ? (
                    <CTableDataCell>{kpi.employeeFeedback}</CTableDataCell>
                  ) : (
                    <CTableDataCell>
                      <CFormTextarea
                        {...dynamicFormLabelProps(
                          '2',
                          'reviewForm-text-area documentWidth',
                        )}
                        value={kpi.employeeFeedback}
                        onChange={(e) => commentOnChange(e, index)}
                      ></CFormTextarea>
                      <p className="mt-1">{kpi.employeeFeedback?.length}/500</p>
                      {descriptionError && (
                        <p className="text-danger" data-testid="error-msg">
                          Please enter at least 50 characters.
                        </p>
                      )}
                    </CTableDataCell>
                  )}
                  {kpi?.managerCommentsDtos &&
                    kpi?.managerCommentsDtos?.map((mgrComment, cmtIndex) => (
                      <>
                        {mgrComment?.managerRating !== null ? (
                          <CTableDataCell key={cmtIndex}>
                            {mgrComment.managerRating}
                          </CTableDataCell>
                        ) : (
                          <CTableDataCell></CTableDataCell>
                        )}
                        {mgrComment?.managerComments !== null ? (
                          <CTableDataCell>
                            {mgrComment.managerComments}
                          </CTableDataCell>
                        ) : (
                          <CTableDataCell></CTableDataCell>
                        )}
                      </>
                    ))}
                </CTableRow>
              )
            })
          ) : (
            <OLoadingSpinner type={LoadingType.PAGE} />
          )}
        </CTableBody>
      </CTable>
      <OModal
        modalSize="lg"
        alignment="center"
        visible={isKPIDetailsModalVisible}
        setVisible={setIsKPIDetailsModalVisible}
        confirmButtonText="Yes"
        cancelButtonText="No"
        modalFooterClass="d-none"
        modalHeaderClass="d-none"
      >
        <>
          <h4 className="model-header-text mb-3">{kpiDetails.name}</h4>
          <p className="d-flex">
            <span className="col-sm-2 text-right fw-bold px-3">
              Description :
            </span>
            {kpiDetails?.description}
          </p>
          <p className="d-flex">
            <span className="col-sm-2 text-right fw-bold px-3">
              Frequency :
            </span>
            {kpiDetails?.frequency}
          </p>
          <p className="d-flex">
            <span className="col-sm-2 text-right fw-bold px-3">Target :</span>
            {kpiDetails?.target || 'N/A'}
          </p>
        </>
      </OModal>
    </>
  )
}

export default ReviewFormDetailsTable
