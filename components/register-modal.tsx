"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { X, Gift } from "lucide-react";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+998");
  const router = useRouter();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && phone.trim()) {
      fetch("http://localhost:3000/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phone }),
      })
        .then((response) => {
          if (!response.ok) throw new Error("Server error");
          return response.json();
        })
        .catch((error) => console.error("Xatolik:", error));

      router.push("/success");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
      <Card className="relative bg-white w-full max-w-2xl p-12 rounded-xl shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-500 hover:text-gray-700"
        >
          <X className="w-7 h-7" />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight tracking-tight">
            BEPUL ONLAYN DARSGA RO‘YXATDAN O‘TING
          </h2>
          <p className="text-gray-700 mt-3 text-lg">
            Ma'lumotlaringizni to‘ldiring va <strong>bonus</strong>ga ega
            bo‘ling!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            type="text"
            placeholder="Ismingiz"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-16 text-3xl p-5 border border-gray-300 rounded-lg"
            required
          />
          <Input
            type="tel"
            placeholder="+998"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full h-16 text-3xl p-5 border border-gray-300 rounded-lg"
            required
          />

          <Button
            type="submit"
            className="main-button w-full text-xl font-bold py-5 px-6 rounded-full bg-blue-800 hover:bg-blue-900 text-white transition-all flex items-center justify-center gap-3"
          >
            {/* <Gift className="w-44 h-44" /> */}
            KANALGA QO‘SHILISH
          </Button>
        </form>
      </Card>
    </div>
  );
}
