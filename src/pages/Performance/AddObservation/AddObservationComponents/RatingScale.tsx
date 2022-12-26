import React from 'react'
import parse from 'html-react-parser'
import WrapperComponent from './WrapperComponent'
import { useTypedSelector } from '../../../../stateStore'

const RatingScale = () => {
  const ratingScaleData = useTypedSelector(
    (state) => state.addObservation.ratingScaleRender,
  )
  return (
    <WrapperComponent title={ratingScaleData.title}>
      <br></br>
      {parse(ratingScaleData.description)}
    </WrapperComponent>
  )
}

export default RatingScale
