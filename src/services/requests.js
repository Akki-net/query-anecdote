import axios from "axios";
const baseURL = 'http://localhost:3001/anecdotes'

export const getAll = async () => {
    const res = await axios.get(baseURL)
    return res.data
}

export const createNew = async obj => {
    const res = await axios.post(baseURL, obj)
    return res.data
}

export const castVote = async obj => {
    const res = await axios.put(`${baseURL}/${obj.id}`, obj)
    return res.data
}