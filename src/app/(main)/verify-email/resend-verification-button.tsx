"use client";

import { LoadingButton } from "@/components/ui/button";
import { useState } from "react";

interface ResendVerificationButtonProps {
  email: string;
}

export function ResendVerificationButton({ email }: ResendVerificationButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function resendVerificationEmail() {
    // TODO: Resend verification email
  }

  return (
    <div className="space-y-4">
      {success && (
        <div role="status" className="text-sm text-green-600">
          {success}
        </div>
      )}
      {error && (
        <div role="alert" className="text-sm text-red-600">
          {error}
        </div>
      )}

      <LoadingButton onClick={resendVerificationEmail} className="w-full" loading={isLoading}>
        Resend verification email
      </LoadingButton>
    </div>
  );
}
