"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/app/utils/formatDate";
import { createCommunity } from "@/app/apis/communityService";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function CommunityPreview() {
    const router = useRouter();
    const { token } = useSelector((state) => state.auth);
    const [communityData, setCommunityData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formLoading, setFormLoading] = useState(false);

    useEffect(() => {
        // Load form data from localStorage
        try {
            const savedData = localStorage.getItem("communityFormData");
            if (savedData) {
                const parsedData = JSON.parse(savedData);
                console.log("Loaded community data:", parsedData);
                setCommunityData(parsedData);
            } else {
                console.log("No saved data found in localStorage");
            }
        } catch (error) {
            console.error(
                "Error loading community data from localStorage:",
                error
            );
        } finally {
            setLoading(false);
        }
    }, []);

    // Validate and format data before sending to API
    const prepareDataForAPI = (data) => {
        // Ensure arrays are properly formatted
        const preparedData = {
            ...data,
            commTypeCategory: Array.isArray(data.commTypeCategory)
                ? data.commTypeCategory
                : data.commTypeCategory
                ? [data.commTypeCategory]
                : [],
            contentShared: Array.isArray(data.contentShared)
                ? data.contentShared
                : data.contentShared
                ? [data.contentShared]
                : [],
            communityGoal: Array.isArray(data.communityGoal)
                ? data.communityGoal
                : data.communityGoal
                ? [data.communityGoal]
                : [],
        };

        // Remove any undefined or null values
        Object.keys(preparedData).forEach((key) => {
            if (
                preparedData[key] === undefined ||
                preparedData[key] === null ||
                preparedData[key] === ""
            ) {
                delete preparedData[key];
            }
        });

        console.log("Prepared data for API:", preparedData);
        return preparedData;
    };

    const handleSubmit = async () => {
        console.log("Submit button clicked");
        console.log("Community data:", communityData);
        console.log("Token:", token ? "Present" : "Missing");

        if (!communityData) {
            console.log("No community data found");
            toast.error(
                "No community data found. Please complete the form first."
            );
            return;
        }

        if (!token) {
            console.log("No token found");
            toast.error("Authentication required. Please log in.");
            return;
        }

        setFormLoading(true);

        try {
            // Prepare data for API
            const preparedData = prepareDataForAPI(communityData);

            console.log("Calling createCommunity with:", preparedData);
            const response = await createCommunity(preparedData, token);

            console.log("createCommunity response:", response);

            // Simplified success check
            if (response && response.success === true) {
                console.log("Community created successfully");
                toast.success(
                    response.message || "Community created successfully!"
                );

                // Optional: Log the created community ID
                if (response.record && response.record.id) {
                    console.log("Created community ID:", response.record.id);
                }

                localStorage.removeItem("communityFormData");
                router.push("/user");
            } else {
                console.log("API returned error:", response);
                // Handle API error response
                const errorMessage =
                    response?.error ||
                    "Error creating community. Please try again.";
                toast.error(errorMessage);

                // Log full error for debugging
                if (response?.fullError) {
                    console.log("Full error details:", response.fullError);
                }

                // If it's an auth error, redirect to login
                if (
                    response?.statusCode === 401 ||
                    response?.statusCode === 403
                ) {
                    console.log("Authentication error, redirecting to login");
                    router.push("/login");
                }
            }
        } catch (error) {
            console.error("Unexpected error in handleSubmit:", error);
            toast.error("An unexpected error occurred. Please try again.");
        } finally {
            console.log("Setting formLoading to false");
            setFormLoading(false);
        }
    };

    if (loading) {
        return <div>Loading preview data...</div>;
    }

    if (!communityData) {
        return (
            <div className='list-preview'>
                <div>
                    No community data found. Please go back and complete the
                    form.
                </div>
                <Link href='/user/list-community'>
                    <button>Go Back to Form</button>
                </Link>
            </div>
        );
    }

    return (
        <div className='list-preview'>
            <div>Preview</div>
            <br />

            <div className='edit-network-details__banner'></div>
            <br />

            <div className='list-preview__grid'>
                <div>Name:</div>
                <div>{communityData.name || "Not provided"}</div>

                <div>Description:</div>
                <div>{communityData.description || "Not provided"}</div>

                <div>Category:</div>
                <div>{communityData.communityType || "Not provided"}</div>

                <div>Subcategory:</div>
                <div>
                    {Array.isArray(communityData.commTypeCategory)
                        ? communityData.commTypeCategory.join(", ")
                        : communityData.commTypeCategory || "Not provided"}
                </div>

                <div>Community size:</div>
                <div>{communityData.size || "Not provided"}</div>

                <div>Location:</div>
                <div>
                    {communityData.location}
                    {communityData.state ? `, ${communityData.state}` : ""}
                </div>

                <div>Contact information:</div>
                <div>{communityData.phone || "Not provided"}</div>
            </div>

            <div className='list-preview__divider'></div>

            <div className='list-preview__grid'>
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
                            alt='Free'
                        />
                    ) : (
                        communityData.accessType || "Not provided"
                    )}
                </div>

                <div>Communication platform:</div>
                <div className='list-preview__grid__socials'>
                    <div>
                        {communityData.communicationPlatform || "Not provided"}
                    </div>
                </div>

                <div>Engagement level:</div>
                <div>{communityData.engagementLevel || "Not provided"}</div>

                <div>Post frequency:</div>
                <div className='list-preview__grid__socials'>
                    <div>
                        {communityData.frequency
                            ? `${communityData.frequency} days/week`
                            : "Not provided"}
                    </div>
                </div>
            </div>

            <div className='list-preview__divider'></div>

            <div className='list-preview__grid'>
                <div>Content shared:</div>
                <div className='list-preview__grid__socials'>
                    <div>
                        {Array.isArray(communityData.contentShared)
                            ? communityData.contentShared.join(", ")
                            : communityData.contentShared || "Not provided"}
                    </div>
                </div>

                <div>Communities interest:</div>
                <div>{communityData.communityInterest || "Not provided"}</div>

                <div>Access requirements:</div>
                <div>{communityData.accessType || "Not provided"}</div>

                <div>Link to community:</div>
                <div>{communityData.website || "Not provided"}</div>

                <div>Interaction type:</div>
                <div className='list-preview__grid__socials'>
                    <div>
                        {Array.isArray(communityData.communityGoal)
                            ? communityData.communityGoal.join(", ")
                            : communityData.communityGoal || "Not provided"}
                    </div>
                </div>

                <div>Special achievements:</div>
                <div>{communityData.recognition || "Not provided"}</div>

                <div>Additional services:</div>
                <div>{communityData.additionalService || "Not provided"}</div>

                <div>Unique selling points:</div>
                <div>{communityData.usp || "Not provided"}</div>

                <div>Email:</div>
                <div>{communityData.email || "Not provided"}</div>

                <div>WhatsApp:</div>
                <div>{communityData.whatsapp || "Not provided"}</div>

                <div>Telegram:</div>
                <div>{communityData.telegram || "Not provided"}</div>

                <div>Twitter:</div>
                <div>{communityData.twitter || "Not provided"}</div>
            </div>

            {/* Debug information - remove in production */}
            <div
                style={{
                    marginTop: "20px",
                    padding: "10px",
                    backgroundColor: "#f5f5f5",
                    fontSize: "12px",
                }}
            >
                <strong>Debug Info:</strong>
                <div>Token present: {token ? "Yes" : "No"}</div>
                <div>Data present: {communityData ? "Yes" : "No"}</div>
                <div>Form loading: {formLoading ? "Yes" : "No"}</div>
            </div>

            <button
                onClick={handleSubmit}
                disabled={formLoading}
                style={{
                    opacity: formLoading ? 0.6 : 1,
                    cursor: formLoading ? "not-allowed" : "pointer",
                }}
            >
                {formLoading ? "Creating Community..." : "List Community"}
            </button>
        </div>
    );
}
