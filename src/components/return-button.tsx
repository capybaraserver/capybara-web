import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

interface ReturnButtonProp {
  href: string;
  label: string;
  className?: string;
}

export function ReturnButton({ href, label, className }: ReturnButtonProp) {
  return (
    <Button size="sm" asChild className={className}>
      <Link href={href}>
        <ArrowLeftIcon /> {label}
      </Link>
    </Button>
  )
}
