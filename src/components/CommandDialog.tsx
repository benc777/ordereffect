import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Command } from "cmdk";
import * as React from "react";
import { cn } from "../lib/utils";

const CommandDialog = ({ children, open, onOpenChange }: DialogPrimitive.DialogProps) => (
  <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-40 bg-black/60 backdrop-blur" />
      <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/90 shadow-2xl">
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  </DialogPrimitive.Root>
);

const CommandInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<typeof Command.Input>
>(({ className, ...props }, ref) => (
  <Command.Input
    ref={ref}
    className={cn(
      "h-12 w-full border-b border-slate-900 bg-transparent px-4 text-base text-slate-100 outline-none placeholder:text-slate-500",
      className
    )}
    {...props}
  />
));
CommandInput.displayName = Command.Input.displayName;

const CommandList = React.forwardRef<
  React.ElementRef<typeof Command.List>,
  React.ComponentPropsWithoutRef<typeof Command.List>
>(({ className, ...props }, ref) => (
  <Command.List
    ref={ref}
    className={cn("max-h-80 overflow-y-auto px-2 py-2 text-sm text-slate-100", className)}
    {...props}
  />
));
CommandList.displayName = Command.List.displayName;

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof Command.Empty>,
  React.ComponentPropsWithoutRef<typeof Command.Empty>
>(({ className, ...props }, ref) => (
  <Command.Empty ref={ref} className={cn("px-4 py-6 text-center text-slate-500", className)} {...props} />
));
CommandEmpty.displayName = Command.Empty.displayName;

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof Command.Group>,
  React.ComponentPropsWithoutRef<typeof Command.Group>
>(({ className, ...props }, ref) => (
  <Command.Group ref={ref} className={cn("mt-2 space-y-1 px-2", className)} {...props} />
));
CommandGroup.displayName = Command.Group.displayName;

const CommandItem = React.forwardRef<
  React.ElementRef<typeof Command.Item>,
  React.ComponentPropsWithoutRef<typeof Command.Item>
>(({ className, ...props }, ref) => (
  <Command.Item
    ref={ref}
    className={cn(
      "flex cursor-pointer select-none items-center justify-between rounded-2xl px-3 py-2 text-sm data-[selected=true]:bg-slate-800 data-[selected=true]:text-slate-100",
      className
    )}
    {...props}
  />
));
CommandItem.displayName = Command.Item.displayName;

export { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem };
