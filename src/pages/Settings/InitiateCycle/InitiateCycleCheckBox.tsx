import { CFormCheck } from '@coreui/react-pro'
import React, { useState } from 'react'
import { GetQuestion } from '../../../types/Settings/InitiateCycle/initiateCycleTypes'

const InitiateCycleCheckBox = ({
  item,
}: {
  item: GetQuestion
}): JSX.Element => {
  const [isChecked, setIsChecked] = useState(item.checkQuestion)

  const switchOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target
    const checkedCopy = checked
    setIsChecked(checkedCopy)
  }

  return (
    <>
      <CFormCheck
        data-testid="ch-All-countries"
        id="all"
        type="checkbox"
        name="checkQuestion"
        checked={isChecked as boolean}
        onChange={(e) => switchOnChangeHandler(e)}
      />
    </>
  )
}

export default InitiateCycleCheckBox
