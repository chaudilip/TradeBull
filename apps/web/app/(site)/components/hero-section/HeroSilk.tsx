"use client";

import { Navbar02, Silk } from "@repo/ui";

import { useEffect, useState } from "react";
import TradeBullLogo from "../../../../images/logo/bullfight.svg"
import Image from "next/image";
import { useRouter } from "next/navigation"

export function HeroSilk() {
    const [isScrolled, setIsScrolled] = useState(false);
    const router = useRouter()

    const handleLoginButtonClickEvent = (): void => {
        router.push("/login")
    }

    const handleRegisterButtonClickEvent = (): void => {
        router.push("/register")
    }


    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
            style={{
                position: "relative",
                height: "100vh",
                overflow: "hidden",
                backgroundColor: "#0B0E14",
            }}
        >
            {/* Enhanced navbar with better transparency control */}
            <div style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 50,
                transition: "all 0.3s ease",
                ...(isScrolled ? {
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    backdropFilter: "blur(12px)",
                    borderBottom: "2px solid rgba(255, 255, 255, 0.15)"
                } : {
                    backgroundColor: "transparent",
                    backdropFilter: "none",
                    borderBottom: "1px solid transparent"
                })
            }}>
                <Navbar02
                    logo={
                        <Image src={TradeBullLogo} alt={"TradeBullLogo"} className="brightness invert" width={30} height={30} />
                    }
                    scrolled={isScrolled}
                    onLoginClick={handleLoginButtonClickEvent}
                    onCtaClick={handleRegisterButtonClickEvent}

                />
            </div>

            <Silk
                color="#1A73E8"
                speed={2}
                scale={1}
                noiseIntensity={1.2}
                rotation={0}
            />

            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    flexDirection: "column",
                    gap: "12px",
                    paddingTop: "80px",
                }}
            >
                <h1 style={{ fontSize: "52px", fontWeight: 700 }}>
                    Trade Bull
                </h1>
                <p style={{ fontSize: "20px", opacity: 0.7 }}>
                    fast execution · modern trading · enterprise grade
                </p>
            </div>
        </div>
    );
}