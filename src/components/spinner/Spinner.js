import React from 'react'
import './Spinner.css';

export const Spinner = ({ value, setValue, min, max, name }) => {


    const handleAdd = () => setValue(value < max ? value + 1 : max)
    const handleMin = () => setValue(value > min ? value - 1 : min)

    return (
        <div name={name} className={"spinner " + (value > 3 ? 'high' : 'low')}>
            
            <div onClick={handleMin}>-</div>
                <span id="number">{value}</span>
            <div onClick={handleAdd}>+</div>
            
        </div>
    )
}
