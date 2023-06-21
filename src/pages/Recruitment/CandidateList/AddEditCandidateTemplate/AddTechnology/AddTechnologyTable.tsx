import React, { useState } from 'react'
import {
  CButton,
  CCol,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CRow,
} from '@coreui/react-pro'
import { useAppDispatch, useTypedSelector } from '../../../../../stateStore'
import OModal from '../../../../../components/ReusableComponent/OModal'
import useModal from '../../../../../middleware/hooks/useModal'
import { GetAllTechnology } from '../../../../../types/Recruitment/JobOpenings/jobOpeningsTypes'
import { initialGetAllTechnology } from '../../CandidateListHelpers'
import { reduxServices } from '../../../../../reducers/reduxServices'

const AddTechnologyTable = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const technologyList = useTypedSelector(
    (state) => state.candidateList.getAllTechnology,
  )
  const [technologyToDelete, setTechnologyToDelete] =
    useState<GetAllTechnology>(initialGetAllTechnology)
  const { showModal, setShowModal, modalDescription, setModalDescription } =
    useModal({ displayModal: false, initialDescription: '' })

  const deleteButtonHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
    technologyClicked: GetAllTechnology,
  ) => {
    e.preventDefault()
    setTechnologyToDelete(technologyClicked)
    setModalDescription(`Do you want to delete ${technologyClicked.name}?`)
    setShowModal(true)
  }

  const modalDeleteButtonHandler = async () => {
    const result = await dispatch(
      reduxServices.candidateList.deleteTechnologyThunk(technologyToDelete.id),
    )
    if (
      reduxServices.candidateList.deleteTechnologyThunk.fulfilled.match(result)
    ) {
      dispatch(reduxServices.candidateList.getTechnology())
    }
  }

  const closeModalHandler = (value: boolean) => {
    setShowModal(value)
  }

  return (
    <>
      <CTable responsive striped align="middle">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Technology Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Action</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {technologyList?.map((technology, technologyIndex) => (
            <CTableRow
              key={technologyIndex}
              data-testid={'addCandidate-technologyRow'}
            >
              <CTableDataCell>{technologyIndex + 1}</CTableDataCell>
              <CTableDataCell>{technology.name}</CTableDataCell>
              <CTableDataCell>
                <CButton
                  color="danger"
                  className="btn-ovh"
                  data-testid={`addCandidate-delTechBtn-${technologyIndex}`}
                  onClick={(e) => deleteButtonHandler(e, technology)}
                >
                  <i className="fa fa-trash-o"></i>
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
      <CRow>
        <CCol md={4}>
          <b data-testid={'addCandidate-technologyCount'}>
            {technologyList.length > 0
              ? `Total Records: ${technologyList.length}`
              : 'No Records Found...'}
          </b>
        </CCol>
      </CRow>
      <OModal
        visible={showModal}
        setVisible={closeModalHandler}
        confirmButtonAction={modalDeleteButtonHandler}
        confirmButtonText="Yes"
        cancelButtonText="No"
        modalHeaderClass="d-none"
      >
        {modalDescription}
      </OModal>
    </>
  )
}

export default AddTechnologyTable
