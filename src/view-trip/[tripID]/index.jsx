import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import DataSection from './components/dataSection';
import Hotel from './components/hotel';
import Itinerary from './components/itinerary';


export default function Viewtrip() {
    const {tripID} = useParams();
    const [trip, setTrip] = useState(null);

    useEffect(()=>{
        tripID && GetTripData()
    },[tripID])
    
    const GetTripData=async()=>{
        const docRef=doc(db,'Trips', tripID);
        const docSnap=await getDoc(docRef);

        if(docSnap.exists()){
            
            console.log("Documents:", docSnap.data());
            setTrip(docSnap.data());
        }else{
            console.log("No Such Document");
            toast('No trip found');
        }
    }
  return (

    
    <div className='p-10 md:px-20 lg-44 xl:px-56'>
        {/*Information Section*/}
        <DataSection trip ={trip}/>


        {/*Recommended Hotels*/}
        <Hotel trip ={trip}/>
        {/*Daily plan*/}
            <Itinerary trip={trip}/>
        {/*Footer*/}
    </div>
  )
}
