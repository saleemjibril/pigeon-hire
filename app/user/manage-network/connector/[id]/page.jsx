import NavigationDirectory from "@/app/components/navigationDirectory";
import Image from "next/image";

export default function ManageNetworkDetails() {
  return (
    <div className="manage-network-details">
      <NavigationDirectory
        links={[
          {
            name: "Home",
            link: "/user",
          },
          {
            name: "Start entrepreneurship hub ",
            link: "/",
          },
          {
            name: "View",
          },
        ]}
      />

      <div className="edit-network-details__banner"></div>
      <br />
      <div className="manage-network-details__grid">
        <div>Name:</div>
        <div>Fola Agoro</div>
        <div>Description:</div>
        <div>
          Hi, I’m Fola Agoro, a Senior Buyer at Coca-Cola with extensive
          experience in procurement and supply chain management. I specialize in
          sourcing, contract negotiation, and supplier relations within the FMCG
          industry. Whether you're looking to break into corporate supply chains
          or secure high-value procurement deals, I can provide insights,
          guidance, and connections to help you succeed.
        </div>
        <div>Category:</div>
        <div>Business</div>
        <div>Role:</div>
        <div>Senior buyer at Coca-Cola</div>
        <div>Location:</div>
        <div>Lagos, Nigeria</div>
        <div>Contact information:</div>
        <div>+315</div>
      </div>
      <div className="manage-network-details__divider"></div>
      <div className="manage-network-details__grid">
        <div>Connection type:</div>
        <div>Startup and Entrepreneur Networks</div>
        <div>Created:</div>
        <div>21 Jan 2025</div>
        <div>Price tag:</div>
        <div>
          {" "}
          <Image src={"/assets/icons/free.svg"} width={55} height={34} alt="" />
        </div>
        <div>Communication platform:</div>
        <div className="manage-network-details__grid__socials">
          <div>Facebook</div>
          <div>Twitter</div>
          <div>Telegram</div>
        </div>
        <div>Special achievements:</div>
        <div>24 awards</div>
        <div>Additional services:</div>
        <div>Exclusive content</div>
      </div>
    </div>
  );
}
