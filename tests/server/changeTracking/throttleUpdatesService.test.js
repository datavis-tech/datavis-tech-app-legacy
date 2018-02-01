const sendMessage = jest.fn()
function mockRsmq () {}

mockRsmq.prototype.sendMessage = sendMessage

jest.mock('rsmq', () => mockRsmq)
jest.mock('../../../src/server/changeTracking/buffers', () => ({
  datasetsUpdatesBuffer: new Set([1, 2, 3]),
  visualizationsUpdatesBuffer: new Set([4, 5, 6])
}))

import { VISUALIZATION_UPDATED, DATASET_UPDATED } from '../../../src/server/changeTracking/queues'
import { datasetsUpdatesBuffer, visualizationsUpdatesBuffer } from '../../../src/server/changeTracking/buffers'
import { THROTTLE_PERIOD } from '../../../src/server/changeTracking/constants'
import sut from '../../../src/server/changeTracking/throttleUpdatesService'

jest.useFakeTimers()

describe('throttle updates service', () => {

  beforeAll(() => {
    sut()
  })

  it('should send messages to dataset updated queue using datasets updates buffer', () => {
    expect(sendMessage).toHaveBeenCalledWith({
      qname: DATASET_UPDATED,
      message: JSON.stringify({documentId: 1})
    }, expect.any(Function))

    expect(sendMessage).toHaveBeenCalledWith({
      qname: DATASET_UPDATED,
      message: JSON.stringify({documentId: 2})
    }, expect.any(Function))

    expect(sendMessage).toHaveBeenCalledWith({
      qname: DATASET_UPDATED,
      message: JSON.stringify({documentId: 3})
    }, expect.any(Function))
  })

  it('should send messages to vis updated queue using visualizations updates buffer', () => {
    expect(sendMessage).toHaveBeenCalledWith({
      qname: VISUALIZATION_UPDATED,
      message: JSON.stringify({documentId: 4})
    }, expect.any(Function))

    expect(sendMessage).toHaveBeenCalledWith({
      qname: VISUALIZATION_UPDATED,
      message: JSON.stringify({documentId: 5})
    }, expect.any(Function))

    expect(sendMessage).toHaveBeenCalledWith({
      qname: VISUALIZATION_UPDATED,
      message: JSON.stringify({documentId: 6})
    }, expect.any(Function))
  })

  it('should empty datasets updates buffers', () => {
    expect(datasetsUpdatesBuffer.size).toBe(0)
  })

  it('should empty visualizations updates buffers', () => {
    expect(visualizationsUpdatesBuffer.size).toBe(0)
  })

  describe(`after ${THROTTLE_PERIOD} miliseconds`, () => {

    beforeEach(() => {

      sendMessage.mockClear()

      datasetsUpdatesBuffer.add(10)
      visualizationsUpdatesBuffer.add(40)

      jest.runTimersToTime(THROTTLE_PERIOD)
    })

    it('should be launched again', () => {
      expect(sendMessage).toHaveBeenCalledTimes(2)
    })

  })

})
