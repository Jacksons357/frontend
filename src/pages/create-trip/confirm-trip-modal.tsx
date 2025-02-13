import { Mail, User, X } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../components/button";
import { InputContainer } from "../../components/input";

interface ConfirmTripModalProps {
  closeConfirmTripModal: () => void
  createTrip: (event: FormEvent<HTMLFormElement>) => void
  setOwnerName: (name: string) => void
  setOwnerEmail: (email: string) => void
}

export function ConfirmTripModal({
  closeConfirmTripModal,
  createTrip,
  setOwnerName,
  setOwnerEmail
}: ConfirmTripModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-md bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg">Confirmar criação da viagem</h2>
            <button>
              <X className="size-5 text-zinc-400" onClick={closeConfirmTripModal} />
            </button>
          </div>
          <p className="text-sm text-zinc-400">Para concluir a criação da viagem para <span className="text-zinc-100 font-semibold">Florianópolis, Brasil</span> nas datas de <span className="text-zinc-100 font-semibold">16 a 27 de Agosto de 2024</span> preencha seus dados abaixo:</p>
        </div>

        <form onSubmit={createTrip} className="space-y-3">
          <InputContainer variant="secondary" >
            <User className="text-zinc-400 size-5" />
            <input 
              name="name" 
              placeholder="Seu nome completo" 
              className="bg-transparent placeholder-zinc-400 outline-none gap-2" 
              onChange={event => setOwnerName(event.target.value)}
            />
          </InputContainer >

          <InputContainer variant="secondary">
            <Mail className="text-zinc-400 size-5" />
            <input 
              name="email" 
              type="email"
              placeholder="Seu e-mail pessoal" 
              className="bg-transparent placeholder-zinc-400 outline-none gap-2" 
              onChange={event => setOwnerEmail(event.target.value)}
            />
          </InputContainer>

          <Button type="submit" variant="primary" size="full">
            Confirmar criação da viagem
          </Button>
        </form>
      </div>
    </div>
  )
}