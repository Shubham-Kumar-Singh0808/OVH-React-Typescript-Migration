import { CFormInput, CButton } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useTypedSelector } from '../../../../../stateStore'
import { isTechnologyInTheList } from '../../CandidateListHelpers'
import { reduxServices } from '../../../../../reducers/reduxServices'
import OToast from '../../../../../components/ReusableComponent/OToast'

const AddNewTechnology = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const technologyList = useTypedSelector(
    (state) => state.candidateList.getAllTechnology,
  )
  const [enteredTechnology, setEnteredTechnology] = useState<string>('')
  const [isAddButtonEnabled, setAddButtonEnabled] = useState<boolean>(false)

  const enteredTechnologyChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setEnteredTechnology(e.target.value)
  }

  useEffect(() => {
    if (enteredTechnology.trim().length > 0) {
      setAddButtonEnabled(true)
    } else {
      setAddButtonEnabled(false)
    }
  }, [enteredTechnology])

  const addTechnologyClickHandler = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault()
    if (isTechnologyInTheList(technologyList, enteredTechnology)) {
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="danger"
            toastMessage="Technology Already Exists"
          />,
        ),
      )
      setEnteredTechnology('')
      return
    }
    const result = await dispatch(
      reduxServices.candidateList.addTechnologyThunk(enteredTechnology.trim()),
    )
    if (
      reduxServices.candidateList.addTechnologyThunk.fulfilled.match(result)
    ) {
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="success"
            toastMessage="Technology Added Successfully"
          />,
        ),
      )
      setEnteredTechnology('')
      dispatch(reduxServices.candidateList.getTechnology())
    }
  }

  return (
    <div className="d-flex flex-row flex-wrap align-items-center my-2">
      <div className="ms-3">
        <CFormInput
          type="text"
          className="pe-5"
          data-testid="addCandidate-addTechInput"
          placeholder="Enter Technology Name"
          value={enteredTechnology}
          onChange={enteredTechnologyChangeHandler}
        />
      </div>
      <div>
        <CButton
          className="ms-3 btn-ovh"
          color="info"
          data-testid="addCandidate-addTechBtn"
          disabled={!isAddButtonEnabled}
          onClick={addTechnologyClickHandler}
        >
          <i className="fa fa-plus me-1"></i>
          Add Technology
        </CButton>
      </div>
    </div>
  )
}

export default AddNewTechnology
