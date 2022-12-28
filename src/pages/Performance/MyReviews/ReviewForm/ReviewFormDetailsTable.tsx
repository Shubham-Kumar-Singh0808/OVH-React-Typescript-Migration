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
import { useTypedSelector } from '../../../../stateStore'
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

  return (
    <>
      <CTable
        responsive
        striped
        className="mt-0 text-start profile-tab-table-size w-100"
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

              return (
                <CTableRow key={index}>
                  <CTableDataCell scope="row">{index + 1}</CTableDataCell>
                  {kpiNameLimit ? (
                    <CTableDataCell scope="row" className="commentWidth">
                      <CLink
                        className="cursor-pointer text-primary centerAlignment-text"
                        data-testid="kra-Name"
                        onClick={() => handlekpiDescriptionModal(kpi)}
                      >
                        {parse(kpiNameLimit)}
                      </CLink>
                    </CTableDataCell>
                  ) : (
                    <CTableDataCell>{`N/A`}</CTableDataCell>
                  )}
                  <CTableDataCell>
                    <CFormSelect
                      aria-label="Default select example"
                      size="sm"
                      name="rating"
                      id="empRating"
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
                  <CTableDataCell>
                    <CFormTextarea
                      {...dynamicFormLabelProps(
                        '2',
                        'investment-text-area documentWidth',
                      )}
                    ></CFormTextarea>
                  </CTableDataCell>
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
