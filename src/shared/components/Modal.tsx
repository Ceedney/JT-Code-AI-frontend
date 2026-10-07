import { forwardRef, type HTMLAttributes } from 'react';
import { clsx } from 'clsx';
import { X } from 'lucide-react';

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  hideCloseButton?: boolean;
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ className, isOpen, onClose, title, description, size = 'md', hideCloseButton, children, ...props }, ref) => {
    if (!isOpen) return null;

    const sizes = {
      sm: 'max-w-sm',
      md: 'max-w-lg',
      lg: 'max-w-2xl',
      xl: 'max-w-4xl',
      full: 'max-w-[90vw]',
    };

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm backdrop-in"
            onClick={onClose}
            aria-hidden="true"
          />
          <div
            ref={ref}
            className={clsx(
              'relative w-full rounded-xl bg-background p-6',
              'shadow-2xl ring-1 ring-black/5 dark:ring-white/10',
              'modal-enter',
              sizes[size],
              className
            )}
            aria-labelledby={title ? 'modal-title' : undefined}
            aria-describedby={description ? 'modal-description' : undefined}
            {...props}
          >
            {!hideCloseButton && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="absolute right-4 top-4 rounded-md p-1 text-muted-foreground opacity-70 transition-all hover:opacity-100 hover:bg-muted hover:scale-105 active:scale-95"
              >
                <X size={18} />
              </button>
            )}
            {(title || description) && (
              <div className="mb-4 pr-8">
                {title && (
                  <h2 id="modal-title" className="text-lg font-semibold">
                    {title}
                  </h2>
                )}
                {description && (
                  <p id="modal-description" className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    {description}
                  </p>
                )}
              </div>
            )}
            {children}
          </div>
        </div>
      </div>
    );
  }
);
Modal.displayName = 'Modal';