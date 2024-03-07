import { useRef } from "react";
import Laratable from "./component/Laratable";

export default function App(){
  const column =[
    {text:'Nama produk',data:'namaProduk'},
    {text:'Merk',data:'merk'},
    {text:'Warna',data:'warna'},
    {text:'Qty',data:'qty'},
  ]

  const coba = useRef(null)

  const addHandler=()=>{
    console.log('Hello');
  }
  const editHandler=(item,mutate)=>{
    console.log(item);
    mutate()

  }
  return(
    <>
      <div className="container mx-auto">
        <div className="px-3 py-2 mt-4 ">
          <h4 className="font-medium text-xl text-gray-600">Data produk</h4>
          <Laratable crud url={`http://127.0.0.1:8000/api/produk/`} column={column} onAdd={addHandler} onEdit={editHandler} onDelete={editHandler} />
        </div>
      </div>
    </>
  )
}