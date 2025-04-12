"use client";

import Link from "next/link";
import { useState } from "react";

export default function ListConnectorDetails() {
  const [tab, setTab] = useState("personal");
  return (
    <>
      <div className="list-community__tabs">
        <div
          className={tab === "personal" ? "list-community__tabs__active" : ""}
          onClick={() => setTab("personal")}
        >
          Personal & Professional details
        </div>
        <div
          className={tab === "connection" ? "list-community__tabs__active" : ""}
          onClick={() => setTab("connection")}
        >
          Connection details
        </div>
        <div
          className={
            tab === "contact" ? "list-community__tabs__active" : ""
          }
          onClick={() => setTab("contact")}
        >
          Contact Information
        </div>
      </div>
      {tab === "personal" && (
        <form action="">
          <label htmlFor="">Name / Organization:</label>
          <input type="text" placeholder="enter name" />
          <label htmlFor="">Role / Title:</label>
          <input type="text" placeholder="enter role" />
          <label htmlFor="">Brief Description:</label>
          <textarea name="" id="" placeholder="enter description"></textarea>

          <label htmlFor="">Source of information:</label>
          <select name="" id="">
            <option value="">select information source</option>
          </select>
          <label htmlFor="">Category:</label>
          <select name="" id="">
            <option value="">select category</option>
          </select>
          <label htmlFor="">Post Frequency:</label>
          <input type="text" placeholder="Number of posting days/week" />
          <div className="list-community__input-grid">
            <div>
              <label htmlFor="">Location:</label>
              <select name="" id="">
                <option value="">select location</option>
              </select>
            </div>
            <div>
              <label htmlFor="">State:</label>
              <select name="" id="">
                <option value="">select state</option>
              </select>
            </div>
          </div>
          <label htmlFor="">Price Tag:</label>
          <select name="" id="">
            <option value="">select price tag</option>
          </select>
          <button>Next</button>
        </form>
      )}

      {tab === "connection" && (
        <form>
        <label htmlFor="">Connection Type:</label>
        <select name="" id="">
          <option value="">select type</option>
        </select>
        <label htmlFor="">Connection Platform:</label>
        <select name="" id="">
          <option value="">select platform</option>
        </select>
        <label htmlFor="">Unique selling points:</label>
        <input type="text" placeholder="What are your community selling points?" />
        
        <label htmlFor="">Special recognition or award:</label>
        <input type="text" placeholder="enter special recognition or award received" />
        <label htmlFor="">Add additional services offered:</label>
       <textarea name="" id="" placeholder="Include any additional service offered"></textarea>

       <button>Next</button>
      </form>
      )}
      
      

{tab === "contact" && (
        <form>
          <label htmlFor="">Link to Community page / website:</label>
          <input type="text" placeholder="enter link to your community or website" />
          <label htmlFor="">Email Address:</label>
          <input type="text" placeholder="enter email" />
          <label htmlFor="">Phone Number:</label>
          <input type="text" placeholder="enter phone  number" />
          <label htmlFor="">Instagram Profile:</label>
          <input type="text" placeholder="Instagram Profile:" />
          <label htmlFor="">LinkedIn Profile:</label>
          <input type="text" placeholder="enter linkedin URL" />
          <label htmlFor="">X Profile:</label>
          <input type="text" placeholder="enter X URL" />
          <label htmlFor="">WhatsApp Link:</label>
          <input type="text" placeholder="enter whatsapp URL" />
          <label htmlFor="">Other Contact Information:</label>
          <input type="text" placeholder="enter other contact" />
          <label htmlFor="">Other Contact Information:</label>
          <input type="text" placeholder="enter other contact" />
          
         <Link href={"/user/list-connector/preview"}>
         <button>Preview</button>
         </Link>
        </form>
      )}
    </>
  );
}
