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
    communityFavoriteChecker,
    favoriteCommunity,
    getCommunities,
    getCommunity,
    removeFavoriteCommunity,
} from "../apis/community";

import { createLead } from "../apis/lead";
import { useSelector } from "react-redux";

export default function CommunityDetails() {
    const { userInfo, token } = useSelector((state) => state.auth);
    console.log("userInfo", userInfo);

    const [subscribed, setSubscribed] = useState(false);
    const [save, setSave] = useState(false);
    const [open, setOpen] = useState(false);
    const [communities, setCommunities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    const { id } = useParams();
    const [community, setCommunity] = useState(null);

    const handleGetConnector = async () => {
        try {
            const response = await getCommunity(id);
            console.log("getCommunity", response);
            setCommunity(response?.data);
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
            const response = await getCommunities();
            console.log("getCommunities", response);
            setCommunities(response?.data?.communities);
        } catch (error) {
            console.log("Error fetching communities:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleGetConnector();
        handleGetCommunities();
        handleCheckCommunityFavorite();
    }, []);

    const handleFavoriteCommunity = async () => {
        try {
            const response = await favoriteCommunity(
                userInfo?.user?.id,
                id,
                token
            );
            console.log("favoriteCommunity response", response);

            // Then create a lead
            const leadData = {
                userId: userInfo?.user?.id,
                communityId: id,
                leadType: "community",
                notes: `User saved ${community?.name} as favorite community`,
                followUpDate: new Date(
                    Date.now() + 7 * 24 * 60 * 60 * 1000
                ).toISOString(), // 7 days from now
            };

            const leadResponse = await createLead(leadData, token);
            console.log("createLead response", leadResponse);

            console.log("userInfo", response);
            toast.success(response?.data?.msg);
            handleCheckCommunityFavorite();
        } catch (error) {
          //Unable to add community to favorites. Please try again.
            console.log("Error adding community to favorites or creating lead:", error);
            toast.error(
                error?.response?.data?.msg ||
                    "Unable to add community to favorites. Please try again."
            );
        }
    };

    const handleRemoveFavoriteCommunity = async () => {
        console.log("isFavorite", isFavorite);

        try {
            const response = await removeFavoriteCommunity(
                userInfo?.user?.id,
                id,
                token
            );
            console.log("removeFavoriteCommunity", response);
            toast.success(response?.data?.msg);
            handleCheckCommunityFavorite();
        } catch (error) {
            console.log("Error adding community to favorites:", error);
            toast.error(
                error?.response?.data?.msg ||
                    "Unable to add community to favorites. Please try again."
            );
        }
    };

    const handleCheckCommunityFavorite = async () => {
        const response = await communityFavoriteChecker(
            userInfo?.user?.id,
            id,
            token
        );

        console.log("communityFavoriteChecker", response);
        setIsFavorite(response?.data?.isFavorite);
    };

    return (
        <>
            <div className='community__card-cover'>
                <div className='community__card'>
                    <div className='connector-card__image'></div>

                    <div className='community__card__middle'>
                        <div className='community__card__name'>
                            <div>Name:</div>
                            <div>{community?.name}</div>
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
                            <div>{community?.description}</div>
                        </div>
                        <div className='community__card__community-size'>
                            <div>Role:</div>
                            <div>{community?.description}</div>
                            <div>Location:</div>
                            <div>{community?.location}</div>
                            <div>Category:</div>
                            <div>
                                {Array.isArray(community?.commTypeCategory)
                                    ? community?.commTypeCategory.join(", ")
                                    : community?.commTypeCategory ||
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

                    {/* Save community as favorite and create as lead*/}
                    <div
                        className='community__card__save pointer'
                        onClick={
                            isFavorite
                                ? handleRemoveFavoriteCommunity
                                : handleFavoriteCommunity
                        }
                    >
                        <Image
                            src={
                                isFavorite
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
                        Community Details
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
                            <div>Community type:</div>
                            <div>{community?.communityType}</div>
                            <div>Created:</div>
                            <div>21st of January 2025</div>
                            <div>Price tag:</div>
                            <div>
                                {" "}
                                <Image
                                    src={
                                        community?.accessType === "free"
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
                                {community?.facebook && (
                                    <div
                                        onClick={() =>
                                            window.open(
                                                `https://facebook.com/${
                                                    community?.facebook.startsWith(
                                                        "@"
                                                    )
                                                        ? community?.facebook.substring(
                                                              1
                                                          )
                                                        : community?.facebook
                                                }`
                                            )
                                        }
                                    >
                                        Facebook
                                    </div>
                                )}
                                {community?.instagram && (
                                    <div
                                        onClick={() =>
                                            window.open(
                                                `https://instagram.com/${
                                                    community?.instagram.startsWith(
                                                        "@"
                                                    )
                                                        ? community?.instagram.substring(
                                                              1
                                                          )
                                                        : community?.instagram
                                                }`
                                            )
                                        }
                                    >
                                        Instagram
                                    </div>
                                )}
                                {community?.twitter && (
                                    <div
                                        onClick={() =>
                                            window.open(
                                                `https://twitter.com/${
                                                    community?.twitter.startsWith(
                                                        "@"
                                                    )
                                                        ? community?.twitter.substring(
                                                              1
                                                          )
                                                        : community?.twitter
                                                }`
                                            )
                                        }
                                    >
                                        Twitter
                                    </div>
                                )}
                                {community?.telegram && (
                                    <div
                                        onClick={() =>
                                            window.open(
                                                `https://t.me/${
                                                    community?.telegram.startsWith(
                                                        "@"
                                                    )
                                                        ? community?.telegram.substring(
                                                              1
                                                          )
                                                        : community?.telegram
                                                }`
                                            )
                                        }
                                    >
                                        Telegram
                                    </div>
                                )}
                                {community?.linkedIn && (
                                    <div
                                        onClick={() =>
                                            window.open(
                                                `https://linkedin.com/in/${
                                                    community?.linkedIn.startsWith(
                                                        "@"
                                                    )
                                                        ? community?.linkedIn.substring(
                                                              1
                                                          )
                                                        : community?.linkedIn
                                                }`
                                            )
                                        }
                                    >
                                        Linkedin
                                    </div>
                                )}
                            </div>
                            <div>Special achievements:</div>
                            <div>{community?.recognition}</div>
                            <div>Additional services:</div>
                            <div>{community?.additionalService}</div>
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
                <CommunityRatings
                    communityId={community?.id}
                    averageRating={community?.rating}
                />
            )}
            {!subscribed && (
                <>
                    <div className='community__related-communities'>
                        Related communities
                    </div>

                    {communities?.map((community) => (
                        <ConnectorCard
                            type='community'
                            verified={true}
                            title={community?.name}
                            subtitle={community?.description}
                            members={"500"}
                            id={community?.id}
                            key={community?.id}
                            date={community?.createdAt}
                        />
                    ))}
                </>
            )}

            <ContactInfoModal open={open} setOpen={setOpen} />
        </>
    );
}
