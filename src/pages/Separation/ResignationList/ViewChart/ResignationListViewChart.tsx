import { CChart } from '@coreui/react-pro'
import React from 'react'

const ResignationListViewChart = (): JSX.Element => {
  return (
    <>
      <CChart
        type="doughnut"
        data={{
          labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
          datasets: [
            {
              backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
              data: [40, 20, 80, 10],
            },
          ],
        }}
      />
    </>
  )
}

export default ResignationListViewChart
