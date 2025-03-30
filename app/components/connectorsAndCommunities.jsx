"use client";
import { useState } from "react";
import ConnectorCard from "./connectorCard";

export default function ConnectorsAndCommunities() {
  const [tab, setTab] = useState("connectors");
  return (
    <div className="connectors-and-communities">
      <div className="connectors-and-communities__tabs">
        <div
          className={
            tab === "connectors" && "connectors-and-communities__tabs__active"
          }
          onClick={() => setTab("connectors")}
        >
          Latest Connectors
        </div>
        <div
          className={
            tab === "communities" && "connectors-and-communities__tabs__active"
          }
          onClick={() => setTab("communities")}
        >
          Latest Communities
        </div>
      </div>

      {tab === "connectors" &&  <>
      <ConnectorCard
        verified={true}
        title={"Fola Agoro"}
        subtitle={"Senior buyer at Coca-Cola"}
      />
      <ConnectorCard
        verified={true}
        title={"Fola Agoro"}
        subtitle={"Senior buyer at Coca-Cola"}
      />
     </>}

     {tab === "communities" && (
        <>
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
          <ConnectorCard
            verified={false}
            title={"Startup & Entrepreneurship Hub"}
            subtitle={
              "Connect with investors, founders & startup enthusiasts. Get funding insights & networking opportunities."
            }
            members={"500"}
          />
        </>
      )}

      <div className="connectors-and-communities__title">All</div>
     {tab === "connectors" &&  <>
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
     </>}

      {tab === "communities" && (
        <>
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
            verified={false}
            title={"Startup & Entrepreneurship Hub"}
            subtitle={
              "Connect with investors, founders & startup enthusiasts. Get funding insights & networking opportunities."
            }
            members={"500"}
          />
        </>
      )}
    </div>
  );
}
