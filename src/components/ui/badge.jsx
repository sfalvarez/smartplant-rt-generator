import * as React from 'react';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
    'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-sky-500 focus:ring-offset-2',
    {
        variants: {
            variant: {
                default: 'border-transparent bg-sky-600 text-white hover:bg-sky-700',
                secondary: 'border-transparent bg-slate-700 text-slate-100 hover:bg-slate-600',
                destructive: 'border-transparent bg-red-600 text-white hover:bg-red-700',
                outline: 'border-slate-600 text-slate-200',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

function Badge({ className, variant, ...props }) {
    return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
