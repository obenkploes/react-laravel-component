import axios from 'axios'
import { forwardRef, useImperativeHandle, useState } from 'react'
import useSWR from 'swr'
import PropTypes from 'prop-types'
import { btn_primary, input } from './theme'




const ft = ur => axios.get(ur).then(res => res.data)
const Laratable=forwardRef(({ url, crud = false, column = [], onAdd, onEdit, onDelete },ref)=> {
    const [cari, setCari] = useState('')
    const [uri, setUri] = useState(url)
    const { data, mutate, isLoading, error } = useSWR(`${uri}`, ft)
    const [perPage, setPerPage] = useState(10)
    useImperativeHandle(ref,()=>({
        refresh :()=>mutate()
    }))
    const listPage = () => {
        let ls = []
        for (let i = 0; i <= 8; i++) {
            ls.push(10 + 5 * i)
        }
        return ls
    }

    // cari handler
    const searchHandler = (e) => {
        let uri = `${url}?perPage=${perPage}`
        let search = e.target.value
        if (search.length > 0) {
            uri += `&cari=${search}`
        }
        setUri(uri)
        setCari(search)
    }

    // change per page handler
    const changePerPageHandler = (e) => {
        setPerPage(e.target.value)
        let uri = url
        uri += `?&perPage=${e.target.value}`
        uri += cari.length > 0 ? `&cari=${cari}` : ''
        setUri(uri)
    }
    // handle change page
    const changePageHandler = (u) => {
        let uri = u
        uri += `&perPage=${perPage}`
        uri += cari.length > 0 ? `&cari=${cari}` : ''
        setUri(uri)
    }
    return (
        <>
            <div className="dt-header w-full flex items-center justify-between">
                <input type="text" name="cari" className={`${input}`} placeholder='Cari...' value={cari} onChange={searchHandler} />
                {crud && (
                    <button className={`${btn_primary} flex items-center gap-2`} onClick={() => onAdd()}>
                        <IconAdd />
                        <span className='hidden md:block'>
                            Tambah
                        </span>
                    </button>
                )}
            </div>
            <div className="dt-body mt-4 w-full overflow-auto">
                <table className='table-auto w-full text-sm '>
                    <thead>
                        <tr className='border *:px-3 *:py-1.5 *:text-start *:text-gray-500 bg-gray-100'>
                            {column.map((e, i) => (
                                <th key={i}>{e.text}</th>
                            ))}
                            {crud && (
                                <th className='w-10'>#</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {data && data?.data.map((e, i) => (
                            <tr key={i} className=' *:px-3 *:py-1.5 *:text-gray-500 *:text-start even:bg-gray-50 border'>
                                {column.map((item, i) => (
                                    <td key={i}>{e[item.data]}</td>
                                ))}
                                {crud && (
                                    <td>
                                        <div className="flex items-center gap-2 justify-center">
                                            <button className='text-green-700 hover:text-gray-950' onClick={() => onEdit(e)}><IconEdit /></button>
                                            <button className='text-red-500 hover:text-red-700' onClick={() => onDelete(e)}><IconDelete /></button>
                                        </div>
                                    </td>
                                )}
                            </tr>

                        ))}
                    </tbody>
                </table>
            </div>
            {isLoading && (
                <div className="loading w-full ">
                    <span className="flex items-center gap-2 justify-center text-gray-500 py-5">
                        <IconLoad /> Memuat...
                    </span>
                </div>
            )}
            {error && (
                <div className="loading w-full ">
                    <span className="flex items-center gap-2 justify-center text-gray-500 py-5">
                        <IconError /> Gagal memuat data.
                    </span>
                </div>
            )}
            <div className="dt-footer w-full flex justify-between items-center mt-4  gap-2">
                <div className="dt-page flex items-center gap-2 text-gray-500">
                    Menampilkan
                    <select className={`${input}`} value={perPage} onChange={changePerPageHandler}>
                        {listPage().map((e, i) => (
                            <option value={e} key={i}>{e}</option>
                        ))}
                    </select>
                    item
                </div>
                <div className="dt-pagination flex items-center justify-end">
                    {data?.links.length > 3 && data?.links.map((e, i) => (
                        <button className={`px-2 py-1 text-sm border  ${e.label == data.current_page ? 'bg-indigo-500 text-white' : !e.url ? 'bg-gray-200 text-gray-500' : 'text-gray-500 hover:border-indigo-500 hover:text-indigo-500'} ${i > 0 && i < data?.links.length - 1 ? 'hidden md:block' : ''} `} key={i} disabled={!e.url || e.label == data.current_page} onClick={() => changePageHandler(e.url)}>
                            {i == 0 ? `<<` : i == data?.links.length - 1 ? `>>` : e.label}
                        </button>
                    ))}
                </div>
            </div>
        </>
    )
})

const IconAdd = () => {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ fill: 'currentcolor' }} className='size-5'><path d="M5 21h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2zm2-10h4V7h2v4h4v2h-4v4h-2v-4H7v-2z"></path></svg>
        </>
    )
}

const IconDelete = () => {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ fill: 'currentcolor' }} className='size-4'><path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm4 12H8v-9h2v9zm6 0h-2v-9h2v9zm.618-15L15 2H9L7.382 4H3v2h18V4z"></path></svg>
        </>
    )
}

const IconEdit = () => {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ fill: 'currentcolor' }} className='size-4'><path d="m16 2.012 3 3L16.713 7.3l-3-3zM4 14v3h3l8.299-8.287-3-3zm0 6h16v2H4z"></path></svg>
        </>
    )
}

const IconLoad = () => {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='size-5 animate-spin fill-current '><path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" /></svg>
        </>
    )
}
const IconError = () => {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='size-5 fill-current'><path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" /></svg>
        </>
    )
}

Laratable.propTypes = {
    url: PropTypes.string,
    crud: PropTypes.bool,
    column: PropTypes.array,
    onAdd: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
}
export default Laratable