import React, { useState } from 'react'

export const BlankPage = (props) => {

    const [counter, setCount] = useState(0)


    function somar() {
        setCount(counter + 1)
    }

    function decrementar() {
        if (counter > 0)
            setCount(counter - 1)
    }

    return (
        <div>
            Contador - {counter} <br/>
            <button onClick={() => somar()}>+ 1</button>
            <button onClick={() => decrementar()}>- 1</button>
        </div>
    )

}
