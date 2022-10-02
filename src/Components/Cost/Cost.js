import { isDisabled } from "@testing-library/user-event/dist/utils";
import { useState, useEffect } from "react";

import "./Cost.css"

export default function Cost(props) {
    const [price, setPrice] = useState(props.rangeMin);
    const [typingCheck, setTypingCheck] = useState(false)
    function handelPrice(event) {
        setPrice(event.target.value)
    }
    function checkPrice() {
        if (props.name === "price") {
            if (+price < 1000000) {
                setPrice(1000000)
            } else if (+price > 6000000) {
                setPrice(6000000)
            } 
        } else if (props.name === "month") {
            if (+price < 1) {
                setPrice(1)
            } else if (+price > 60) {
                setPrice(60)
            } 
        }
    }    
    useEffect(() => {
        if (props.name === "price") {
            props.Price(price)
        }
        else if (props.name === "initial") {
            props.Initial(price)
        }
        else if (props.name === "month") {
            props.Month(price)
        }
    }, [price])

    function iddenpt(name) {
        switch(name) {
            case "price": 
               return (
                <>
                {
                    props.inptBLock 
                    ? 
                    <input type="number"
                            className="text-input" 
                            disabled
                            value={price} 
                            onChange={handelPrice}
                            onFocus={() => setTypingCheck(true)} 
                            onBlur={() => setTypingCheck(false)}/>
                    :
                    <input type="number"
                            className="text-input" 
                            value={price} 
                            onChange={handelPrice}
                            onFocus={() => setTypingCheck(true)} 
                            onBlur={() => setTypingCheck(false)}/>
                }
                    <span className="text-input">₽</span>
                </>
               )
            case "initial":
                return (
                    <>
                        <h6 className="text-input">{Math.floor((((+props.state.price) * (+price)) / 100)) + " ₽"}</h6>
                        <span className="pers flex-center">{price + "%"}</span>    
                    </>
                )
            case "month":
                return (
                    <>
                        <h6 className="text-input">{price}</h6>
                        <span className="text-input">мес.</span>
                    </>
                )
            default:    
        }
    }
    return (
        <div className='calc__inpt' onBlur={checkPrice}>
            <label className="text-label">{props.label}</label>
            <div className="flex-center" style={{opacity: props.inptBLock ? 0.5 : 1, border: '2px solid', background: typingCheck ? 'transparent' : '', borderColor: typingCheck ? '#F3F3F4' : 'transparent'}}>
                {iddenpt(props.name)}
            </div>
            {
                props.inptBLock 
                ?
                <input type="range" 
                    disabled
                    className='range' 
                    min={props.rangeMin} 
                    max={props.rangeMax} 
                    onChange={handelPrice} 
                    value={price ? price : 1000000} 
                    style={{backgroundSize: ((+price >= +props.rangeMin) ? (+price - props.rangeMin) * 100 / (props.rangeMax - props.rangeMin) : 0) + '% 100%'}}/>
                :    
                <input type="range" 
                    className='range' 
                    min={props.rangeMin} 
                    max={props.rangeMax} 
                    onChange={handelPrice} 
                    value={price ? price : 1000000} 
                    style={{backgroundSize: ((+price >= +props.rangeMin) ? (+price - props.rangeMin) * 100 / (props.rangeMax - props.rangeMin) : 0) + '% 100%'}}/>
            }
        </div>
    )
}