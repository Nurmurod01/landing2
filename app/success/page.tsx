"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowDown, Gift } from "lucide-react";
import { Ai } from "@/image";

export default function SuccessPage() {
  const handleSubscribe = () => {
    window.open("https://t.me/your_channel", "_blank");
  };

  return (
    <div className="min-h-screen h-screen w-full bg-gradient-to-br from-gray-100 to-gray-200 max-md:flex max-md:flex-col max-md:items-center max-md:justify-between p-6 overflow-hidden">
      {/* Yuqori kontent */}
      <div className="w-full md:mt-60 md:ms-40  max-md:max-w-md  space-y-8 mt-6">
        <div className="text-start max-md:text-center space-y-5">
          <h1 className="text-4xl md:text-4xl font-bold text-gray-900">
            <span className="text-red-500">TO&apos;XTANG!</span> OXIRGI QADAM
            QOLDI!
          </h1>
          <p className="text-lg md:text-xl text-gray-700">
            Telegram kanalimizga qo&apos;shilib, birinchi vazifangizni oling va
            boshqa ishtirokchilar bilan tanishing!
          </p>
        </div>

        <div className="flex justify-center md:max-w-2xl ">
          <ArrowDown className="w-10 h-10 text-gray-500 animate-bounce" />
        </div>

        <Button
          onClick={handleSubscribe}
          className="w-full md:max-w-2xl bg-blue-800 main-button hover:bg-blue-900 text-white font-bold py-6 px-8 rounded-full text-2xl transition-all duration-300 transform"
        >
          OBUNA BO&apos;LISH
        </Button>

        <Card className="bg-blue-50 border-blue-200 p-4 md:max-w-2xl">
          <div className="flex items-center gap-3">
            <Gift className="w-8 h-8 text-blue-600 flex-shrink-0" />
            <p className="text-base md:text-lg text-gray-700 font-medium">
              Kurs davomida sovg&apos;alar va bonuslar kutmoqda!
            </p>
          </div>
        </Card>
      </div>
      {/* Desktop: Image on the right */}
      <div className="hidden h-screen md:block md:absolute md:top-0 md:end-0 ">
        <Image
          src={Ai}
          alt="Instagram Course Instructor"
          width={900}
          // height={1000}
          className="rounded-xl h-full"
          // priority
        />
      </div>
      {/* Pastki rasm */}
      <div className="md:hidden relative mt-10">
        <Image
          src={Ai}
          alt="Instagram Course Instructor"
          width={500}
          height={600}
          className="rounded-xl object-contain max-h-[600px]"
          priority
        />
      </div>
    </div>
  );
}
