"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import RegisterModal from "@/components/register-modal";
import { Ai, Check } from "@/image/index";
export default function HomePage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="relative m-0 p-0 min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 ">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center max-w-lg max-md:mx-auto mb-8 px-2 py-1 md:px-6 md:py-4 rounded-2xl shadow-xl shadow-sky-200">
          <p className="text-gray-800 text-2xl mb-4 font-semibold">
            Bepul chellenj
          </p>
        </div>

        {/* Main Content - Responsive Layout */}
        <div className="flex flex-col items-center mb-5 md:mt-32">
          {/* Title - Always at top */}
          <div className="w-full text-center sm:text-left mb-6">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-gray-900 leading-tight">
              10 KUNDA SUN&apos;IY INTELLEKT YORDAMIDA
            </h1>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-blue-800 leading-tight">
              SHAXSIY BRENDINGIZNI NOLDAN QURING
            </h2>
          </div>

          {/* Mobile: Image first, then content */}
          <div className="block md:hidden w-full ">
            <div className="flex justify-center">
              <Image
                src={Ai}
                alt="Instagram Course Instructor"
                width={300}
                height={400}
                className="rounded-xl "
                priority
              />
            </div>
          </div>
          <div className=" md:hidden mb-5">
            <Button
              onClick={() => setShowModal(true)}
              className="w-full main-button bg-blue-800 hover:bg-blue-900 text-white font-bold py-6 px-10 rounded-full text-2xl transition-all duration-300 transform"
            >
              RO&apos;YXATDAN O'TISH
            </Button>
          </div>
          {/* Content Section */}
          <div className="w-full ">
            <div className="space-y-4 md:my-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                BEPUL darsda:
              </h3>

              <div className="space-y-3 font-normal tracking-normal text-2xl">
                <div className="flex items-center  gap-3">
                  <div className=" rounded-full p-1 mt-1 max-md:max-h-12 max-md:max-w-12 flex-shrink-0">
                    <Image src={Check} alt="check" height={60} width={60} />
                  </div>
                  <p className="text-gray-800">
                    Kontent strategiyasi va rejalashtirish
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className=" rounded-full p-1 mt-1 max-md:max-h-12 max-md:max-w-12 flex-shrink-0">
                    <Image src={Check} alt="check" height={60} width={60} />
                  </div>
                  <p className="text-gray-800">
                    Ijtimoiy tarmoqlarda brendni rivojlantirish
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className=" rounded-full p-1 mt-1 max-md:max-h-12 max-md:max-w-12 flex-shrink-0">
                    <Image src={Check} alt="check" height={60} width={60} />
                  </div>
                  <p className="text-gray-800">
                    Brendni monetizatsiya qilish yo'llari
                  </p>
                </div>
              </div>
            </div>

            {/* Button - Always below content */}
            <div className="flex justify-center md:justify-start max-md:hidden">
              <Button
                onClick={() => setShowModal(true)}
                className="main-button w-3xl bg-blue-800 hover:bg-blue-900 text-white font-bold py-6 px-8 md:px-12 tracking-tight md:py-10 rounded-full text-lg md:text-3xl transition-all duration-300 transform"
              >
                RO&apos;YXATDAN O'TISH
              </Button>
            </div>

            {/* Gift Card */}
            {/* <Card className="bg-orange-50  border-orange-200 p-4 mt-6 max-w-2xl">
              <div className="flex items-center gap-3">
                <Gift className="w-10 h-10 text-orange-600 flex-shrink-0" />
                <div>
                  <p className="text-lg text-gray-800 font-medium">
                    Ro'yxatdan o'tganlar uchun maxsus sovg'a:
                  </p>
                  <p className="text-lg text-blue-800 font-semibold">
                    Instagram sahifani to'g'ri qadoqlash darsi
                  </p>
                </div>
              </div>
            </Card> */}
          </div>
        </div>
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

      <RegisterModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
