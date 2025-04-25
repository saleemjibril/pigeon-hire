"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  getCommunityTypes,
  getCommunitySizes,
  getEngagementLevels,
  getContentSharedTypes,
  getGoals,
  getConnectionCategories
} from "@/app/apis/community"; // Update with your actual path to API functions

export default function ListCommunityDetails() {
  const [tab, setTab] = useState("info");
  
  // State for storing API data
  const [communityTypes, setCommunityTypes] = useState([]);
  const [communitySizes, setCommunitySizes] = useState([]);
  const [engagementLevels, setEngagementLevels] = useState([]);
  const [contentSharedTypes, setContentSharedTypes] = useState([]);
  const [interactionTypes, setInteractionTypes] = useState([]); // Goals
  const [connectionCategories, setConnectionCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch all required data in parallel
        const [
          typesRes, 
          sizesRes, 
          engagementRes, 
          contentRes, 
          goalsRes, 
          categoriesRes
        ] = await Promise.all([
          getCommunityTypes(),
          getCommunitySizes(),
          getEngagementLevels(),
          getContentSharedTypes(),
          getGoals(),
          getConnectionCategories()
        ]);

        
        
        setCommunityTypes(typesRes.data);
        setCommunitySizes(sizesRes.data);
        setEngagementLevels(engagementRes.data);
        setContentSharedTypes(contentRes.data);
        setInteractionTypes(goalsRes.data); // Using goals as interaction types
        setConnectionCategories(categoriesRes.data);
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load community data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTabChange = (newTab) => {
    setTab(newTab);
  };

  if (loading) return <div>Loading community data...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="list-community__tabs">
        <div
          className={tab === "info" ? "list-community__tabs__active" : ""}
          onClick={() => handleTabChange("info")}
        >
          Community Information
        </div>
        <div
          className={tab === "image" ? "list-community__tabs__active" : ""}
          onClick={() => handleTabChange("image")}
        >
          Community Image
        </div>
        <div
          className={
            tab === "additional-info" ? "list-community__tabs__active" : ""
          }
          onClick={() => handleTabChange("additional-info")}
        >
          Additional Features
        </div>
        <div
          className={
            tab === "contact-info" ? "list-community__tabs__active" : ""
          }
          onClick={() => handleTabChange("contact-info")}
        >
          Contact Information
        </div>
      </div>
      
      {tab === "info" && (
        <form action="">
          <label htmlFor="name">Community Name:</label>
          <input type="text" id="name" placeholder="enter name" />
          
          <label htmlFor="description">Community Description:</label>
          <textarea id="description" placeholder="enter description"></textarea>
          
          <label htmlFor="type">Community Type:</label>
          <select id="type">
            <option value="">select type</option>
            {communityTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.communityType}
              </option>
            ))}
          </select>
          
          <label htmlFor="category">Community Category:</label>
          <select id="category">
            <option value="">select category</option>
            {communityTypes.length > 0 && communityTypes[0].commTypeCategory && 
              communityTypes[0].commTypeCategory.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))
            }
          </select>
          
          <label htmlFor="establishedDate">Community Established Date:</label>
          <input type="date" id="establishedDate" />
          
          <label htmlFor="members">Total Number of Members:</label>
          <select id="members">
            <option value="">select numbers</option>
            {communitySizes.map((size) => (
              <option key={size.id} value={size.id}>
                {size.size}
              </option>
            ))}
          </select>
          
          <div className="list-community__input-grid">
            <div>
              <label htmlFor="location">Location:</label>
              <select id="location">
                <option value="">select location</option>
                {/* Add location options if available */}
              </select>
            </div>
            <div>
              <label htmlFor="state">State:</label>
              <select id="state">
                <option value="">select state</option>
                {/* Add state options if available */}
              </select>
            </div>
          </div>
          
          <label htmlFor="priceTag">Price Tag:</label>
          <select id="priceTag">
            <option value="">select community tag</option>
            {connectionCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.connCategory}
              </option>
            ))}
          </select>
          
          <label htmlFor="engagement">Engagement Level:</label>
          <select id="engagement">
            <option value="">select engagement level</option>
            {engagementLevels.map((level) => (
              <option key={level.id} value={level.id}>
                {level.engagementLevel}
              </option>
            ))}
          </select>
          
          <label htmlFor="frequency">Post Frequency:</label>
          <input type="text" id="frequency" placeholder="Number of posting days/week" />

          <button type="button" onClick={() => handleTabChange("image")}>Next</button>
        </form>
      )}

      {tab === "image" && (
        <form>
          <label htmlFor="communityImage">Upload Community image</label>

          <div className="list-community__file">
            <div className="list-community__file__group">
              <button type="button">Choose File</button>
              <div>No File Chosen</div>
            </div>

            <button type="button">Upload</button>
          </div>
          <div className="list-community__file-info">
            Please upload .jpeg, .jpg, .png or .pdf, size less than 100KB
          </div>
          
          <button type="button" onClick={() => handleTabChange("additional-info")}>Next</button>
        </form>
      )}
      
      {tab === "additional-info" && (
        <form>
          <label htmlFor="contentType">Types of content shared:</label>
          <select id="contentType">
            <option value="">select type</option>
            {contentSharedTypes.map((content) => (
              <option key={content.id} value={content.id}>
                {content.contentShared}
              </option>
            ))}
          </select>
          
          <label htmlFor="topics">Key Topics & Interests:</label>
          <select id="topics">
            <option value="">select type</option>
            {/* Add topics options if available */}
          </select>
          
          <label htmlFor="platforms">Platforms Used:</label>
          <select id="platforms">
            <option value="">select your preferred platform</option>
            {/* Add platforms options if available */}
          </select>
          
          <label htmlFor="interactions">Types of Interactions:</label>
          <select id="interactions">
            <option value="">select interaction type</option>
            {interactionTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.communityGoal}
              </option>
            ))}
          </select>
          
          <label htmlFor="sellingPoints">Unique selling points:</label>
          <input type="text" id="sellingPoints" placeholder="What are your community selling points?" />
          
          <label htmlFor="awards">Special recognition or award:</label>
          <input type="text" id="awards" placeholder="enter special recognition or award received" />
          
          <label htmlFor="additionalServices">Add additional services offered:</label>
          <textarea id="additionalServices" placeholder="Include any additional service offered"></textarea>

          <button type="button" onClick={() => handleTabChange("contact-info")}>Next</button>
        </form>
      )}

      {tab === "contact-info" && (
        <form>
          <label htmlFor="accessRequirements">Access Requirements:</label>
          <select id="accessRequirements">
            <option value="">select access requirement</option>
            {/* Add access requirement options if available */}
          </select>
          
          <label htmlFor="websiteLink">Link to community page or website:</label>
          <input type="text" id="websiteLink" placeholder="enter link to your community or website" />
          
          <label htmlFor="contact">Contact:</label>
          <input type="text" id="contact" placeholder="enter your contact details" />
          
          <Link href="/user/list-connector/preview">
            <button type="button">Preview</button>
          </Link>
        </form>
      )}
    </>
  );
}