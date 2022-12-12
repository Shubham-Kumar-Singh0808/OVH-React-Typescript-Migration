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
      <ReactFusioncharts
        type="pie3d"
        width="100%"
        height="100%"
        dataFormat="JSON"
        dataSource={dataSource}
      />
    </>
  )
}
export default ResignationListViewChart
