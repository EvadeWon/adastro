import { Suspense } from "react";
import ResetPassword from "@/components/ResetPasswordForm";

export default function Page() {
    return (
        <Suspense fallback={<div className="text-center mt-20">Loading...</div>}>
            <ResetPassword />
        </Suspense>
    );
}
