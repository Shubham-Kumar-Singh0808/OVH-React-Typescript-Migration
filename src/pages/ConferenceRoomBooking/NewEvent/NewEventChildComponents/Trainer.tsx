import { CRow, CFormLabel, CCol } from '@coreui/react-pro'
import React, { useEffect } from 'react'
import Autocomplete from 'react-autocomplete'
import { TextDanger, TextWhite } from '../../../../constant/ClassName'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch } from '../../../../stateStore'
import {
  LoggedEmployee,
  TrainerDetails,
} from '../../../../types/ConferenceRoomBooking/NewEvent/newEventTypes'

const Trainer = ({
  allEmployeesProfiles,
  onSelectTrainer,
  shouldReset,
  trainerAutoCompleteTarget,
  setTrainerAutoCompleteTarget,
}: {
  allEmployeesProfiles: LoggedEmployee[]
  onSelectTrainer: (value: TrainerDetails) => void
  shouldReset: boolean
  trainerAutoCompleteTarget: string | undefined
  setTrainerAutoCompleteTarget: React.Dispatch<
    React.SetStateAction<string | undefined>
  >
}): JSX.Element => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (trainerAutoCompleteTarget) {
      dispatch(
        reduxServices.newEvent.getAllEmployees(trainerAutoCompleteTarget),
      )
    }
  }, [trainerAutoCompleteTarget])

  useEffect(() => {
    if (shouldReset) setTrainerAutoCompleteTarget('')
  }, [shouldReset])

  const onHandleSelectTrainer = (fullName: string) => {
    setTrainerAutoCompleteTarget(fullName)
    const trainer = allEmployeesProfiles.find(
      (value) => value.fullName === fullName,
    )

    onSelectTrainer(trainer as TrainerDetails)
  }

  return (
    <CRow className="mt-1 mb-3">
      <CFormLabel
        className="col-sm-3 col-form-label text-end"
        data-testid="pmLabel"
      >
        Trainer :
        <span className={trainerAutoCompleteTarget ? TextWhite : TextDanger}>
          *
        </span>
      </CFormLabel>
      <CCol sm={6}>
        <Autocomplete
          inputProps={{
            className: 'form-control form-control-sm',
            id: 'trainer-autocomplete',
            placeholder: 'Trainer',
          }}
          getItemValue={(item) => item.fullName}
          items={allEmployeesProfiles}
          data-testid="author-input"
          wrapperStyle={{ position: 'relative' }}
          renderMenu={(children) => (
            <div
              className={
                trainerAutoCompleteTarget &&
                trainerAutoCompleteTarget.length > 0
                  ? 'autocomplete-dropdown-wrap'
                  : 'autocomplete-dropdown-wrap hide'
              }
            >
              {children}
            </div>
          )}
          renderItem={(item, isHighlighted) => (
            <div
              data-testid="trainer-option"
              className={
                isHighlighted
                  ? 'autocomplete-dropdown-item active'
                  : 'autocomplete-dropdown-item '
              }
              key={item.id}
            >
              {item.fullName}
            </div>
          )}
          value={trainerAutoCompleteTarget}
          shouldItemRender={(item, value) =>
            item.fullName.toLowerCase().indexOf(value.toLowerCase()) > -1
          }
          onChange={(e) => setTrainerAutoCompleteTarget(e.target.value)}
          onSelect={(value) => onHandleSelectTrainer(value)}
        />
      </CCol>
    </CRow>
  )
}

export default Trainer
