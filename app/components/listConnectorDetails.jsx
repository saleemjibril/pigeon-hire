"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { getCommunities, getConnectionCategories } from "../apis/community";
import { usePlacesWidget } from "react-google-autocomplete";
import Autocomplete from "react-google-autocomplete";
import { countries } from "../utils/countries";

// Define menu styling props
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// Mock API functions - replace these with actual API calls
const getConnectionTypes = async () => {
  return {
    data: [
      { id: 1, connectionType: "Accelerator Leads" },
      { id: 2, connectionType: "Mentor" },
      { id: 3, connectionType: "Investor" },
      { id: 4, connectionType: "Entrepreneur" },
    ],
  };
};

const getConnectionPlatforms = async () => {
  return {
    data: [
      { id: 1, connectionPlatform: "Facebook Groups" },
      { id: 2, connectionPlatform: "LinkedIn Groups" },
      { id: 3, connectionPlatform: "Slack Channels" },
      { id: 4, connectionPlatform: "Discord Communities" },
    ],
  };
};

const getSourcesOfInfo = async () => {
  return {
    data: [
      { id: 1, sourceOfInfo: "Wikipedia" },
      { id: 2, sourceOfInfo: "Official Website" },
      { id: 3, sourceOfInfo: "Personal Knowledge" },
      { id: 4, sourceOfInfo: "Industry Reports" },
    ],
  };
};

