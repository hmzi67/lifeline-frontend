import { CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface PaymentSuccessModalProps {
  open: boolean;
  onClose: () => void;
  planTitle?: string;
}

export default function PaymentSuccessModal({
  open,
  onClose,
  planTitle,
}: PaymentSuccessModalProps) {
  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogContent className="sm:max-w-md rounded-3xl border-0 p-8 text-center shadow-2xl">
        <DialogHeader className="items-center text-center">
          <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
            <CheckCircle2 className="h-9 w-9 text-primary-500" strokeWidth={2} />
          </div>
          <DialogTitle className="text-2xl font-extrabold text-gray-900">
            Payment Successful!
          </DialogTitle>
          <DialogDescription className="text-base text-gray-600">
            {planTitle
              ? `Your ${planTitle} subscription is now active. Welcome to LifeLine!`
              : "Your subscription is now active. Welcome to LifeLine!"}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4 sm:justify-center">
          <Button
            onClick={onClose}
            className="w-full bg-primary hover:bg-primary-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-md"
          >
            Continue to LifeLine
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
