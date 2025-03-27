import ConnectorCard from "./connectorCard";

export default function ConnectorsAndCommunities() {
  return (
    <div className="connectors-and-communities">
      <div className="connectors-and-communities__tabs">
        <div className="connectors-and-communities__tabs__active">
          Latest Connectors
        </div>
        <div>Latest Communities</div>
      </div>

      <ConnectorCard verified={true} />
      <ConnectorCard verified={false} />

      <div className="connectors-and-communities__title">All</div>
      <ConnectorCard verified={false} />
         <ConnectorCard verified={true} />
         <ConnectorCard verified={true} />
         <ConnectorCard verified={true} />
         <ConnectorCard verified={false} />
         <ConnectorCard verified={true} />
         <ConnectorCard verified={true} />
         <ConnectorCard verified={true} />
         <ConnectorCard verified={false} />
         <ConnectorCard verified={true} />
         <ConnectorCard verified={true} />
         <ConnectorCard verified={false} />
     
    </div>
  );
}
