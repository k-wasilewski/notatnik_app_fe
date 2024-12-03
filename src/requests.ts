import axios, { AxiosResponse } from "axios";
import { Note } from "./App";

export const getAllNotes: () => Promise<AxiosResponse<Note[]>> = () => {
    return axios.get('http://localhost:8080/v1/notes');
}