"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
// import {
//     updateUserProfile,
// } from "../../../../apis/userProfile";

const getCookie = (name) => {
  if (typeof window === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
  return null;
};

export default function SettingsContact({ initialData = {} }) {
  // Get user info and token from Redux store
  const { userInfo, token: reduxToken } = useSelector((state) => state.auth);
  
  // Get token from multiple sources
  const getToken = () => {
    return reduxToken || 
           getCookie('auth_token') || 
           (typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null);
  };

  // Get userId from userInfo
  const userId = userInfo?.user?.id || userInfo?.id;
  const token = getToken();

  // Add validation for required data
  useEffect(() => {
    console.log("SettingsContact Debug Info:");
    console.log("- userInfo:", userInfo);
    console.log("- userId:", userId);
    console.log("- token exists:", !!token);
    console.log("- token length:", token?.length);
    console.log("- NEXT_PUBLIC_URL:", process.env.NEXT_PUBLIC_URL);
    
    if (!userId) {
      console.error("ERROR: userId is required but not found in userInfo");
    }
    if (!token) {
      console.error("ERROR: token is required but not found in Redux, cookies, or localStorage");
    }
    if (!process.env.NEXT_PUBLIC_URL) {
      console.error("ERROR: NEXT_PUBLIC_URL environment variable is not set");
    }
  }, [userId, token, userInfo]);

  const [formData, setFormData] = useState({
    firstName: initialData.firstName || userInfo?.user?.firstName || userInfo?.user?.fname || "",
    lastName: initialData.lastName || userInfo?.user?.lastName || userInfo?.user?.lname || "", 
    email: initialData.email || userInfo?.user?.email || "",
    phone: initialData.phone || userInfo?.user?.phone || "",
    location: initialData.location || userInfo?.user?.location || "",
    dateOfBirth: initialData.dateOfBirth ? initialData.dateOfBirth.split('T')[0] : (userInfo?.user?.dateOfBirth ? userInfo.user.dateOfBirth.split('T')[0] : ""),
    gender: initialData.gender || userInfo?.user?.gender || "",
    bio: initialData.bio || userInfo?.user?.bio || "",
    website: initialData.website || userInfo?.user?.website || "",
    linkedIn: initialData.linkedIn || userInfo?.user?.linkedIn || "",
    twitter: initialData.twitter || userInfo?.user?.twitter || "",
    instagram: initialData.instagram || userInfo?.user?.instagram || ""
  });
  
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch countries on component mount
  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      // Using REST Countries API as an example
      const response = await axios.get("https://restcountries.com/v3.1/all?fields=name");
      const countryList = response.data.map(country => ({
        name: country.name.common,
        value: country.name.common
      })).sort((a, b) => a.name.localeCompare(b.name));
      setCountries(countryList);
    } catch (error) {
      console.error("Error fetching countries:", error);
      // Fallback countries
      setCountries([
        { name: "Nigeria", value: "Nigeria" },
        { name: "United States", value: "United States" },
        { name: "United Kingdom", value: "United Kingdom" },
        { name: "Canada", value: "Canada" }
      ]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (formData.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = "Please enter a valid phone number";
    }
    
    if (formData.website && !/^https?:\/\/.+$/.test(formData.website)) {
      newErrors.website = "Please enter a valid website URL (include http:// or https://)";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if we have required data
    if (!userId) {
      setErrors({ 
        submit: "User ID not found. Please log in again." 
      });
      return;
    }
    
    if (!token) {
      setErrors({ 
        submit: "Authentication token not found. Please log in again." 
      });
      return;
    }
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setSuccessMessage("");
    
    try {
      // Clean the form data - remove empty strings and null values
      const cleanedData = Object.keys(formData).reduce((acc, key) => {
        const value = formData[key];
        if (value !== "" && value !== null && value !== undefined) {
          acc[key] = value;
        }
        return acc;
      }, {});

      console.log("Sending data:", cleanedData);
      console.log("URL:", `${process.env.NEXT_PUBLIC_URL}/users/profile/${userId}`);
      console.log("Token exists:", !!token);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      };

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_URL}/users/profile/${userId}`,
        cleanedData,
        config
      );

      setSuccessMessage("Profile updated successfully!");
      console.log("Profile updated:", response.data);
      
      // Optional: Call a callback to update parent component
      // onProfileUpdated?.(response.data.user);
      
    } catch (error) {
      console.error("Full error object:", error);
      console.error("Error response:", error.response);
      console.error("Error response data:", error.response?.data);
      
      let errorMessage = "Failed to update profile. Please try again.";
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.response?.status === 401) {
        errorMessage = "Authentication failed. Please log in again.";
      } else if (error.response?.status === 403) {
        errorMessage = "You don't have permission to update this profile.";
      } else if (error.response?.status === 404) {
        errorMessage = "User not found.";
      } else if (error.response?.status === 500) {
        errorMessage = "Server error. Please try again later or contact support.";
      }
      
      setErrors({ 
        submit: errorMessage
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset form or navigate back
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      location: "",
      dateOfBirth: "",
      gender: "",
      bio: "",
      website: "",
      linkedIn: "",
      twitter: "",
      instagram: ""
    });
    setErrors({});
    setSuccessMessage("");
  };

  return (
    <div className="settings-contact">
      <div className="settings-contact__inner">
        {successMessage && (
          <div className="success-message" style={{ 
            padding: '10px', 
            marginBottom: '20px', 
            backgroundColor: '#d4edda', 
            color: '#155724', 
            border: '1px solid #c3e6cb', 
            borderRadius: '4px' 
          }}>
            {successMessage}
          </div>
        )}
        
        {errors.submit && (
          <div className="error-message" style={{ 
            padding: '10px', 
            marginBottom: '20px', 
            backgroundColor: '#f8d7da', 
            color: '#721c24', 
            border: '1px solid #f5c6cb', 
            borderRadius: '4px' 
          }}>
            {errors.submit}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name *</label>
              <input 
                type="text" 
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Enter first name" 
                className={errors.firstName ? 'error' : ''}
              />
              {errors.firstName && <span className="error-text">{errors.firstName}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="lastName">Last Name *</label>
              <input 
                type="text" 
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Enter last name" 
                className={errors.lastName ? 'error' : ''}
              />
              {errors.lastName && <span className="error-text">{errors.lastName}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input 
              type="email" 
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter email address" 
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input 
              type="tel" 
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter phone number (e.g., +234801234567)" 
              className={errors.phone ? 'error' : ''}
            />
            {errors.phone && <span className="error-text">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input 
              type="text" 
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Enter your location (e.g., Lagos, Nigeria)" 
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <input 
                type="date" 
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select 
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <textarea 
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              placeholder="Tell us about yourself..."
              rows="4"
            />
          </div>

          <div className="form-group">
            <label htmlFor="website">Website</label>
            <input 
              type="url" 
              id="website"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              placeholder="https://yourwebsite.com" 
              className={errors.website ? 'error' : ''}
            />
            {errors.website && <span className="error-text">{errors.website}</span>}
          </div>

          <div className="social-links">
            <h4>Social Media Links</h4>
            
            <div className="form-group">
              <label htmlFor="linkedIn">LinkedIn</label>
              <input 
                type="url" 
                id="linkedIn"
                name="linkedIn"
                value={formData.linkedIn}
                onChange={handleInputChange}
                placeholder="https://linkedin.com/in/yourusername" 
              />
            </div>

            <div className="form-group">
              <label htmlFor="twitter">Twitter</label>
              <input 
                type="url" 
                id="twitter"
                name="twitter"
                value={formData.twitter}
                onChange={handleInputChange}
                placeholder="https://twitter.com/yourusername" 
              />
            </div>

            <div className="form-group">
              <label htmlFor="instagram">Instagram</label>
              <input 
                type="url" 
                id="instagram"
                name="instagram"
                value={formData.instagram}
                onChange={handleInputChange}
                placeholder="https://instagram.com/yourusername" 
              />
            </div>
          </div>
        </form>
      </div>

      <div className="settings-contact__button-group">
        <button 
          type="button" 
          onClick={handleCancel}
          disabled={loading}
        >
          Cancel
        </button>
        <button 
          type="submit"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save changes"}
        </button>
      </div>

      <style jsx>{`
        .settings-contact {
          max-width: 600px;
          margin: 0 auto;
        }
        
        .settings-contact__inner {
          padding: 20px;
        }
        
        .form-row {
          display: flex;
          gap: 20px;
          margin-bottom: 20px;
        }
        
        .form-group {
          margin-bottom: 20px;
          flex: 1;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
          color: #333;
        }
        
        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 16px;
          transition: border-color 0.3s;
        }
        
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
        }
        
        .form-group input.error,
        .form-group select.error,
        .form-group textarea.error {
          border-color: #dc3545;
        }
        
        .error-text {
          color: #dc3545;
          font-size: 14px;
          margin-top: 4px;
          display: block;
        }
        
        .social-links {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #eee;
        }
        
        .social-links h4 {
          margin-bottom: 20px;
          color: #333;
        }
        
        .settings-contact__button-group {
          display: flex;
          justify-content: flex-end;
          gap: 15px;
          padding: 20px;
          border-top: 1px solid #eee;
        }
        
        .settings-contact__button-group button {
          cursor: pointer;
        }
        
        @media (max-width: 768px) {
          .form-row {
            flex-direction: column;
            gap: 0;
          }
          
          .settings-contact__button-group {
            flex-direction: column;
          }
          
          .settings-contact__button-group button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}