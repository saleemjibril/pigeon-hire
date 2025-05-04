"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/app/utils/formatDate";
import { createCommunity } from "@/app/apis/community";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function CommunityPreview() {
  const router = useRouter();
  const {token} = useSelector((state) => state.auth);
  const [communityData, setCommunityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    // Load form data from localStorage
    try {
      const savedData = localStorage.getItem('communityFormData');
      if (savedData) {
        setCommunityData(JSON.parse(savedData));
      }
    } catch (error) {
      console.error('Error loading community data from localStorage:', error);
    } finally {
      setLoading(false);
    }
  }, []);


  const handleSubmit = async () => {
    setFormLoading(true);
    try {
      const response = await createCommunity(communityData, token);

    console.log("createCommunity", response);
    toast.success("Community created successfully!");
    localStorage.removeItem('communityFormData');
    router.push("/user")

    } catch (error) {
      console.log("Error creating community:", error);
      toast.error(error?.response?.data?.msg || "Error creating community. Please try again.");
    }finally {
    setFormLoading(false);
    }

  }



  if (loading) {
    return <div>Loading preview data...</div>;
  }

  if (!communityData) {
    return (
      <div className="list-preview">
        <div>No community data found. Please go back and complete the form.</div>
        <Link href="/user/list-connector">
          <button>Go Back to Form</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="list-preview">
      <div>Preview</div>
      <br />

      <div className="edit-network-details__banner"></div>
      <br />
      
      <div className="list-preview__grid">
        <div>Name:</div>
        <div>{communityData.name || "Not provided"}</div>
        
        <div>Description:</div>
        <div>{communityData.description || "Not provided"}</div>
        
        <div>Category:</div>
        <div>{communityData.communityType || "Not provided"}</div>
        
        <div>Subcategory:</div>
        <div>{communityData.commTypeCategory || "Not provided"}</div>
        
        <div>Community size:</div>
        <div>{communityData.size || "Not provided"}</div>
        
        <div>Location:</div>
        <div>{communityData.location}{communityData.state ? `, ${communityData.state}` : ""}</div>
        
        <div>Contact information:</div>
        <div>{communityData.phone || "Not provided"}</div>
      </div>
      
      <div className="list-preview__divider"></div>
      
      <div className="list-preview__grid">
        <div>Connection type:</div>
        <div>
        {Array.isArray(communityData.commTypeCategory) 
            ? communityData.commTypeCategory.join(", ") 
            : communityData.commTypeCategory || "Not provided"}
        </div>
        
        <div>Created:</div>
        <div>{formatDate(communityData.established)}</div>
        
        <div>Price tag:</div>
        <div>
          {communityData.accessType === "free" ? (
            <Image
              src={"/assets/icons/free.svg"}
              width={55}
              height={34}
              alt="Free"
            />
          ) : (
            communityData.accessType || "Not provided"
          )}
        </div>
        
        <div>Communication platform:</div>
        <div className="list-preview__grid__socials">
          <div>{communityData.communicationPlatform || "Not provided"}</div>
        </div>
        
        <div>Engagement level:</div>
        <div>{communityData.engagementLevel || "Not provided"}</div>
        
        <div>Post frequency:</div>
        <div className="list-preview__grid__socials">
          <div>{communityData.frequency ? `${communityData.frequency} days/week` : "Not provided"}</div>
        </div>
      </div>
      
      <div className="list-preview__divider"></div>
      
      <div className="list-preview__grid">
        <div>Content shared:</div>
        <div className="list-preview__grid__socials">
          <div>{Array.isArray(communityData.contentShared) 
            ? communityData.contentShared.join(", ") 
            : communityData.contentShared || "Not provided"}</div>
        </div>
        
        <div>Communities interest:</div>
        <div>{communityData.communityInterest || "Not provided"}</div>
        
        <div>Access requirements:</div>
        <div>{communityData.accessType || "Not provided"}</div>
        
        <div>Link to community:</div>
        <div>{communityData.website || "Not provided"}</div>
        
        <div>Interaction type:</div>
        <div className="list-preview__grid__socials">
          <div>{Array.isArray(communityData.communityGoal) 
            ? communityData.communityGoal.join(", ") 
            : communityData.communityGoal || "Not provided"}</div>
        </div>
        
        <div>Special achievements:</div>
        <div>{communityData.recognition || "Not provided"}</div>
        
        <div>Additional services:</div>
        <div>{communityData.additionalService || "Not provided"}</div>
      </div>
      
      <button onClick={handleSubmit} disabled={formLoading}>{formLoading ? "Loading..." : "List"}</button>
    </div>
  );
}