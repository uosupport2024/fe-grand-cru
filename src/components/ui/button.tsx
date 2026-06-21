import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'primaryDark' | 'secondary' | 'secondaryLight' | 'secondaryDark' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] cursor-pointer",
          // Variant mappings
          {
            "bg-brand-primary text-neutral-bg hover:bg-brand-primary-dark shadow-sm": variant === "primary",
            "bg-brand-primary-dark text-neutral-bg hover:opacity-90 shadow-sm": variant === "primaryDark",
            "bg-brand-secondary text-neutral-text-prim hover:bg-brand-secondary-dark hover:text-neutral-bg shadow-sm": variant === "secondary",
            "bg-brand-secondary-light text-neutral-text-prim hover:opacity-90": variant === "secondaryLight",
            "bg-brand-secondary-dark text-neutral-bg hover:opacity-90": variant === "secondaryDark",
            "border border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-neutral-bg": variant === "outline",
            "text-neutral-text-sec hover:bg-brand-secondary-light hover:text-neutral-text-prim": variant === "ghost",
          },
          // Size mappings
          {
            "px-3 py-1.5 text-xs": size === "sm",
            "px-6 py-2.5 text-sm": size === "md",
            "px-8 py-3.5 text-base": size === "lg",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
