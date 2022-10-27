import { rest } from 'msw'
import { roomListApiConfig } from '../../middleware/api/apiList'
import { mockRoomNames } from '../data/addRoomListData'

export const addLocationListHandlers = [
  rest.get(roomListApiConfig.getAllMeetingRooms, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: { mockRoomNames },
      }),
    )
  }),
  rest.post(roomListApiConfig.addRoom, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ status: 200, data: {} }))
  }),
  rest.delete(roomListApiConfig.deleteRoom, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ status: 200 }))
  }),
]
