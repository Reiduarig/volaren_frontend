
import './Switch.css'

function Switch({value, setValue}) {
   
    
    
    return (
        <div
           
            className={"switch " + (value ? 'true' : 'false')}
            onClick={() => setValue(!value)}
        />
    )
}

export default Switch;
