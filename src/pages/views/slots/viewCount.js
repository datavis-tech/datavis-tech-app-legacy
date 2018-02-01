import { Statistic } from 'semantic-ui-react'
import { format } from 'd3-format'

const commaFormat = format(',')

// TODO: test
export default ({ viewCount }) => (
  <Statistic horizontal size='small'>
    <Statistic.Value>
      {commaFormat(viewCount)}
    </Statistic.Value>
    <Statistic.Label>
      Views
    </Statistic.Label>
  </Statistic>
)
