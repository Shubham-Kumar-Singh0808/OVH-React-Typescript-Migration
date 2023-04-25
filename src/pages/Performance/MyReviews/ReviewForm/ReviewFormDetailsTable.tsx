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
import React, { useState } from 'react'
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
}: {
  kpiData: KPI[]
}): JSX.Element => {
  const [isKPIDetailsModalVisible, setIsKPIDetailsModalVisible] =
    useState<boolean>(false)
  const [kpiDetails, setKpiDetails] = useState({} as KPI)

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

  const managerCommentExist = (kpi: KPI) => {
    const isManagerCmmntExist = kpi?.managerCommentsDtos?.length > 0
    if (!isManagerCmmntExist) {
      dispatch(reduxServices.myReview.actions.setIsButtonVisible(true))
    } else {
      dispatch(reduxServices.myReview.actions.setIsButtonVisible(false))
    }
  }

  const onChangeSelfRating = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value)
  }
  console.log(kpiData)
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
            kpiData &&
            kpiData?.map((kpi, index) => {
              const removeTag = '/(<([^>]+)>)/gi'
              const removeSpaces = kpi?.name.replace(removeTag, '')
              const kpiNameLimit =
                removeSpaces && removeSpaces.length > 30
                  ? `${removeSpaces.substring(0, 30)}...`
                  : removeSpaces
              managerCommentExist(kpi)
              console.log(kpi.employeeRating)
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
                  {kpi.employeeRating === null ? (
                    <CTableDataCell>
                      <CFormSelect
                        aria-label="Default select example"
                        key={index}
                        size="sm"
                        name="rating"
                        id="empRating"
                        value={kpi.employeeRating}
                        onChange={(e) => onChangeSelfRating(e)}
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
                  ) : (
                    <CTableDataCell>{kpi.employeeRating}</CTableDataCell>
                  )}
                  {kpi.employeeFeedback === null ? (
                    <CTableDataCell>
                      <CFormTextarea
                        {...dynamicFormLabelProps(
                          '2',
                          'reviewForm-text-area documentWidth',
                        )}
                      ></CFormTextarea>
                    </CTableDataCell>
                  ) : (
                    <CTableDataCell>{kpi.employeeFeedback}</CTableDataCell>
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
