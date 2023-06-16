import AssetHistoryTable from './AssetHistoryTable'
import { cleanup, render } from '../../../../test/testUtils'

describe('Expense Category List Table with data', () => {
  beforeEach(() => {
    // eslint-disable-next-line react/react-in-jsx-scope
    render(<AssetHistoryTable currentPage={0} pageSize={0} />, {
      preloadedState: {},
    })
  })
  afterEach(cleanup)
})
