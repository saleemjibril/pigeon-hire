"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ConnectorCard from "./connectorCard";

export default function CategoryInner() {
  const [tab, setTab] = useState("connectors");

  return (
    <div className="category__inner">
      <div className="category__inner__tabs">
        <div
          className={tab === "connectors" && "category__inner__tabs__active"}
          onClick={() => setTab("connectors")}
        >
          Connectors for Content & Copywriting
        </div>
        <div
          className={tab === "communities" && "category__inner__tabs__active"}
          onClick={() => setTab("communities")}
        >
          Communities for Content & Copywriting
        </div>
      </div>

    {tab === "connectors" && <>
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
        verified={true}
        title={"Fola Agoro"}
        subtitle={"Senior buyer at Coca-Cola"}
      />
      <ConnectorCard
        verified={false}
        title={"Fola Agoro"}
        subtitle={"Senior buyer at Coca-Cola"}
      />
    </>}

    {tab === "communities" && <>
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
      <ConnectorCard
        verified={false}
        title={"Startup & Entrepreneurship Hub"}
        subtitle={
          "Connect with investors, founders & startup enthusiasts. Get funding insights & networking opportunities."
        }
        members={"500"}
      />
    </>}

    </div>
  );
}
