import FusionCharts from 'fusioncharts'
import charts from 'fusioncharts/fusioncharts.charts'
import React from 'react'
import ReactFusioncharts from 'react-fusioncharts'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../stateStore'

// Resolves charts dependancy
charts(FusionCharts)

const ResignationListViewChart = (): JSX.Element => {
  const dataSource = useTypedSelector(
    reduxServices.resignationList.selectors.separationChartDetails,
  )
  return (
    <>
      <div className="text-center">
        <ReactFusioncharts
          type="pie3d"
          width="600"
          height="400"
          dataFormat="JSON"
          dataSource={dataSource}
        />
      </div>
    </>
  )
}
export default ResignationListViewChart
