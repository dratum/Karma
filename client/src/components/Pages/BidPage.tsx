import { useParams } from "react-router";
import { useEffect, useState } from "react";
import $api from "../../http";
import { BidType } from "../../../features/bidsSlice";
import MapBid from "../MapBid/MapBid.tsx";

export default function BidPage () {
    const { id } = useParams()
    // const user = localStorage.getItem('user')
    // const userObject = JSON.parse(user as string)
    // const userObjectId = String(userObject.id)

    const [bid, setBid] = useState<BidType>({} as BidType)
    const [authorName, setAuthorName] = useState<string>('')
    const [authorId, setAuthorId] = useState<number | null>(null)

    useEffect(() => {
        async function fetchData() {
          const response = await $api(`${import.meta.env.VITE_REACT_APP_API_URL}/bid/${id}`)
          setAuthorName(response.data.author.fio);
          setAuthorId(response.data.author.id)
          setBid(response.data.bid)

        }
        fetchData();

      }, []);


      

    return ( 

        <MapBid bid={bid} userId={String(authorId)} name={authorName}/>

     );
}