"use client";

import { useState } from "react";

export default function ListCommunityDetails() {
  const [tab, setTab] = useState("image");
  return (
    <>
      <div className="list-community__tabs">
        <div
          className={tab === "info" ? "list-community__tabs__active" : ""}
          onClick={() => setTab("info")}
        >
          Community Information
        </div>
        <div
          className={tab === "image" ? "list-community__tabs__active" : ""}
          onClick={() => setTab("image")}
        >
          Community Image
        </div>
        <div
          className={
            tab === "additional-info" ? "list-community__tabs__active" : ""
          }
          onClick={() => setTab("additional-info")}
        >
          Additional Features
        </div>
        <div
          className={
            tab === "contact-info" ? "list-community__tabs__active" : ""
          }
          onClick={() => setTab("contact-info")}
        >
          Contact Information
        </div>
      </div>
      {tab === "info" && (
        <form action="">
          <label htmlFor="">Community Name:</label>
          <input type="text" placeholder="enter name" />
          <label htmlFor="">Community Description:</label>
          <textarea name="" id="" placeholder="enter description"></textarea>
          <label htmlFor="">Community Type:</label>
          <select name="" id="">
            <option value="">select type</option>
          </select>
          <label htmlFor="">Community Category:</label>
          <select name="" id="">
            <option value="">select category</option>
          </select>
          <label htmlFor="">Community Established Date:</label>
          <input type="date" name="" id="" />
          <label htmlFor="">Total Number of Members:</label>
          <select name="" id="">
            <option value="">select numbers</option>
          </select>
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
            <option value="">select community tag</option>
          </select>
          <label htmlFor="">Engagement Level:</label>
          <select name="" id="">
            <option value="">select engagement level</option>
          </select>
          <label htmlFor="">Post Frequency:</label>
          <input type="text" placeholder="Number of posting days/week" />

          <button>Save Changes</button>
        </form>
      )}

      {tab === "image" && (
        <form>
          <label htmlFor="">Upload Community image</label>

          <div className="list-community__file">
            <div className="list-community__file__group">
              <button>Choose File</button>
              <div>No File Chosen</div>
            </div>

            <button>Upload</button>
          </div>
          <div className="list-community__file-info">
            Please upload .jepg, .jpg, .png or .pdf, size less than 100KB
          </div>
        </form>
      )}
    </>
  );
}
