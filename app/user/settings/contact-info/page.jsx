"use client"
import DeactivationModal from "@/app/components/deactivationModal";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function SettingsContact() {
  const [open, setOpen] = useState(false);
  
  // Get user info from Redux store
  const { userInfo } = useSelector((state) => state.auth);
  
  // Extract user data with fallbacks
  const userData = {
    name: userInfo?.user ? 
      `${userInfo.user.firstName || userInfo.user.fname || ''} ${userInfo.user.lastName || userInfo.user.lname || ''}`.trim() 
      : 'N/A',
    email: userInfo?.user?.email || 'N/A',
    phone: userInfo?.user?.phone || 'N/A',
    address: userInfo?.user?.location || userInfo?.user?.address || 'N/A',
    country: userInfo?.user?.country || 'N/A',
    city: userInfo?.user?.city || 'N/A'
  };
  
  return (
    <div className="settings-contact">
      <div className="settings-contact__inner">
        <div className="settings-contact__inner__header">
          <div>Contact Information</div>
          <Link href={"/user/settings/contact-info/edit"}>
            <Image alt="Edit" width={50} height={18} src={"/assets/icons/edit.svg"} />
          </Link>
        </div>
        
        <div className="settings-contact__inner__grid">
          <div>Name:</div>
          <div>{userData.name}</div>
          
          <div>Email:</div>
          <div>{userData.email}</div>
          
          <div>Phone number:</div>
          <div>{userData.phone}</div>
          
          <div>Contact address:</div>
          <div>{userData.address}</div>
          
          <div>Country:</div>
          <div>{userData.country}</div>
          
          <div>City:</div>
          <div>{userData.city}</div>
          
          <div>List as:</div>
          <div>  
            <Image
              alt="Connector Status"
              width={71}
              height={20}
              src={"/assets/icons/connectorGreen.svg"}
              className="connector-card__role"
            />
          </div>
        </div>
      </div>

      <div className="settings-contact__deactivate"
        onClick={() => setOpen(true)}
      >
        Deactivate Account
      </div>

      <DeactivationModal open={open} setOpen={setOpen} />
    </div>
  );
}