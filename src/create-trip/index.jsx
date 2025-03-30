import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { doc, setDoc } from "firebase/firestore"; 
import axios from "axios";
import { Toaster } from "@/components/ui/sonner";
import {
  AI_PROMPT,
  SelectBudgetOptons,
  SelectTravelesList,
} from "@/constants/options";
import { chatSession } from "@/service/AIModel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";
import { db } from "@/service/firebaseConfig";
import { useNavigate} from "react-router-dom";

function CreateTrip() {
  const apiKey = import.meta.env.VITE_GOMAPS_API_KEY;
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading]=useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate=useNavigate();
  // Form data state
  const [formData, setFormData] = useState({
    location: "",
    noOfDays: "",
    budget: "",
    traveler: "",
  });

  // Handle form input changes
  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Fetch places suggestions
  const fetchPlaces = async (input) => {
    if (!input.trim()) return setSuggestions([]);

    try {
      const response = await fetch(
        `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${input}&key=${apiKey}`
      );
      const data = await response.json();
      setSuggestions(data.predictions || []);
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  const login = useGoogleLogin({
    onSuccess:(codeResp)=>GetUserProfile(codeResp),
    onError:(error)=>console.log(error)
  })

  const handleSubmit = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (
      !formData.location ||
      !formData.noOfDays ||
      !formData.budget ||
      !formData.traveler
    ) {
      toast.error("Please fill all details", {
        description: "All fields are required to generate your trip plan.",
      });
      return;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label || formData?.location
    )
      .replace("{noOfDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget)
      .replace("{noOfDays}", formData?.noOfDays);

    console.log(FINAL_PROMPT);
    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result?.response?.text());
    toast.success("Trip Created!", {
      description: "Your customized trip itinerary is ready.",
    });

    console.log("Form Data Submitted:", formData);
    
    SaveAiTrip(result?.response?.text())
    setLoading(false);
  };

  const SaveAiTrip=async(TripData)=>{
    setLoading(true);
    const user=JSON.parse(localStorage.getItem('user'));
    const docID=Date.now().toString()
    await setDoc(doc(db, "Trips", docID), {
      UserSelection:formData,
      tripData: JSON.parse(TripData),
      userEmail:user?.email,
      id:docID
    });
    setLoading(false);
    navigate('/view-trip/'+docID)
  }

  const GetUserProfile=(tokenInfo)=>{
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`,{
      headers:{
        Authorization:`Bearer ${tokenInfo?.access_token}`,
        Accept: 'application/json'
      }
    }).then((resp)=>{
      console.log(resp);
      localStorage.setItem('user',JSON.stringify(resp.data));
      setOpenDialog(false);
      handleSubmit();
    }) 
    setLoading(false);
  }
  return (
    <div className="min-h-screen w-full relative overflow-hidden" style={{ backgroundImage: "url('/ocean.jpg')" }}>
      {/* Video Background */}
      
      
      {/* Overlay to make content more readable - much reduced opacity */}
      <div className="absolute inset-0 bg-black bg-opacity-10"></div>
      
      {/* Content */}
      <div className="relative z-10 py-12 px-4">
        <Toaster />
        
        <div className="max-w-4xl mx-auto bg-white bg-opacity-20 p-8 rounded-lg shadow-lg backdrop-blur-sm">
          <h2 className="font-bold text-3xl text-center">
            Customize your travel plan by entering your preference
          </h2>
          <p className="mt-3 text-center">
            Provide some basic information, and our trip planner will generate a
            customized itinerary.
          </p>
          
          <div className="mt-12 flex flex-col gap-10">
            {/* Location Input */}
            <div>
              <h2 className="text-xl my-3 font-medium">
                Enter your destination of choice
              </h2>
              <input
                type="text"
                placeholder="Search for a place..."
                className="border p-2 w-full bg-white text-black rounded-md"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  handleInputChange("location", e.target.value);
                  fetchPlaces(e.target.value);
                }}
              />

              {/* Show autocomplete suggestions */}
              {suggestions.length > 0 && (
                <ul className="border border-gray-300 mt-2 rounded-md bg-white shadow-md">
                  {suggestions.map((place) => (
                    <li
                      key={place.place_id}
                      className="p-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        setQuery(place.description);
                        handleInputChange("location", place.description);
                        setSuggestions([]); // Hide suggestions after selection
                      }}
                    >
                      {place.description}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* No. of Days Input */}
            <div>
              <h2 className="text-xl my-3 font-medium">
                How many days are you staying for?
              </h2>
              <Input
                placeholder="Ex. 3"
                type="number"
                value={formData.noOfDays}
                onChange={(e) => handleInputChange("noOfDays", e.target.value)}
              />
            </div>

            {/* Budget Selection */}
            <div>
              <h2 className="text-xl my-3 font-medium">What is your budget?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
                {SelectBudgetOptons.map((item, index) => (
                  <div
                    key={index}
                    className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg bg-white ${
                      formData.budget === item.title ? "border-blue-500 ring-2 ring-blue-300" : ""
                    }`}
                    onClick={() => handleInputChange("budget", item.title)}
                  >
                    <h2 className="text-5xl">{item.icon}</h2>
                    <h2 className="font-bold text-lg">{item.title}</h2>
                    <h2 className="text-sm text-gray-500">{item.desc}</h2>
                  </div>
                ))}
              </div>
            </div>

            {/* Traveler Selection */}
            <div>
              <h2 className="text-xl my-3 font-medium">
                Who are you travelling with?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
                {SelectTravelesList.map((item, index) => (
                  <div
                    key={index}
                    className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg bg-white ${
                      formData.traveler === item.title ? "border-blue-500 ring-2 ring-blue-300" : ""
                    }`}
                    onClick={() => handleInputChange("traveler", item.title)}
                  >
                    <h2 className="text-5xl">{item.icon}</h2>
                    <h2 className="font-bold text-lg">{item.title}</h2>
                    <h2 className="text-sm text-gray-500">{item.desc}</h2>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Submit Button */}
          <div className="my-10 flex justify-center">
            <Button disabled={loading} onClick={handleSubmit} className="px-8 py-2">
              {
                loading ? <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin"/> : 'Generate Trip'
              }
            </Button>
          </div>
        </div>
      </div>
      
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign In Required</DialogTitle>
            <DialogDescription>
              <img src="/logo.svg" alt="App Logo" />
              <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
              <p>Sign in to the App with Google authentication securely</p>

              <Button
                onClick={() => {
                  login();
                  setOpenDialog(false); // Close the dialog after login attempt
                }}
                className="mt-5 w-full h-15 flex gap-4 items-center"
              >
                <FcGoogle className="h-7 w-7" />
                Sign In
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;