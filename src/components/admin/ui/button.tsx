import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(" inline-flex items-center uppercase justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
  variants: {
    variant: {
      default: "bg-aprimary text-white hover:bg-aprimary/80",
      info: "bg-ainfo text-white hover:bg-ainfo/80",
      success: "bg-asuccess text-white hover:bg-success/30",
      danger: "bg-adanger text-white hover:bg-adanger/80",
      secondary: "bg-white text-neutral-900 hover:bg-white/80 border border-[#dcdcddc]",
      warning: "bg-awarning text-white hover:bg-awarning/80",
    },
    size: {
      default: "h-12 px-4 py-2",
      sm: "h-8 rounded-sm px-3",
      lg: "h-14 rounded-sm px-8",
      xl: "lg:h-16 h-11 rounded-sm px-8",
      icon: "h-10 w-10",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = "Button";

export { Button, buttonVariants };
