import React, { createContext, useState } from 'react'

type MyContextType = {
  menu: [selectDate: string, setSelectDate: (value: string) => void]
}
type childrenType = {
  children: React.ReactNode
}

export const MyContext = createContext<MyContextType>({} as MyContextType)

const EmployeePIPListContext = (children: childrenType) => {
  const currentMonth = 'Current Month'
  const [selectDate, setSelectDate] = useState<string>(currentMonth)
  return (
    <MyContext.Provider value={{ menu: [selectDate, setSelectDate] }}>
      {children}
    </MyContext.Provider>
  )
}

export default EmployeePIPListContext
