"use client";
// import { LoginDialog } from "@/components/Common/login-dialog"
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export function useLoginDialog() {
  const [open, setOpen] = useState(false);

  const searchParams = useSearchParams();
  const hasShownToast = useRef(false);

  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam && !hasShownToast.current) {
      hasShownToast.current = true;

      setTimeout(() => {
        const error = decodeURIComponent(errorParam);
        toast.error(error, {
          position: "top-center",
          duration: 3000,
          dismissible: true,
          id: "error-toast",
        });
      }, 100);
    }
  }, [searchParams]);

  const LoginDialogWithState = () => <>{/* <LoginDialog open={open} setOpen={setOpen} initalStep={0} /> */}</>;

  return { openDialog: () => setOpen(true), LoginDialogWithState };
}
