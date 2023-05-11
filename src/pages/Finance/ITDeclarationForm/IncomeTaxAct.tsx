import { CCardHeader } from '@coreui/react-pro'
import React, { useEffect } from 'react'
import SectionsFilterOptions from './SectionsFilterOptions'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'

const IncomeTaxAct = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const finalITSubmissionForSectionDTO = useTypedSelector(
    (state) => state.itDeclarationForm.submitITDeclarationForm.formSectionsDTOs,
  )

  useEffect(() => {
    if (
      finalITSubmissionForSectionDTO.filter((item) => item.isOld === true)
        .length === 0
    ) {
      dispatch(
        reduxServices.itDeclarationForm.actions.setSubmitButtonDisabled(),
      )
    }
  }, [finalITSubmissionForSectionDTO])
  return (
    <>
      <CCardHeader>
        <h4 className="h4">
          Deduction available for Salaried employees under Income Tax Act 1961
        </h4>
      </CCardHeader>
      <SectionsFilterOptions showAsterix={true} isOldEmployee={true} />
    </>
  )
}

export default IncomeTaxAct
