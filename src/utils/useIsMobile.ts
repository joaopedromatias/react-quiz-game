import { useEffect, useState } from "react"

export const useIsMobile = () => { 
    
    const [width, setWidth] = useState(window.screen.width)

    const setNewWidth = () => { 
        setWidth(window.screen.width);
    }

    useEffect(() => { 
        window.addEventListener('resize', setNewWidth)
        return window.removeEventListener('resize', setNewWidth)
    })

    const isMobile = width <= 600

    return isMobile
}