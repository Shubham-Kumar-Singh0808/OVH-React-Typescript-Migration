import { CFormCheck } from '@coreui/react-pro'
import React, { useState } from 'react'
import { GetQuestion } from '../../../types/Settings/InitiateCycle/initiateCycleTypes'

const InitiateCycleCheckBox = ({
  item,
  onChangeHandler,
}: {
  item: GetQuestion
  onChangeHandler: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => void
}): JSX.Element => {
  const [isChecked, setIsChecked] = useState<boolean>()
  return (
    <>
      <CFormCheck
        data-testid="ch-All-countries"
        id="all"
        type="checkbox"
        name="checkQuestion"
        checked={item.checkQuestion === true ? isChecked : false}
        onChange={(e) => setIsChecked(e.target.checked)}
        // onChange={() => onChangeHandler}
      />
    </>
  )
}

export default InitiateCycleCheckBox
