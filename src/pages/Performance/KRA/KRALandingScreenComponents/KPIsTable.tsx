import {
  CButton,
  CLink,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import parse from 'html-react-parser'
import OModal from '../../../../components/ReusableComponent/OModal'
import { useTypedSelector } from '../../../../stateStore'
import { emptyString } from '../../../Achievements/AchievementConstants'
import { dottedContent } from '../KRAConstants'

type ModalContent = string | JSX.Element | JSX.Element[]

const KPIsTable = (): JSX.Element => {
  const kpiList = useTypedSelector(
    (state) => state.KRA.kpisForIndividualKRAList,
  )
  const [isModalVisible, setModalVisible] = useState<boolean>(false)
  const [modalDescription, setModalDescription] =
    useState<ModalContent>(emptyString)
  console.log(kpiList)

  const descriptionHandler = (
    e: React.MouseEvent<HTMLElement>,
    content: ModalContent,
  ) => {
    setModalDescription(content)
    setModalVisible(true)
  }

  const modalContentCheck = (value: string | null) => {
    return value !== null ? value : 'N/A'
  }

  return (
    <>
      <CTable
        responsive
        striped
        align="middle"
        className="mt-0 text-start profile-tab-table-size w-100"
      >
        <CTableHead className="profile-tab-header">
          <CTableRow>
            <CTableHeaderCell scope="col" className="profile-tab-content">
              #
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="profile-tab-content">
              KPI Name
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="profile-tab-content">
              Description
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="profile-tab-content">
              Frequency
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="profile-tab-content">
              Target
            </CTableHeaderCell>
            <CTableHeaderCell
              scope="col"
              className="profile-tab-content text-center"
            >
              Actions
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {kpiList.map((item, index) => (
            <CTableRow key={index}>
              <CTableDataCell>{index + 1}</CTableDataCell>
              <CTableDataCell scope="row" className="commentWidth">
                <CLink
                  className="cursor-pointer text-primary centerAlignment-text"
                  data-testid="kpi-Name"
                  onClick={(e) => descriptionHandler(e, item.name)}
                >
                  {dottedContent(item.name)}
                </CLink>
              </CTableDataCell>
              {item.description !== null ? (
                <CTableDataCell scope="row" className="commentWidth">
                  <CLink
                    className="cursor-pointer text-primary centerAlignment-text"
                    data-testid="kpi-Name"
                    onClick={(e) =>
                      descriptionHandler(
                        e,
                        parse(modalContentCheck(item.description)),
                      )
                    }
                  >
                    {parse(dottedContent(item.description))}
                  </CLink>
                </CTableDataCell>
              ) : (
                <CTableDataCell>N/A</CTableDataCell>
              )}
              {item.frequency !== null ? (
                <CTableDataCell scope="row" className="commentWidth">
                  <CLink
                    className="cursor-pointer text-primary centerAlignment-text"
                    data-testid="kpi-Name"
                    onClick={(e) =>
                      descriptionHandler(e, modalContentCheck(item.frequency))
                    }
                  >
                    {item.frequency}
                  </CLink>
                </CTableDataCell>
              ) : (
                <CTableDataCell>N/A</CTableDataCell>
              )}
              {item.target !== null ? (
                <CTableDataCell scope="row" className="commentWidth">
                  <CLink
                    className="cursor-pointer text-primary centerAlignment-text"
                    data-testid="kpi-Name"
                  >
                    {dottedContent(item.target)}
                  </CLink>
                </CTableDataCell>
              ) : (
                <CTableDataCell>N/A</CTableDataCell>
              )}
              <CTableDataCell>
                <div className="d-flex flex-row align-items-center justify-content-end">
                  <div className="button-events">
                    <CButton
                      size="sm"
                      color="info"
                      className="btn-ovh me-1"
                      title="Edit"
                    >
                      <i
                        className="fa fa-pencil-square-o"
                        aria-hidden="true"
                      ></i>
                    </CButton>
                    <CButton
                      size="sm"
                      color="danger"
                      className="btn-ovh me-1"
                      title="Delete"
                    >
                      <i className="fa fa-trash-o" aria-hidden="true"></i>
                    </CButton>
                  </div>
                </div>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
      <OModal
        visible={isModalVisible}
        setVisible={setModalVisible}
        modalSize="lg"
        alignment="center"
        modalFooterClass="d-none"
        modalHeaderClass="d-none"
      >
        <div>{modalDescription}</div>
      </OModal>
    </>
  )
}

export default KPIsTable
