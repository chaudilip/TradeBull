import { GalleryVerticalEnd } from "lucide-react"

import { LoginForm } from "./components/login-form"
import Image from "next/image"
import TradeBullLogo from "../../../images/logo/bullfight.svg"
import Link from "next/link"

export default function LoginPage() {
    return (
        <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10 ">
            <Link href="/" className="flex items-center gap-1 font-medium">
                <div className="">
                    <Image src={TradeBullLogo} alt={"TradeBullLogo"} className="brightness" width={30} height={30} />
                </div>
                <span className="font-bold text-zinc-700 dark:text-zinc-200">
                    TradeBull
                </span>
            </Link>
            <div className="w-full flex items-center justify-center">
                <LoginForm />
            </div>
        </div >
    )
}
