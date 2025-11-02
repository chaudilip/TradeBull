'use client';
import { Navbar02 } from "@repo/ui";
import TradeBullIcon from "../../images/logo/bullfight.png";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function HomHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Add scroll effect when scrolled past 50px
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-background/80 backdrop-blur-md border-b border-gray-200/20' 
        : 'bg-transparent'
    }`}>
      <Navbar02 
        className={isScrolled ? '' : 'border-none'} 
        logo={
          <Image
            src={TradeBullIcon}
            width={30}
            height={30}
            alt="TradeBullLogo"
          />
        }
      />
    </div>
  );
}