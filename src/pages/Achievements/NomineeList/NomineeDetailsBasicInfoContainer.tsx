import React from 'react'

const NomineeDetailsBasicInfoContainer = ({
  children,
}: {
  children: React.ReactNode
}): JSX.Element => {
  return <div className="d-flex flex-row me-5 flex-wrap">{children}</div>
}

export default NomineeDetailsBasicInfoContainer
