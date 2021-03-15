import React from 'react'

export const Popup = () => {
    
    const [show, setShow] = useState(false)

    return show && (
        <div className="popup">
            Necesitas algo?
        </div>
    )
  
}
