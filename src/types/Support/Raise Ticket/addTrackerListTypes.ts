import { ApiLoadingState } from '../../../middleware/api/apiList'

export type Tracker = {
  id: number | undefined
  name: string
  permission: boolean
}
export type AddTrackerSliceState = {
  isLoading: ApiLoadingState
  trackerList: Tracker[]
}
// export type AddTrackerListProps = {
//   // addButtonHandler?: () => void
//   setToggle: (value: string) => void
//   // backButtonHandler?: () => void
// }
