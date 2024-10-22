import $api from "../http";
import { Bid } from "../models/response/Bid.interface";

export default class BidsServise {
    static fetchBids() {
        return $api.get<Bid[]>(`${import.meta.env.VITE_REACT_APP_API_URL}/bids`)
    }
}