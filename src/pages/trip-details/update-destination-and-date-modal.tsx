import { Calendar, MapPin, X } from "lucide-react";
import { InputContainer } from "../../components/input";
import { Button } from "../../components/button";
import { FormEvent, useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { api } from "../../lib/axios";
import { useNavigate, useParams } from "react-router-dom";

interface UpdateDestinationAndDateModalProps {
  closeDestinationAndDateModal: () => void
}

export function UpdateDestinationAndDateModal({
  closeDestinationAndDateModal
}: UpdateDestinationAndDateModalProps){
  const { tripId } = useParams()
  const navigate = useNavigate()

  const [destination, setDestination] = useState('')
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>()
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  const displayedDate = eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to
  ? format(eventStartAndEndDates.from, "d' de 'LLL").concat(' até ').concat(format(eventStartAndEndDates.to, "d' de 'LLL"))
  : null

  function openDatePicker() {
    setIsDatePickerOpen(true)
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false)
  }
 
  async function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!destination){
      return
    }

    const response = await api.put(`/trips/${tripId}`, {
      destination,
      starts_at: eventStartAndEndDates?.from,
      ends_at: eventStartAndEndDates?.to
    })

    window.document.location.reload()
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-md bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg">Alterar destino e data</h2>
            <button>
              <X className="size-5 text-zinc-400" onClick={closeDestinationAndDateModal} />
            </button>
          </div>
          <p className="text-sm text-zinc-400">Altere para qual data deseja ir</p>
        </div>

        <form onSubmit={createTrip} className="space-y-3">
          <InputContainer variant="secondary">
            <MapPin className="text-zinc-400 size-5" />
            <input 
              type="text"
              placeholder="Para onde você vai?" 
              className="bg-transparent placeholder-zinc-400 outline-none gap-2"
              onChange={event => setDestination(event.target.value)}
            />
          </InputContainer >
          
          <button 
            onClick={openDatePicker}
            className="flex items-center text-left w-[240px] h-14 px-5 bg-zinc-950 border border-zinc-800 rounded-lg gap-2"
          >
            <Calendar className="size-5 text-zinc-400" />
            <span className="text-lg text-zinc-400 w-48">
              {displayedDate || 'Quando?'}
            </span>
          </button>

          {isDatePickerOpen && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
              <div className="rounded-xl py-5 px-6 shadow-md bg-zinc-900 space-y-5">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-lg">Selecione a data</h2>
                    <button>
                      <X className="size-5 text-zinc-400" onClick={closeDatePicker} />
                    </button>
                  </div>
                </div>

                <DayPicker 
                  mode="range" 
                  selected={eventStartAndEndDates} 
                  onSelect={setEventStartAndEndDates} 
                />
              </div>
            </div>
          )}

          <Button type="submit" variant="primary" size="full">
            Atualizar destino
          </Button>
        </form>
      </div>
    </div>
  )
}