import { Link2, Tag, X } from "lucide-react";
import { InputContainer } from "../../components/input";
import { Button } from "../../components/button";
import { FormEvent } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";

interface CreateLinkModalProps {
  closeCreateLinkModal: () => void
}

export function CreateLinkModal({
  closeCreateLinkModal
}: CreateLinkModalProps) {
  const { tripId } = useParams()

  async function createLink(event: FormEvent<HTMLFormElement>){
    event.preventDefault()

    const data = new FormData(event.currentTarget)

    const title = data.get('title')?.toString()
    const url = data.get('url')?.toString()

    await api.post(`/trips/${tripId}/links`, {
      title,
      url
    })

    window.document.location.reload()
  }


  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-md bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg">Cadastrar um novo link</h2>
            <button>
              <X className="size-5 text-zinc-400" onClick={closeCreateLinkModal} />
            </button>
          </div>
          <p className="text-sm text-zinc-400">Informe links importantes</p>
        </div>

        <form onSubmit={createLink} className="space-y-3">
          <InputContainer variant="secondary">
            <Tag className="text-zinc-400 size-5" />
            <input 
              name="title" 
              placeholder="Nome do link?"
              className="bg-transparent placeholder-zinc-400 outline-none gap-2" 
            />
          </InputContainer >
          
          <InputContainer variant="secondary" textColor="zinc">
            <Link2 className="text-zinc-400 size-5" />
            <input 
              name="url"
              placeholder="Informe o link http://exemplo.com" 
              className="bg-transparent text-lg placeholder-zinc-400 outline-none gap-2 flex-1 [color-scheme:dark]" 
            />
          </InputContainer>

          <Button type="submit" variant="primary" size="full">
            Salvar link
          </Button>
        </form>
      </div>
    </div>
  )
}