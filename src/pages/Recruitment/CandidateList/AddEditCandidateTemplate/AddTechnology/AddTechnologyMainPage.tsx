import React from 'react'
import { CButton, CCol, CRow } from '@coreui/react-pro'
import AddTechnologyTable from './AddTechnologyTable'
import AddNewTechnology from './AddNewTechnology'
import { useAppDispatch } from '../../../../../stateStore'
import { reduxServices } from '../../../../../reducers/reduxServices'
import { CurrentAddCandidatePage } from '../../../../../types/Recruitment/CandidateList/CandidateListTypes'

const AddTechnologyMainPage = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const backButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(
      reduxServices.candidateList.actions.setCurrentAddCandidatePage(
        CurrentAddCandidatePage.addCandidate,
      ),
    )
  }

  return (
    <>
      <CRow className="mt-2 justify-content-end text-end">
        <CCol xs={2} className="px-0">
          <CButton
            color="info"
            className="btn-ovh me-3"
            data-testid="addCandidate-addTech-backBtn"
            onClick={backButtonHandler}
          >
            <i className="fa fa-arrow-left me-1"></i>Back
          </CButton>
        </CCol>
      </CRow>
      <AddNewTechnology />
      <AddTechnologyTable />
    </>
  )
}

export default AddTechnologyMainPage
