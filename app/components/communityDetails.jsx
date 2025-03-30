"use client";

import Image from "next/image";
import { useState } from "react";
import CommunityRatings from "./communityRatings";
import ConnectorCard from "./connectorCard";

export default function CommunityDetails() {
  const [subscribed, setSubscribed] = useState(false);
  const [save, setSave] = useState(false);

  return (
    <>
      <div className="community__card-cover">
        <div className="community__card">
          <div className="connector-card__image"></div>

          <div className="community__card__middle">
            <div className="community__card__name">
              <div>Name:</div>
              <div>Startup & Entrepreneurship Hub</div>
              <Image
                alt=""
                width={60}
                height={24}
                src={"/assets/icons/verified.svg"}
                className="connector-card__role"
              />
            </div>
            <div className="community__card__description">
              <div>Description:</div>
              <div>
                Connect with investors, founders & startup enthusiasts, get
                funding insights & networking opportunities. Helping founders,
                investors, and innovators connect and grow.
              </div>
            </div>
            <div className="community__card__community-size">
              <div>Community size:</div>
              <div>500 active members</div>
              <div>Location:</div>
              <div>New York</div>
            </div>
            <div className="community__card__community-size">
              <div>Facilitator:</div>
              {subscribed ? (
                <div>Adekoye Grace</div>
              ) : (
                <div
                  className="community__card__community-size__subscribe pointer"
                  onClick={() => setSubscribed(true)}
                >
                  {" "}
                  <Image
                    alt=""
                    width={24}
                    height={24}
                    src={"/assets/icons/lightningGrey.svg"}
                  />
                  Subscribe to view
                </div>
              )}

              <div>Category:</div>
              <div>Business</div>
            </div>

            {subscribed && (
              <button className="community__card__contact">Contact</button>
            )}
          </div>

          <div className="community__card__save pointer">
            <Image
            onMouseEnter={() => setSave(true)}
            onMouseLeave={() => setSave(false)}
              src={save ? "/assets/icons/saveFilled.svg" : "/assets/icons/save.svg"}
              width={32}
              height={32}
              alt=""
            />
            Save
          </div>
        </div>
            <div className="community__divider"></div>
            <div className="community__details">
              <div className="community__details__dropdown">
                Community Details
                {!subscribed && (
                  <Image
                    src={"/assets/icons/arrowDownStroke.svg"}
                    width={24}
                    height={24}
                    alt=""
                  />
                )}
              </div>

              {subscribed && (
                <div className="community__details__grid">
                  <div>Connection type:</div>
                  <div>Startup and Entrepreneur Networks</div>
                  <div>Created:</div>
                  <div>21st of January 2025</div>
                  <div>Price tag:</div>
                  <div>
                    {" "}
                    <Image
                      src={"/assets/icons/free.svg"}
                      width={46}
                      height={21}
                      alt=""
                    />
                  </div>
                  <div>Communication platform:</div>
                  <div className="community__details__grid__platforms">
                    <div>Facebook</div>
                    <div>Twitter</div>
                    <div>Telegram</div>
                  </div>
                  <div>Engagement level:</div>
                  <div>Active Participation</div>
                  <div>Post frequency:</div>
                  <div className="community__details__grid__platforms">
                    <div>7days/week</div>
                  </div>
                </div>
              )}

              {!subscribed && (
                <>
                  <button
                    className="community__details__button"
                    onClick={() => setSubscribed(true)}
                  >
                    Subscribe to view
                  </button>

                  <div className="community__details__info">
                    Subscribe to connect with the community owner
                  </div>
                </>
              )}
            </div>

            {subscribed && <>
                <br />
            <div className="community__divider"></div>

            <div className="community__details">
              <div className="community__details__dropdown">
                Community Insights
              </div>
              <div className="community__details__grid">
                <div>Content shared:</div>
                <div className="community__details__grid__platforms">
                  <div>Articles and blog posts</div>
                  <div>Discussion threads</div>
                </div>
                <div>Communities interest: </div>
                <div>Entrepreneurship / Startups</div>
                <div>Access requirements::</div>
                <div>Membership fee</div>
                <div>Link to community:</div>
                <div>URL</div>
                <div>Interaction type:</div>
                <div className="community__details__grid__platforms">
                  <div>Growth</div>
                  <div>Networking</div>
                </div>
                <div>Special achievements:</div>
                <div>24 awards</div>
                <div>Additional services:</div>
                <div>Exclusive content</div>
              </div>
            </div> 
            </>}
      </div>

      {subscribed && <CommunityRatings />}
      {!subscribed && (
        <>
          <div className="community__related-communities">
            Related communities
          </div>

          <ConnectorCard
            verified={true}
            title={"Startup & Entrepreneurship Hub"}
            subtitle={
              "Connect with investors, founders & startup enthusiasts. Get funding insights & networking opportunities."
            }
            members={"500"}
          />
          <ConnectorCard
            verified={true}
            title={"Startup & Entrepreneurship Hub"}
            subtitle={
              "Connect with investors, founders & startup enthusiasts. Get funding insights & networking opportunities."
            }
            members={"500"}
          />
          <ConnectorCard
            verified={false}
            title={"Startup & Entrepreneurship Hub"}
            subtitle={
              "Connect with investors, founders & startup enthusiasts. Get funding insights & networking opportunities."
            }
            members={"500"}
          />
          <ConnectorCard
            verified={true}
            title={"Startup & Entrepreneurship Hub"}
            subtitle={
              "Connect with investors, founders & startup enthusiasts. Get funding insights & networking opportunities."
            }
            members={"500"}
          />
        </>
      )}
    </>
  );
}
