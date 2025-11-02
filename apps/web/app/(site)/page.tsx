import HomHeader from "@/components/header/home-header"
import * as React from "react"
import { HeroSilk } from "./components/hero-section/HeroSilk"
import { Silk } from "@repo/ui/index"

export default function HomePage() {
  return (
    <div className="font-satoshi min-h-screen w-full relative">
      <div className="">
        <HeroSilk />
      </div>
      <div className="h-screen">
        <Silk />
      </div>
    </div>
  )
}
