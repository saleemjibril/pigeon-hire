"use client"
import DeactivationModal from "@/app/components/deactivationModal";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function SettingsContact() {
        const [open, setOpen] = useState(false);
  
  return (
    <div className="settings-contact">
      <div className="settings-contact__inner">

      <div className="settings-contact__inner__header">
        <div>Contact Information</div>
        <Link href={"/user/settings/contact-info/edit"}><Image alt="" width={50} height={18} src={"/assets/icons/edit.svg"} /></Link>
      </div>
      <div className="settings-contact__inner__grid">
        <div>Name:</div>
        <div>Ololade Grace</div>
        <div>Email:</div>
        <div>Ololadegrace.ot@gmail.com</div>
        <div>Phone number:</div>
        <div>+234 8138 834 567</div>
        <div>Contact address:</div>
        <div>Lagos Ikeja</div>
        <div>Country:</div>
        <div>Nigeria</div>
        <div>City:</div>
        <div>Lagos</div>
        <div>List as:</div>
        <div>  
        <Image
                    alt=""
                    width={71}
                    height={20}
                    src={"/assets/icons/connectorGreen.svg"}
                    className="connector-card__role"
                  /></div>
      </div>
      </div>

      <div className="settings-contact__deactivate"
      onClick={() => setOpen(true)}
      >Deactivate Account</div>

      <DeactivationModal open={open} setOpen={setOpen} />
    </div>
  );
}
