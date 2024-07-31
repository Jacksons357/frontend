import { Link2, Plus } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { CreateLinkModal } from "./create-link-modal";

interface Links {
  id: string
  title: string
  url: string
}

export function ImportantLinks() {
  const [isOpenLinkModal, setIsOpenLinkModal] = useState(false)

  const { tripId } = useParams()
  const [links, setLinks] = useState<Links[]>([])

  useEffect(() => {
    api.get(`/trips/${tripId}/links`).then(response => setLinks(response.data.links))
  }, [tripId])

  function openCreateLinkModal(){
    setIsOpenLinkModal(true)
  }

  function closeCreateLinkModal(){
    setIsOpenLinkModal(false)
  }

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Links importantes</h2>
      <div className="space-y-5">
        {links.map(link => {
          return (
            <div key={link.id} className="flex items-center justify-between gap-4">
              <div className="space-y-1.5">
                <span className="block font-medium text-zinc-100">{link.title}</span>
                <a href="#" className="block text-xs text-zinc-400 truncate hover:text-zinc-200">
                  {link.url}
                </a>
              </div>
              <Link2 className="text-zinc-400 size-5 shrink-0" />
            </div>
          )
        })}

        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">Reserva do AirBnb</span>
            <a href="#" className="block text-xs text-zinc-400 truncate hover:text-zinc-200">
              https://www.airbnb.com.br/rooms/1047000112312312312312
            </a>
          </div>
          <Link2 className="text-zinc-400 size-5 shrink-0" />
        </div>
      </div>

      <Button variant="secondary" size="full" onClick={openCreateLinkModal}>
        <Plus className="size-5 text-zinc-400" />
        Cadastrar novo link
      </Button>

      {isOpenLinkModal && (
        <CreateLinkModal
          closeCreateLinkModal={closeCreateLinkModal}
        />
      )}
    </div>
  )
}