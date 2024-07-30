import { Calendar, Tag, X } from "lucide-react";
import { Button } from "../../components/button";
import { InputContainer } from "../../components/input";

interface CreateActivityModalProps {
  closeCreateActivityModal: () => void
}

export function CreateActivityModal({
  closeCreateActivityModal
}: CreateActivityModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="w-[640px] rounded-xl py-5 px-6 shadow-md bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-lg">Cadastrar atividade</h2>
                <button>
                  <X className="size-5 text-zinc-400" onClick={closeCreateActivityModal} />
                </button>
              </div>
              <p className="text-sm text-zinc-400">Todos convidados podem visualizar as atividades</p>
            </div>

            <form className="space-y-3">
              <InputContainer variant="secondary">
                <Tag className="text-zinc-400 size-5" />
                <input 
                  name="title" 
                  placeholder="Qual sua atividade?" 
                  className="bg-transparent placeholder-zinc-400 outline-none gap-2" 
                />
              </InputContainer >
              
              <InputContainer variant="secondary" textColor="zinc">
                <Calendar className="text-zinc-400 size-5" />
                <input 
                  name="occurs_at" 
                  type="datetime-local"
                  placeholder="Data e horario da atividade" 
                  className="bg-transparent text-lg placeholder-zinc-400 outline-none gap-2 flex-1 [color-scheme:dark]" 
                />
              </InputContainer>

              <Button type="submit" variant="primary" size="full">
                Salvar atividade
              </Button>
            </form>
          </div>
        </div>
  )
}