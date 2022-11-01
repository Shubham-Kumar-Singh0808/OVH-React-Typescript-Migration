import { getAllMeetingRooms } from '../../types/ConferenceRoomBooking/NewBooking/RoomList/roomListTypes'

export const mockRoomNames: getAllMeetingRooms[] = [
  {
    id: 2,
    roomName: 'Vivekananda - 2nd Floor',
    locationId: 1,
    locationName: 'RayBiztech-1',
    roomStatus: false,
  },
  {
    id: 5,
    roomName: 'Valmiki - 3rd Floor',
    locationId: 2,
    locationName: 'Raybiztech - 2',
    roomStatus: true,
  },
  {
    id: 35,
    roomName: 'Aurobindo',
    locationId: 23,
    locationName: 'Microsoft Teams Meeting',
    roomStatus: true,
  },
  {
    id: 39,
    roomName: 'Ajay Ray Cabin',
    locationId: 14,
    locationName: 'Business room',
    roomStatus: true,
  },
]
