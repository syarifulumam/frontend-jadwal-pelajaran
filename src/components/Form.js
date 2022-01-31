import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { DataState, jadwalRecoil } from '../state/JadwalState';
axios.defaults.withCredentials = true;
export default function Form() {
    const getHari = useParams()
    const [data,setData] = useRecoilState(jadwalRecoil)
    const [dataState,setDataState] = useRecoilState(DataState)
    const [id,setId] = useState('')
    const [mata_pelajaran,setMataPelajaran] = useState('')
    const [waktu_mulai,setWaktuMulai] = useState('')
    const [waktu_akhir,setwaktuAkhir] = useState('')
    const [errors,setErrors] = useState([])
    const [onbutton,setButton] = useState(true)
    
    useEffect(() => {
        data.map(value => value.hari == getHari.hari && setDataState(value.jadwal))
    }, []);

    const submitHandler = async (e) => {
        e.preventDefault()
        let submitData = async () => {
            setButton(false)
            try {
                let data = {id,mata_pelajaran,waktu_mulai,waktu_akhir}
                let find = dataState.find(element => element.id === data.id)
                //jika undefined tambah data, jika tidak edit data
                if (find === undefined) {
                    let response =  await axios.post(`http://localhost:8000/api/jadwal/${getHari.hari}`,data)
                    data.id = response.data.data.id
                    setDataState([...dataState,data])
                }else{
                    let response = await axios.put(`http://localhost:8000/api/pelajaran/${data.id}`,data)
                    setData(response.data.data)
                }
                setButton(true)
                setMataPelajaran('')
                setWaktuMulai('')
                setwaktuAkhir('')
            } catch ({response}) {
                setButton(true)
                return setErrors(response.data.errors)
            }
        }
        submitData()
    }
    const deleteHandler = (id) => {
        axios.delete(`http://localhost:8000/api/pelajaran/${id}`)
        const filter = dataState.filter(item => item.id != id)
        setDataState(filter)
    }
    const editHandler = (e) => {
        setId(e.id)
        setMataPelajaran(e.mata_pelajaran)
        setWaktuMulai(e.waktu_mulai)
        setwaktuAkhir(e.waktu_akhir)
    }
    return <div className="container-fluid">
        <div className="row justify-content-center">
            <div className="col-5">
                <div className="card">
                    <div className="card-body">
                    <Link to={'/'} className="btn btn-primary">Kembali</Link>
                        <form onSubmit={submitHandler}>
                            <div className='mb-1'>
                                <div className="row">
                                    <div className="col">
                                        <label htmlFor="waktu-mulai" className="form-label">waktu mulai</label>
                                        <input type="time" value={waktu_mulai} onChange={(e) => setWaktuMulai(e.target.value)} className="form-control" id='waktu-mulai'/>
                                        <span className='text-danger'>{errors.waktu_akhir}</span>
                                    </div>
                                    <div className="col">
                                        <label htmlFor="waktu-mulai" className="form-label">waktu mulai</label>
                                        <input type="time" value={waktu_akhir} onChange={(e) => setwaktuAkhir(e.target.value)} className="form-control" name='waktu-akhir' id='waktu-mulai'/>
                                        <span className='text-danger'>{errors.waktu_mulai}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-1">
                                <input type="text" value={mata_pelajaran} onChange={(e) => setMataPelajaran(e.target.value)} className="form-control" name='mata-pelajaran' placeholder='Mata pelajaran . . .'/>
                                <span className='text-danger'>{errors.mata_pelajaran}</span>
                            </div>
                            <div className="d-grid gap-2">
                                <button type="submit" className="btn btn-primary btn-block" disabled={onbutton != true}>Submit</button>
                            </div>
                        </form>
                        <ul className="list-group list-group-flush mt-3">
                            {dataState.map((pelajaran,index) => (
                                <li className="list-group-item d-flex text-items-center" key={index}>
                                    <span className='flex-grow-1'>{pelajaran.mata_pelajaran}</span>
                                    <div className="btn btn-secondary btn-sm me-2" onClick={() => editHandler(pelajaran)} >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16"  fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                        </svg>
                                    </div>
                                    <div className="btn btn-danger btn-sm" onClick={() => deleteHandler(pelajaran.id)} >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16"  fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                        </svg>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}
