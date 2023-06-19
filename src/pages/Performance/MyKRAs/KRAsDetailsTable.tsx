import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CLink,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import parse from 'html-react-parser'
import OLoadingSpinner from '../../../components/ReusableComponent/OLoadingSpinner'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'
import { LoadingType } from '../../../types/Components/loadingScreenTypes'
import OModal from '../../../components/ReusableComponent/OModal'
import { KPIs } from '../../../types/Performance/MyKRAs/myKRAsTypes'

const KRAsDetailsTable = (): JSX.Element => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [kpiDescription, setKpiDescription] = useState<string>('')
  const isLoading = useTypedSelector(reduxServices.myKRAs.selectors.isLoading)
  const kpis = useTypedSelector(reduxServices.myKRAs.selectors.kpis)

  const handlekpiDescriptionModal = (descKpi: string) => {
    setIsModalVisible(true)
    setKpiDescription(descKpi)
  }

  const limit = (value: string): string => {
    return value?.length > 30 ? `${value?.substring(0, 30)}...` : value
  }

  return (
    <>
      <CTable
        striped
        className="mt-0 text-start profile-tab-table-size w-100 table-layout-fixed"
      >
        <CTableHead className="profile-tab-header">
          <CTableRow>
            <CTableHeaderCell className="profile-tab-content">
              #
            </CTableHeaderCell>
            <CTableHeaderCell className="profile-tab-content">
              KPI Name
            </CTableHeaderCell>
            <CTableHeaderCell className="profile-tab-content">
              Description
            </CTableHeaderCell>
            <CTableHeaderCell className="profile-tab-content">
              Frequency
            </CTableHeaderCell>
            <CTableHeaderCell className="profile-tab-content">
              Target
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {isLoading !== ApiLoadingState.loading ? (
            kpis &&
            kpis?.map((kpi: KPIs, index) => {
              const kpiNameLimit = limit(kpi.name)
              const kpiDescriptionLimit = limit(kpi.description)
              const kpiFrequencyLimit = limit(kpi.frequency)
              const kpiTargetLimit = limit(kpi.target)

              return (
                <CTableRow key={index}>
                  <CTableDataCell scope="row">{index + 1}</CTableDataCell>
                  {kpiNameLimit ? (
                    <CTableDataCell scope="row" className="commentWidth">
                      <CLink
                        className="cursor-pointer text-primary centerAlignment-text"
                        data-testid="kra-Name"
                        onClick={() => handlekpiDescriptionModal(kpi.name)}
                      >
                        {parse(kpiNameLimit)}
                      </CLink>
                    </CTableDataCell>
                  ) : (
                    <CTableDataCell>{`N/A`}</CTableDataCell>
                  )}
                  {kpiDescriptionLimit ? (
                    <CTableDataCell
                      scope="row"
                      className="sh-organization-link"
                    >
                      <CLink
                        className="cursor-pointer text-primary centerAlignment-text"
                        data-testid="kra-Name"
                        onClick={() =>
                          handlekpiDescriptionModal(kpi.description)
                        }
                      >
                        {parse(kpiDescriptionLimit)}
                      </CLink>
                    </CTableDataCell>
                  ) : (
                    <CTableDataCell>{`N/A`}</CTableDataCell>
                  )}
                  {kpiFrequencyLimit ? (
                    <CTableDataCell scope="row">
                      <CLink
                        className="cursor-pointer text-primary centerAlignment-text"
                        data-testid="kra-Name"
                        onClick={() => handlekpiDescriptionModal(kpi.frequency)}
                      >
                        {parse(kpiFrequencyLimit)}
                      </CLink>
                    </CTableDataCell>
                  ) : (
                    <CTableDataCell>{`N/A`}</CTableDataCell>
                  )}
                  {kpiTargetLimit ? (
                    <CTableDataCell scope="row">
                      <CLink
                        className="cursor-pointer text-primary centerAlignment-text"
                        data-testid="kra-Name"
                        onClick={() => handlekpiDescriptionModal(kpi.target)}
                      >
                        {parse(kpiTargetLimit)}
                      </CLink>
                    </CTableDataCell>
                  ) : (
                    <CTableDataCell>{`N/A`}</CTableDataCell>
                  )}
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
        modalFooterClass="d-none"
        modalHeaderClass="d-none"
        visible={isModalVisible}
        setVisible={setIsModalVisible}
      >
        <p>
          <span className="descriptionField">
            <div
              dangerouslySetInnerHTML={{
                __html: kpiDescription,
              }}
            />
          </span>
        </p>
      </OModal>
    </>
  )
}

export default KRAsDetailsTable
