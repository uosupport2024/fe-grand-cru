import * as React from "react"
import { cn } from "@/lib/utils"

export interface SwitchProps extends Omit<React.HTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, checked = false, onChange, disabled = false, ...props }, ref) => {
    const handleToggle = () => {
      if (!disabled && onChange) {
        onChange(!checked)
      }
    }

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={handleToggle}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary disabled:cursor-not-allowed disabled:opacity-50",
          checked ? "bg-brand-primary" : "bg-neutral-border/60",
          className
        )}
        {...props}
      >
        <span
          className={cn(
            "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-sm ring-0 transition-transform duration-200 ease-in-out",
            checked ? "translate-x-5" : "translate-x-0"
          )}
        />
      </button>
    )
  }
)
Switch.displayName = "Switch"

export { Switch }
