import { rest } from 'msw'
import { roomListApiConfig } from '../../middleware/api/apiList'
import { mockRoomNames } from '../data/addRoomListData'

export const addRoomListHandlers = [
  rest.get(roomListApiConfig.getAllMeetingRooms, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: { mockRoomNames },
      }),
    )
  }),
  rest.post(roomListApiConfig.addRoom, (_req, res, ctx) => {
    const addRoomResponse = ctx.json({
      status: 200,
      data: {},
    })
    return res(addRoomResponse)
  }),
  rest.delete(roomListApiConfig.deleteRoom, (_req, res, ctx) => {
    const locDelResponse = ctx.json({
      status: 200,
      data: {},
    })
    return res(locDelResponse)
  }),
  rest.put(roomListApiConfig.updateRoom, (_req, res, ctx) => {
    const locResponse = ctx.json({
      status: 200,
      data: {},
    })
    return res(locResponse)
  }),
]
