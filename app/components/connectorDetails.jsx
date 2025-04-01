"use client";

import Image from "next/image";
import { useState } from "react";
import CommunityRatings from "./communityRatings";
import ConnectorCard from "./connectorCard";
import ContactInfoModal from "./contactInfoModal";

export default function ConnectorDetails() {
  const [subscribed, setSubscribed] = useState(false);
  const [save, setSave] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="community__card-cover">
        <div className="community__card">
          <div className="connector-card__image"></div>

          <div className="community__card__middle">
            <div className="community__card__name">
              <div>Name:</div>
              <div>Fola Agoro</div>
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
              Hi, I’m Fola Agoro, a Senior Buyer at Coca-Cola with extensive experience in procurement and supply chain management. I specialize in sourcing, contract negotiation, and supplier relations within the FMCG industry. Whether you're looking to break into corporate supply chains or secure high-value procurement deals, I can provide insights, guidance, and connections to help you succeed.
              </div>
            </div>
            <div className="community__card__connector-size">
              <div>Role:</div>
              <div>Senior buyer at Coca-Cola</div>
              <div>Location:</div>
              <div>New York</div>
              <div>Category:</div>
              <div>Business</div>
            </div>
            {subscribed && (
              <button className="community__card__contact"
              onClick={() => setOpen(true)}
              >Contact</button>
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
                Connector Details
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
                  <div>Special achievements:</div>
                  <div>24 awards</div>
                  <div>Additional services:</div>
                  <div>Exclusive content</div>
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

        
      </div>

      {subscribed && <CommunityRatings />}
      {!subscribed && (
        <>
          <div className="community__related-communities">
            Related connectors
          </div>

         <ConnectorCard
                 verified={true}
                 title={"Fola Agoro"}
                 subtitle={"Senior buyer at Coca-Cola"}
               />
               <ConnectorCard
                       verified={false}
                       title={"Fola Agoro"}
                       subtitle={"Senior buyer at Coca-Cola"}
                     />
                     <ConnectorCard
                             verified={false}
                             title={"Fola Agoro"}
                             subtitle={"Senior buyer at Coca-Cola"}
                           />
                           <ConnectorCard
                                   verified={true}
                                   title={"Fola Agoro"}
                                   subtitle={"Senior buyer at Coca-Cola"}
                                 />
        </>
      )}

<ContactInfoModal open={open} setOpen={setOpen} />

    </>
  );
}
