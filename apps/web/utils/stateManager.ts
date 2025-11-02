import React from "react";


export const toggle = (fn:React.Dispatch<React.SetStateAction<boolean>>) => {
    fn(prev => !prev)
}