import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'outline' | 'solid' | 'primary' | 'secondary' | 'success' | 'warning' | 'error'
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "outline", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full px-4 py-1 text-xs font-normal transition-colors select-none border",
          {
            "border-neutral-border text-neutral-text-sec bg-neutral-bg/30": variant === "outline",
            "bg-brand-primary text-neutral-bg border-transparent": variant === "primary",
            "bg-brand-secondary text-neutral-text-prim border-transparent": variant === "secondary",
            "bg-brand-primary-dark text-neutral-bg border-transparent": variant === "solid",
            "bg-status-success/10 text-status-success border-status-success/30": variant === "success",
            "bg-status-warning/10 text-status-warning border-status-warning/30": variant === "warning",
            "bg-status-error/10 text-status-error border-status-error/30": variant === "error",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Badge.displayName = "Badge"

export { Badge }
