import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import Link from "next/link";

const navbuttonVariants = cva("text-md text-foreground hover:text-primary", {
  variants: {
    isActive: {
      true: "",
    },
  },
  defaultVariants: {
    isActive: true,
  },
});

export interface NavButtonProps extends VariantProps<typeof navbuttonVariants> {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function NavButton({
  href,
  isActive,
  children,
  className,
  ...props
}: NavButtonProps) {
  return (
    <Link
      href={href}
      className={cn(navbuttonVariants({ isActive, className }))}
      {...props}
    >
      {children}
    </Link>
  );
}
