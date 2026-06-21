import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
  rightElement?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", icon, rightElement, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full">
        {icon && (
          <div className="absolute left-4 text-neutral-text-sec pointer-events-none flex items-center justify-center">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "w-full rounded-full border border-neutral-border bg-neutral-bg/40 py-2.5 text-sm transition-all focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary placeholder:text-neutral-text-sec/60 text-neutral-text-prim",
            icon ? "pl-11" : "pl-5",
            rightElement ? "pr-14" : "pr-5",
            className
          )}
          ref={ref}
          {...props}
        />
        {rightElement && (
          <div className="absolute right-4 text-neutral-text-sec flex items-center justify-center">
            {rightElement}
          </div>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
