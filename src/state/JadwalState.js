import axios from "axios"
import { atom, selector } from "recoil"

const urlApi = atom({
    key: 'urlApi',
    default: ''
})

const jadwalRecoil = selector({
    key: 'jadwalPelajaran',
    get: async ({get}) => {
        const {data} = await axios.get(`http://localhost:8000/api/jadwal/` + get(urlApi))
        return data.data
    },
    set: ({set,get},newValue) => {
        let data = get(DataState)
        let filter = data.filter(item => item.id != newValue.id)
        set(DataState,[...filter,newValue])
    }
})

const DataState = atom({
    key: 'getDataState',
    default: []
})

export {jadwalRecoil,urlApi,DataState}