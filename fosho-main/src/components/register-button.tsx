"use client";

import { useParams, useRouter } from "next/navigation";
import React from "react";

function RegisterButton() {
  const router = useRouter();
  const { eventId } = useParams();
  return (
    <button
      onClick={() => router.push(`${eventId}/register`)}
      type="button"
      className="bg-blue-800 hover:bg-blue-950 rounded-md shadow-sm text-sm my-2 text-white p-2 w-full"
    >
      Register
    </button>
  );
}

export default RegisterButton;
