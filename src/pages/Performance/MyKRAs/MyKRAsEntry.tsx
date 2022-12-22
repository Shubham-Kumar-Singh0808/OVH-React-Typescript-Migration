import { CTableRow, CTableDataCell, CLink } from '@coreui/react-pro'
import React, { useState } from 'react'
import KRAsDetailsTable from './KRAsDetailsTable'
import { useAppDispatch } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import { KRAs } from '../../../types/Performance/MyKRAs/myKRAsTypes'
import OModal from '../../../components/ReusableComponent/OModal'

const MyKRAsEntry = (props: {
  id: number
  employeeKRA: KRAs
  selectedPersonId: number
  setSelectedPersonId: (value: number) => void
  isIconVisible: boolean
  setIsIconVisible: (value: boolean) => void
}): JSX.Element => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [kraDescription, setKraDescription] = useState<string>('')
  const dispatch = useAppDispatch()

  const handleExpandRow = (
    id: number | React.MouseEvent<HTMLButtonElement>,
  ) => {
    props.setSelectedPersonId(id as number)
    dispatch(reduxServices.myKRAs.getKPIsForIndividualEmployee(id as number))
    props.setIsIconVisible(true)
  }

  const handleKRADescriptionModal = (descKRA: string) => {
    setIsModalVisible(true)
    setKraDescription(descKRA)
  }

  return (
    <>
      <CTableRow>
        <CTableDataCell scope="row">
          {props.isIconVisible && props.selectedPersonId === props.id ? (
            <i
              data-testid="ic-expandIcon"
              className="fa fa-minus-circle cursor-pointer"
              onClick={() => props.setIsIconVisible(false)}
            />
          ) : (
            <i
              data-testid="ic-collapseIcon"
              className="fa fa-plus-circle cursor-pointer"
              onClick={() => handleExpandRow(props.id)}
            />
          )}
        </CTableDataCell>
        <CTableDataCell scope="row" className="commentWidth">
          <CLink
            className="cursor-pointer text-primary centerAlignment-text"
            data-testid="kra-Name"
            onClick={() => handleKRADescriptionModal(props.employeeKRA.name)}
          >
            {props.employeeKRA.name}
          </CLink>
        </CTableDataCell>
        {props.employeeKRA.description ? (
          <CTableDataCell scope="row" className="commentWidth">
            <CLink
              className="cursor-pointer text-primary centerAlignment-text"
              data-testid="kra-Name"
              onClick={() =>
                handleKRADescriptionModal(props.employeeKRA.description)
              }
            >
              {props.employeeKRA.description}
            </CLink>
          </CTableDataCell>
        ) : (
          <CTableDataCell scope="row">N/A</CTableDataCell>
        )}
        <CTableDataCell scope="row">
          {`${props.employeeKRA.designationKraPercentage}%`}
        </CTableDataCell>
        <CTableDataCell scope="row">{props.employeeKRA.count}</CTableDataCell>
      </CTableRow>
      {props.isIconVisible && props.selectedPersonId === props.id ? (
        <CTableDataCell colSpan={10}>
          <KRAsDetailsTable />
        </CTableDataCell>
      ) : (
        <></>
      )}
      <OModal
        modalSize="lg"
        alignment="center"
        modalFooterClass="d-none"
        modalHeaderClass="d-none"
        visible={isModalVisible}
        setVisible={setIsModalVisible}
      >
        <p>
          <div
            dangerouslySetInnerHTML={{
              __html: kraDescription,
            }}
          />
        </p>
      </OModal>
    </>
  )
}

export default MyKRAsEntry
