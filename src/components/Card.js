import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { jadwalRecoil } from '../state/JadwalState';

export default function Card() {
    const jadwal = useRecoilValue(jadwalRecoil)

    return <div>
        <div className="row">
            {jadwal.map((value) => (
            <div className="col-3 mb-2" key={value.id}>
                <Link to={`/jadwal/${value.hari}`} className='text-decoration-none'>
                <div className="card">
                    <div className="card-header text-center bg-primary text-white">{value.hari}</div>
                    <div className="card-body">
                        <ul className="list-group list-group-flush">
                            {value.jadwal.map((pelajaran) => (
                                <li className="list-group-item d-flex justify-content-between" key={pelajaran.id}>
                                    <span>{pelajaran.mata_pelajaran}</span>
                                        <span>{pelajaran.waktu_mulai}-{pelajaran.waktu_akhir}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                </Link>
            </div>
            ))}
        </div>
    </div>;
}
