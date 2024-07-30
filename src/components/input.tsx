import { ComponentProps, ReactNode } from "react"
import { tv, VariantProps } from "tailwind-variants"

const inputVariants = tv({
  base: 'flex items-center gap-3 ',
  variants: {
    variant: {
      primary: 'h-16 bg-zinc-900 rounded-xl shadow-sm',
      secondary: 'h-14 px-5 bg-zinc-950 border border-zinc-800 rounded-lg gap-2'
    },

    textColor: {
      zinc: 'text-zinc-400'
    }
  },

  defaultVariants: {
    variant: 'primary',
    color: 'zinc'
  }
})

interface InputProps extends ComponentProps<'input'>, VariantProps<typeof inputVariants> {
  children: ReactNode
}

export function InputContainer({ children, variant, textColor, ...props }: InputProps){
  return (
    <div {...props} className={inputVariants({ variant, textColor })} >
      {children}
    </div>
  )
}