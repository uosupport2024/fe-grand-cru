import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border border-neutral-border bg-neutral-bg/25 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md hover:translate-y-[-2px] flex flex-col",
        className
      )}
      {...props}
    />
  )
)
Card.displayName = "Card"

const CardImage = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { src: string; alt?: string; aspect?: 'portrait' | 'video' }
>(({ className, src, alt = "", aspect = "video", children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative overflow-hidden w-full bg-neutral-surface/40",
      {
        "aspect-[4/5]": aspect === "portrait",
        "aspect-[16/10]": aspect === "video",
      },
      className
    )}
    {...props}
  >
    <img
      src={src}
      alt={alt}
      className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
    />
    {children}
  </div>
))
CardImage.displayName = "CardImage"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-4 flex-1 flex flex-col justify-between", className)} {...props} />
  )
)
CardContent.displayName = "CardContent"

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("font-serif text-lg leading-tight text-neutral-text-prim mb-1", className)}
      {...props}
    />
  )
)
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-xs text-neutral-text-sec font-sans leading-relaxed", className)}
      {...props}
    />
  )
)
CardDescription.displayName = "CardDescription"

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center justify-between mt-4 pt-3 border-t border-neutral-border/50", className)}
      {...props}
    />
  )
)
CardFooter.displayName = "CardFooter"

export { Card, CardImage, CardContent, CardTitle, CardDescription, CardFooter }
