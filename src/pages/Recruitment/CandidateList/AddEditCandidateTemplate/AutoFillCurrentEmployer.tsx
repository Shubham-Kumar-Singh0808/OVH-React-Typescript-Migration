import React from 'react'
import Autocomplete from 'react-autocomplete'
import { IncomingCompaniesData } from '../../../../types/Recruitment/CandidateList/CandidateListTypes'

const AutoFillCurrentEmployer = ({
  companiesList,
  currentEmployer,
  setCurrentEmployer,
}: {
  companiesList: IncomingCompaniesData[]
  currentEmployer: string
  setCurrentEmployer: React.Dispatch<React.SetStateAction<string>>
}): JSX.Element => {
  const handleSelectedEmployer = (value: string) => {
    setCurrentEmployer(value)
  }
  return (
    <Autocomplete
      inputProps={{
        className: 'form-control form-control-sm',
        autoComplete: 'on',
        placeholder: 'Current Employer',
      }}
      items={companiesList}
      getItemValue={(name) => name.companyName}
      value={currentEmployer}
      onChange={(e) => setCurrentEmployer(e.target.value)}
      wrapperStyle={{ position: 'relative' }}
      onSelect={(val) => handleSelectedEmployer(val)}
      renderMenu={(children) => (
        <div
          data-testid="autoComplete-currentEmployer"
          className={
            currentEmployer && currentEmployer.length > 0
              ? 'autocomplete-dropdown-wrap'
              : 'autocomplete-dropdown-wrap hide'
          }
        >
          {children}
        </div>
      )}
      renderItem={(item, isHighlighted) => (
        <div
          className={
            isHighlighted
              ? 'autocomplete-dropdown-item active'
              : 'autocomplete-dropdown-item'
          }
          key={item.companyId}
        >
          {item.companyName}
        </div>
      )}
      shouldItemRender={(item, value) =>
        item.companyName.toLowerCase().indexOf(value.toLowerCase()) > -1
      }
    />
  )
}

export default AutoFillCurrentEmployer