export default function ListConnectorDetails() {
  const router = useRouter();
  const [tab, setTab] = useState("personal");

  // State for storing API data
  const [connectionTypes, setConnectionTypes] = useState([]);
  const [connectionPlatforms, setConnectionPlatforms] = useState([]);
  const [sourcesOfInfo, setSourcesOfInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [communities, setCommunities] = useState([]);
  const [error, setError] = useState(null);

  // React Hook Form setup
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    
    // Try to load saved form data from localStorage if available
    defaultValues: (() => {
      if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem("connectorFormData");
      if (savedData) {
        try {
          return JSON.parse(savedData);
        } catch (error) {
          console.error("Error parsing saved form data:", error);
        }
      }
    }
    })(),
  });

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch all required data in parallel
        const [typesRes, platformsRes, sourcesRes, communitiesRes] =
          await Promise.all([
            getConnectionCategories(),
            getConnectionPlatforms(),
            getSourcesOfInfo(),
            getCommunities(),
          ]);

        setConnectionTypes(typesRes.data);
        setConnectionPlatforms(platformsRes.data);
        setSourcesOfInfo(sourcesRes.data);
        setCommunities(communitiesRes.data.communities);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load connector data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Auto-save form data when changing tabs
  const handleTabChange = useCallback(
    (newTab) => {
      // Get current form data and save to localStorage
      const currentValues = watch();
      localStorage.setItem("connectorFormData", JSON.stringify(currentValues));

      // Change the tab
      setTab(newTab);
    },
    [watch]
  );

  // Form submission handler
  const onSubmit = (data) => {
    console.log("Form submitted:", data);

    try {
      // Store the form data in localStorage
      localStorage.setItem("connectorFormData", JSON.stringify(data));
      router.push("/user/list-connector/preview");
    } catch (error) {
      console.error("Error saving to localStorage:", error);
      alert("Failed to save form data. Please try again.");
    }
  };

  if (loading) return <div>Loading connector data...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="list-community__tabs">
        <div
          className={tab === "personal" ? "list-community__tabs__active" : ""}
          onClick={() => handleTabChange("personal")}
        >
          Personal & Professional details
        </div>
        <div
          className={tab === "connection" ? "list-community__tabs__active" : ""}
          onClick={() => handleTabChange("connection")}
        >
          Connection details
        </div>
        <div
          className={tab === "contact" ? "list-community__tabs__active" : ""}
          onClick={() => handleTabChange("contact")}
        >
          Contact Information
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {tab === "personal" && (
          <div>
            <div className="list-community__input-grid">
              <div>
                <label htmlFor="firstName">First Name:</label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="enter first name"
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                />
                {errors.firstName && (
                  <p className="error">{errors.firstName.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="lastName">Last Name:</label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="enter last name"
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                />
                {errors.lastName && (
                  <p className="error">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <label htmlFor="communityName">
              Organization / Community Name:
            </label>

            <select
              id="communityName"
              {...register("communityName", {
                required: "Community is required",
              })}
            >
              <option value="">select community</option>
              {communities.map((community) => (
                <option key={community.id} value={community.name}>
                  {community.name}
                </option>
              ))}
            </select>
            {errors.communityName && (
              <p className="error">{errors.communityName.message}</p>
            )}

            <label htmlFor="role">Role / Title:</label>
            <input
              type="text"
              id="role"
              placeholder="enter role"
              {...register("role", { required: "Role is required" })}
            />
            {errors.role && <p className="error">{errors.role.message}</p>}

            <label htmlFor="description">Brief Description:</label>
            <textarea
              id="description"
              placeholder="enter description"
              {...register("description", {
                required: "Description is required",
              })}
            ></textarea>
            {errors.description && (
              <p className="error">{errors.description.message}</p>
            )}

            <label htmlFor="sourceOfInfo">Source of information:</label>
            <select
              id="sourceOfInfo"
              {...register("sourceOfInfo", {
                required: "Source of information is required",
              })}
            >
              <option value="">select information source</option>
              {sourcesOfInfo.map((source) => (
                <option key={source.id} value={source.sourceOfInfo}>
                  {source.sourceOfInfo}
                </option>
              ))}
            </select>
            {errors.sourceOfInfo && (
              <p className="error">{errors.sourceOfInfo.message}</p>
            )}

            <label htmlFor="postFrequency">Post Frequency:</label>
            <input
              type="text"
              id="postFrequency"
              placeholder="Number of posting days/week"
              {...register("postFrequency", {
                required: "Frequency is required",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Please enter a valid number",
                },
              })}
            />
            {errors.postFrequency && (
              <p className="error">{errors.postFrequency.message}</p>
            )}

            <div className="list-community__input-grid">
              <div>
                <label htmlFor="location">Location:</label>
                <Controller
                  name="location"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      className="location-input"
                      apiKey="AIzaSyBWo_tQ4rjQkZz1kN5WXfnemHCaF0gQ8BU"
                      placeholder="Enter your location"
                      defaultValue={field.value}
                      onPlaceSelected={(place) => {
                        console.log("Address:", place.formatted_address);

                        // Update the location field with the selected address
                        setValue("location", place.formatted_address);
                      }}
                      onChange={(e) => {
                        // Update just the text input value when typing
                        setValue("location", e.target.value);
                      }}
                      options={{
                        types: ["address"],
                      }}
                    />
                  )}
                />

                {errors.location && (
                  <p className="error">{errors.location.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="state">Country:</label>
                <select
                  id="state"
                  {...register("state", { required: "State is required" })}
                >
                  <option value="">select country</option>
                  {countries?.map((country) => 
                  <option value={country?.label}>{country?.label}</option>
                  )}
                 
                  {/* Add more states as needed */}
                </select>
                {errors.state && (
                  <p className="error">{errors.state.message}</p>
                )}
              </div>
            </div>

            <label htmlFor="accessRequirement">Access Requirements:</label>
            <select
              id="accessRequirement"
              {...register("accessRequirement", {
                required: "Access requirement is required",
              })}
            >
              <option value="">select access requirement</option>
              <option value="free">Free</option>
              <option value="paid">Paid</option>
              <option value="invitation">Invitation Only</option>
            </select>
            {errors.accessRequirement && (
              <p className="error">{errors.accessRequirement.message}</p>
            )}

            <button type="button" onClick={() => handleTabChange("connection")}>
              Next
            </button>
          </div>
        )}

        {tab === "connection" && (
          <div>
            <label htmlFor="connectionType">Connection Type:</label>
            <select
              id="connectionType"
              {...register("connectionType", {
                required: "Connection type is required",
              })}
            >
              <option value="">select type</option>
              {connectionTypes.map((type) => (
                <option key={type.id} value={type.connCategory}>
                  {type.connCategory}
                </option>
              ))}
            </select>
            {errors.connectionType && (
              <p className="error">{errors.connectionType.message}</p>
            )}

            <label htmlFor="connectionPlatform">Connection Platform:</label>
            <select
              id="connectionPlatform"
              {...register("connectionPlatform", {
                required: "Connection platform is required",
              })}
            >
              <option value="">select platform</option>
              {connectionPlatforms.map((platform) => (
                <option key={platform.id} value={platform.connectionPlatform}>
                  {platform.connectionPlatform}
                </option>
              ))}
            </select>
            {errors.connectionPlatform && (
              <p className="error">{errors.connectionPlatform.message}</p>
            )}

            <label htmlFor="usp">Unique selling points:</label>
            <input
              type="text"
              id="usp"
              placeholder="What are your community selling points?"
              {...register("usp")}
            />

            <label htmlFor="recognition">Special recognition or award:</label>
            <input
              type="text"
              id="recognition"
              placeholder="enter special recognition or award received"
              {...register("recognition")}
            />

            <label htmlFor="additionalInfo">
              Add any additional information:
            </label>
            <textarea
              id="additionalInfo"
              placeholder="List any companies, individuals, or sectors you can connect anyone to—e.g., funders, companies, service providers, or experts in tech, finance, education, health, legal, etc. Be as specific as possible."
              {...register("additionalInfo")}
            ></textarea>

            <button type="button" onClick={() => handleTabChange("contact")}>
              Next
            </button>
          </div>
        )}

        {tab === "contact" && (
          <div>
            <label htmlFor="website">Link to Community page / website:</label>
            <input
              type="text"
              id="website"
              placeholder="enter link to your community or website"
              {...register("website", {
                pattern: {
                  value:
                    /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                  message: "Please enter a valid URL",
                },
              })}
            />
            {errors.website && (
              <p className="error">{errors.website.message}</p>
            )}

            <label htmlFor="email">Email Address:</label>
            <input
              type="email"
              id="email"
              placeholder="enter email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Please enter a valid email address",
                },
              })}
            />
            {errors.email && <p className="error">{errors.email.message}</p>}

            <label htmlFor="phone">Phone Number:</label>
            <input
              type="text"
              id="phone"
              placeholder="enter phone number"
              {...register("phone", {
                pattern: {
                  value: /^[0-9+\-\s()]*$/,
                  message: "Please enter a valid phone number",
                },
              })}
            />
            {errors.phone && <p className="error">{errors.phone.message}</p>}

            <label htmlFor="instagram">Instagram Profile:</label>
            <input
              type="text"
              id="instagram"
              placeholder="Instagram Profile:"
              {...register("instagram")}
            />

            <label htmlFor="linkedIn">LinkedIn Profile:</label>
            <input
              type="text"
              id="linkedIn"
              placeholder="enter linkedin URL"
              {...register("linkedIn")}
            />

            <label htmlFor="twitter">X/Twitter Profile:</label>
            <input
              type="text"
              id="twitter"
              placeholder="enter X/Twitter URL"
              {...register("twitter")}
            />

            <label htmlFor="whatsapp">WhatsApp Link:</label>
            <input
              type="text"
              id="whatsapp"
              placeholder="enter whatsapp URL"
              {...register("whatsapp")}
            />

            <label htmlFor="otherContact">Other Contact Information:</label>
            <input
              type="text"
              id="otherContact"
              placeholder="enter other contact"
              {...register("otherContact")}
            />

            <button type="submit">Preview and Save</button>
          </div>
        )}
      </form>
    </>
  );
}
