"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/app/utils/formatDate";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { createConnector } from "@/app/apis/connector";
import { toast } from "react-toastify";

export default function ConnectorPreview() {
  const router = useRouter();
  const { token } = useSelector((state) => state.auth);
  const [connectorData, setConnectorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    // Load form data from localStorage
    try {
      const savedData = localStorage.getItem('connectorFormData');
      if (savedData) {
        setConnectorData(JSON.parse(savedData));
      }
    } catch (error) {
      console.error('Error loading connector data from localStorage:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSubmit = async () => {
    setFormLoading(true);
    try {
      const response = await createConnector(connectorData, token);
      console.log("createConnector", response);
      toast.success("Connector created successfully!");
      localStorage.removeItem('connectorFormData');
      router.push("/user");
    } catch (error) {
      console.log("Error creating connector:", error);
      toast.error(error?.response?.data?.msg || "Error creating connector. Please try again.");
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) {
    return <div>Loading preview data...</div>;
  }

  if (!connectorData) {
    return (
      <div className="list-preview">
        <div>No connector data found. Please go back and complete the form.</div>
        <Link href="/user/list-connector">
          <button>Go Back to Form</button>
        </Link>
      </div>
    );
  }

  const fullName = `${connectorData.firstName || ''} ${connectorData.lastName || ''}`.trim();
  
  return (
    <div className="list-preview">
      <div>Preview</div>
      <br />

      <div className="edit-network-details__banner"></div>
      <br />
      
      <div className="list-preview__grid">
        <div>Name:</div>
        <div>{fullName || "Not provided"}</div>
        
        <div>Organization:</div>
        <div>{connectorData.communityName || "Not provided"}</div>
        
        <div>Description:</div>
        <div>{connectorData.description || "Not provided"}</div>
        
        <div>Role:</div>
        <div>{connectorData.role || "Not provided"}</div>
        
        <div>Source of Information:</div>
        <div>{connectorData.sourceOfInfo || "Not provided"}</div>
        
        <div>Location:</div>
        <div>
          {connectorData.location}
          {connectorData.state ? `, ${connectorData.state}` : ""}
        </div>
        
        <div>Contact information:</div>
        <div>{connectorData.phone || "Not provided"}</div>
        
        <div>Email:</div>
        <div>{connectorData.email || "Not provided"}</div>
      </div>
      
      <div className="list-preview__divider"></div>
      
      <div className="list-preview__grid">
        <div>Connection type:</div>
        <div>{connectorData.connectionType || "Not provided"}</div>
        
        <div>Post frequency:</div>
        <div className="list-preview__grid__socials">
          <div>{connectorData.postFrequency ? `${connectorData.postFrequency} days/week` : "Not provided"}</div>
        </div>
        
     
        
        <div>Communication platform:</div>
        <div className="list-preview__grid__socials">
          <div>{connectorData.connectionPlatform || "Not provided"}</div>
        </div>
        
        <div>Social media:</div>
        <div className="list-preview__grid__socials">
          {connectorData.instagram && <div>Instagram
            
            {/* : {connectorData.instagram} */}
            
            </div>}
          {connectorData.twitter && <div>Twitter
            {/* : {connectorData.twitter} */}
            </div>}
          {connectorData.linkedIn && <div>LinkedIn
            {/* : {connectorData.linkedIn} */}
            </div>}
          {connectorData.whatsapp && <div>WhatsApp
            {/* : {connectorData.whatsapp} */}
            </div>}
          {!connectorData.instagram && !connectorData.twitter && 
           !connectorData.linkedIn && !connectorData.whatsapp && "Not provided"}
        </div>
        
        <div>Special achievements:</div>
        <div>{connectorData.recognition || "Not provided"}</div>
      </div>
      
      <div className="list-preview__divider"></div>
      
      <div className="list-preview__grid">
      <div>Access requirements:</div>
      <div>{connectorData.accessRequirement || "Not provided"}</div>
        <div>Unique selling points:</div>
        <div>{connectorData.usp || "Not provided"}</div>
        
        <div>Additional information:</div>
        <div>{connectorData.additionalInfo || "Not provided"}</div>
        
        <div>Other contact information:</div>
        <div>{connectorData.otherContact || "Not provided"}</div>
        
        <div>Link to website:</div>
        <div>{connectorData.website || "Not provided"}</div>
      </div>
      
      <button onClick={handleSubmit} disabled={formLoading}>
        {formLoading ? "Loading..." : "List"}
      </button>
    </div>
  );
}