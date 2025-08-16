"use client";

import Image from "next/image";
import { useState } from "react";
import CommunityRatings from "./communityRatings";
import ConnectorCard from "./connectorCard";
import ContactInfoModal from "./contactInfoModal";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import {
    getConnector,
    getConnectors,
    favoriteConnector,
    favoriteConnectorGeneric,
    connectorFavoriteChecker,
    removeFavoriteConnector,
} from "@/app/apis/connector";
import { createLead } from "../apis/lead";
import { useSelector } from "react-redux";
import ConnectorRatings from "./connectorRatings";

export default function ConnectorDetails() {
    const { userInfo, token } = useSelector((state) => state.auth);
    console.log("userInfo", userInfo);

    const [subscribed, setSubscribed] = useState(false);
    const [save, setSave] = useState(false);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [connectors, setConnectors] = useState([]);
    const [isFavorite, setIsFavorite] = useState(false);

    const { id } = useParams();
    const [connector, setConnector] = useState(null);

    const handleGetConnector = async () => {
        try {
            const response = await getConnector(id);
            console.log("getConnector", response);
            setConnector(response?.data);
        } catch (error) {
            console.log("Error creating community:", error);
            toast.error(
                error?.response?.data?.msg ||
                    "Error getting connector. Please try again."
            );
        }
    };

    const handleGetCommunities = async () => {
        setLoading(true);
        try {
            const response2 = await getConnectors();
            console.log("getConnectors", response2);
            setConnectors(response2?.data?.connectors);
        } catch (error) {
            console.log("Error fetching communities:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleFavoriteConnector = async () => {
        try {
            console.log("Step 1: Adding to favorites...");
            const favoriteResponse = await favoriteConnector(
                userInfo?.user?.id,
                id,
                token
            );
            console.log("Favorite added successfully:", favoriteResponse);

            console.log("Step 2: Creating lead...");
            const leadData = {
                userId: userInfo?.user?.id,
                connectorId: id,
                leadType: "connector",
                notes: `User saved ${connector?.firstName} ${connector?.lastName} as favorite connector`,
                followUpDate: new Date(
                    Date.now() + 7 * 24 * 60 * 60 * 1000
                ).toISOString(),
            };

            const leadResponse = await createLead(leadData, token);
            console.log("Lead created successfully:", leadResponse);

            toast.success("Connector saved successfully!");
            handleCheckConnectorFavorite();
        } catch (error) {
            console.error("Detailed error:", error);
            console.error("Error response:", error.response?.data);

            toast.error(
                error?.response?.data?.message ||
                    error?.response?.data?.msg ||
                    "Unable to add connector to favorites. Please try again."
            );
        }
    };

    const handleRemoveFavoriteConnector = async () => {
        try {
            const response = await removeFavoriteConnector(
                userInfo?.user?.id,
                id,
                token
            );
            console.log("removeFavoriteConnector", response);
            toast.success(
                response?.data?.msg || "Connector removed from favorites!"
            );
            handleCheckConnectorFavorite();
        } catch (error) {
            console.log("Error removing connector from favorites:", error);
            toast.error(
                error?.response?.data?.msg ||
                    "Unable to remove connector from favorites. Please try again."
            );
        }
    };

    const handleCheckConnectorFavorite = async () => {
        try {
            const response = await connectorFavoriteChecker(
                userInfo?.user?.id,
                id,
                token
            );
            console.log("connectorFavoriteChecker", response);
            setIsFavorite(response?.data?.isFavorite);
        } catch (error) {
            console.log("Error checking connector favorite status:", error);
        }
    };

    useEffect(() => {
        handleGetConnector();
        handleGetCommunities();
        handleCheckConnectorFavorite();
    }, []);

    return (
        <>
            <div className='community__card-cover'>
                <div className='community__card'>
                    <div className='connector-card__image'></div>

                    <div className='community__card__middle'>
                        <div className='community__card__name'>
                            <div>Name:</div>
                            <div>
                                {connector?.firstName} {connector?.lastName}
                            </div>
                            <Image
                                alt=''
                                width={60}
                                height={24}
                                src={"/assets/icons/verified.svg"}
                                className='connector-card__role'
                            />
                        </div>
                        <div className='community__card__description'>
                            <div>Description:</div>
                            <div>{connector?.description}</div>
                        </div>
                        <div className='community__card__connector-size'>
                            <div>Role:</div>
                            <div>{connector?.description}</div>
                            <div>Location:</div>
                            <div>{connector?.community?.location}</div>
                            <div>Category:</div>
                            <div>
                                {Array.isArray(
                                    connector?.community?.commTypeCategory
                                )
                                    ? connector?.community?.commTypeCategory.join(
                                          ", "
                                      )
                                    : connector?.community?.commTypeCategory ||
                                      "Not provided"}
                            </div>
                        </div>
                        {subscribed && (
                            <button
                                className='community__card__contact'
                                onClick={() => setOpen(true)}
                            >
                                Contact
                            </button>
                        )}
                    </div>

                    {/* Save connector as favorite and create as lead*/}
                    <div
                        className='community__card__save pointer'
                        onClick={
                            isFavorite
                                ? handleRemoveFavoriteConnector
                                : handleFavoriteConnector
                        }
                    >
                        <Image
                            onMouseEnter={() => setSave(true)}
                            onMouseLeave={() => setSave(false)}
                            src={
                                save
                                    ? "/assets/icons/saveFilled.svg"
                                    : "/assets/icons/save.svg"
                            }
                            width={32}
                            height={32}
                            alt=''
                        />
                        Save
                    </div>
                </div>
                <div className='community__divider'></div>
                <div className='community__details'>
                    <div className='community__details__dropdown'>
                        Connector Details
                        {!subscribed && (
                            <Image
                                src={"/assets/icons/arrowDownStroke.svg"}
                                width={24}
                                height={24}
                                alt=''
                            />
                        )}
                    </div>

                    {subscribed && (
                        <div className='community__details__grid'>
                            <div>Connection type:</div>
                            <div>{connector?.connectionType}</div>
                            <div>Created:</div>
                            <div>21st of January 2025</div>
                            <div>Price tag:</div>
                            <div>
                                {" "}
                                <Image
                                    src={
                                        connector?.community?.accessType ===
                                        "free"
                                            ? "/assets/icons/free.svg"
                                            : ""
                                    }
                                    width={46}
                                    height={21}
                                    alt=''
                                />
                            </div>
                            <div>Communication platform:</div>
                            <div className='community__details__grid__platforms'>
                                {connector?.facebook && (
                                    <div
                                        onClick={() =>
                                            window.open(
                                                `https://facebook.com/${
                                                    connector?.facebook.startsWith(
                                                        "@"
                                                    )
                                                        ? connector?.facebook.substring(
                                                              1
                                                          )
                                                        : connector?.facebook
                                                }`
                                            )
                                        }
                                    >
                                        Facebook
                                    </div>
                                )}
                                {connector?.instagram && (
                                    <div
                                        onClick={() =>
                                            window.open(
                                                `https://instagram.com/${
                                                    connector?.instagram.startsWith(
                                                        "@"
                                                    )
                                                        ? connector?.instagram.substring(
                                                              1
                                                          )
                                                        : connector?.instagram
                                                }`
                                            )
                                        }
                                    >
                                        Instagram
                                    </div>
                                )}
                                {connector?.twitter && (
                                    <div
                                        onClick={() =>
                                            window.open(
                                                `https://twitter.com/${
                                                    connector?.twitter.startsWith(
                                                        "@"
                                                    )
                                                        ? connector?.twitter.substring(
                                                              1
                                                          )
                                                        : connector?.twitter
                                                }`
                                            )
                                        }
                                    >
                                        Twitter
                                    </div>
                                )}
                                {connector?.telegram && (
                                    <div
                                        onClick={() =>
                                            window.open(
                                                `https://t.me/${
                                                    connector?.telegram.startsWith(
                                                        "@"
                                                    )
                                                        ? connector?.telegram.substring(
                                                              1
                                                          )
                                                        : connector?.telegram
                                                }`
                                            )
                                        }
                                    >
                                        Telegram
                                    </div>
                                )}
                                {connector?.linkedIn && (
                                    <div
                                        onClick={() =>
                                            window.open(
                                                `https://linkedin.com/in/${
                                                    connector?.linkedIn.startsWith(
                                                        "@"
                                                    )
                                                        ? connector?.linkedIn.substring(
                                                              1
                                                          )
                                                        : connector?.linkedIn
                                                }`
                                            )
                                        }
                                    >
                                        Linkedin
                                    </div>
                                )}
                            </div>
                            <div>Special achievements:</div>
                            <div>{connector?.community?.recognition}</div>
                            <div>Additional services:</div>
                            <div>{connector?.community?.additionalService}</div>
                        </div>
                    )}

                    {!subscribed && (
                        <>
                            <button
                                className='community__details__button'
                                onClick={() => setSubscribed(true)}
                            >
                                Subscribe to view
                            </button>

                            <div className='community__details__info'>
                                Subscribe to connect with the community owner
                            </div>
                        </>
                    )}
                </div>
            </div>

            {subscribed && (
                <ConnectorRatings
                    connectorId={connector?.id}
                    averageRating={connector?.rating}
                />
            )}
            {!subscribed && (
                <>
                    <div className='community__related-communities'>
                        Related connectors
                    </div>

                    {connectors?.map((connector) => (
                        <ConnectorCard
                            type='connector'
                            verified={true}
                            title={connector?.communityName}
                            subtitle={connector?.description}
                            members={"500"}
                            id={connector?.id}
                            key={connector?.id}
                            date={connector?.createdAt}
                        />
                    ))}
                </>
            )}

            <ContactInfoModal open={open} setOpen={setOpen} />
        </>
    );
}
