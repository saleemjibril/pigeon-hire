import Image from "next/image";
import ConnectorCard from "./connectorCard";

export default function SearchResults() {
  return (
    <div className="search-results">
      <div className="search-results__not-found">
        <Image
          alt=""
          width={120}
          height={120}
          src={"/assets/icons/notFound.svg"}
        //   onClick={() => setOpen(false)}
          className="pointer"
        />

        <div className="search-results__not-found__title">Not Found</div>
        <div className="search-results__not-found__subtitle">
          Sorry, we couldn't find any results matching your search criteria.
        </div>
      </div>

      <div className="search-results__like">
      <div className="search-results__like__title">
      You may like
        </div>
        <ConnectorCard
          type="connector"
        verified={true}
        title={"Fola Agoro"}
        subtitle={"Senior buyer at Coca-Cola"}
      />

 <ConnectorCard
          type="community"
            verified={false}
            title={"Startup & Entrepreneurship Hub"}
            subtitle={
              "Connect with investors, founders & startup enthusiasts. Get funding insights & networking opportunities."
            }
            members={"500"}
          />
        <ConnectorCard
          type="connector"
        verified={true}
        title={"Fola Agoro"}
        subtitle={"Senior buyer at Coca-Cola"}
      />

 <ConnectorCard
          type="community"
            verified={false}
            title={"Startup & Entrepreneurship Hub"}
            subtitle={
              "Connect with investors, founders & startup enthusiasts. Get funding insights & networking opportunities."
            }
            members={"500"}
          />
        <ConnectorCard
          type="connector"
        verified={true}
        title={"Fola Agoro"}
        subtitle={"Senior buyer at Coca-Cola"}
      />

 <ConnectorCard
          type="community"
            verified={false}
            title={"Startup & Entrepreneurship Hub"}
            subtitle={
              "Connect with investors, founders & startup enthusiasts. Get funding insights & networking opportunities."
            }
            members={"500"}
          />

      </div>
    </div>
  );
}
