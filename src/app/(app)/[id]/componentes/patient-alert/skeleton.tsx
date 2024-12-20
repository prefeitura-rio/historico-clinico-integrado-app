import {
  AlertDialogDescription,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Skeleton } from '@/components/ui/skeleton'

export function PatientAlertSkeleton() {
  return (
    <>
      <AlertDialogTitle className="sr-only">Dados sigilosos!</AlertDialogTitle>
      <AlertDialogDescription className="sr-only">
        Carregando...
      </AlertDialogDescription>
      <Skeleton className="h-7 w-36" />
      <Skeleton className="h-3.5 w-full" />
      <Skeleton className="h-3.5 w-full" />
      <Skeleton className="h-3.5 w-full" />
      <Skeleton className="h-3.5 w-full" />
      <Skeleton className="h-3.5 w-[80%]" />
    </>
  )
}
