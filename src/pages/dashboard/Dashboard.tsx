import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'

import React, { useEffect, useState } from 'react'
import TestComponent from '../../views/blank/TestComponent'
import OCard from '../../components/reusable-component/OCard'
interface Todo {
  userId: number
  id: number
  title: string
  completed: boolean
}
const Dashboard = (): JSX.Element => {
  const [todo, setTodo] = useState<Todo[]>([])
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((res) => res.json())
      .then(
        (response) => {
          setTodo(response)
          console.log(response)
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error)
        },
      )
  }, [])
  return (
    <>
      <ul>
        {todo.map((item) => (
          <li key={item.id}>
            {item.id} {item.title}
          </li>
        ))}
      </ul>
      <OCard
        className=""
        CHeaderClassName="Basheer"
        title="Title Here"
        CLinkClassName="basheer-link"
      >
        <TestComponent />
      </OCard>
    </>
  )
}

export default Dashboard
