import { forwardRef, useImperativeHandle } from "react"

const Coba = forwardRef((props,ref)=>{
    useImperativeHandle(ref,()=>({
        coba_saja :()=>{alert('coba aku')}
    }))
    return (
        <>
            <h1>Aku</h1>
        </>
    )
})

export default Coba