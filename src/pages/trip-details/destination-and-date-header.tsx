import { MapPin, Calendar, Settings2 } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from 'react-router-dom'
import { api } from "../../lib/axios";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { UpdateDestinationAndDateModal } from "./update-destination-and-date-modal";

interface Trip {
  id: string
  destination: string
  starts_at: string
  ends_at: string
  is_confirmed: boolean
}

export function DestinationAndDateHeader() {
  const [isOpenUpdateDestination, setIsOpenUpdateDestination] = useState(false)
  const { tripId } = useParams()
  const [trip, setTrip] = useState<Trip | undefined>()

  useEffect(() => {
    api.get(`/trips/${tripId}`).then(response => setTrip(response.data.trip))
  }, [tripId])

  const displayedDate = trip
    ? format(trip.starts_at, "d' de 'LLL")
      .concat(' até ')
      .concat(format(trip.ends_at, "d' de 'LLL"))
    : null

  function openUpdateDestinationModal() {
    setIsOpenUpdateDestination(true)
  }

  function closeDestinationAndDateModal() {
    setIsOpenUpdateDestination(false)
  }

  return (
    <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-sm flex items-center justify-between">
      <div className="flex items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <span className=" text-zinc-100">{trip?.destination}</span>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400" />
          <span className=" text-zinc-100">{displayedDate}</span>
        </div>

        <div className="w-px h-6 bg-zinc-800" />

        <Button variant="secondary" onClick={openUpdateDestinationModal}>
          Alterar local/data
          <Settings2 className="size-5 text-zinc-400" />
        </Button>
      </div>

      {isOpenUpdateDestination && (
        <UpdateDestinationAndDateModal 
        closeDestinationAndDateModal={closeDestinationAndDateModal}
        />
      )}
    </div>
  )
}