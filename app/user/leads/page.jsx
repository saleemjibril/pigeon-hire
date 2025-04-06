import LeadsTable from "@/app/components/leadsTable";
import ManageNetworkTable from "@/app/components/manageNetworkTable";
import Image from "next/image";

export default function ManageNetwork() {
  return (
    <div className="leads">
      <div className="leads__cards">
        <div className="leads__cards__card">
          <Image
            src={"/assets/icons/communities.svg"}
            width={36}
            height={36}
            alt=""
          />
          <div className="leads__cards__card__group">
            <div>Saved Communities</div>
            <div className="leads__cards__card__number">4</div>
          </div>
        </div>
        <div className="leads__cards__card">
            <Image
              src={"/assets/icons/savedConnectors.svg"}
              width={36}
              height={36}
              alt=""
            />
          <div className="leads__cards__card__group">
            <div>Saved Connectors</div>
          <div className="leads__cards__card__number-mini">1200</div>
          </div>
        </div>
        <div className="leads__cards__card">
            <Image
              src={"/assets/icons/totalContacted.svg"}
              width={36}
              height={36}
              alt=""
            />
          <div className="leads__cards__card__group">
            <div>Total contacted</div>
          <div className="leads__cards__card__number-mini">500</div>
          </div>
        </div>
        <div className="leads__cards__card">
            <Image
              src={"/assets/icons/profilesViewed.svg"}
              width={36}
              height={36}
              alt=""
            />
          <div className="leads__cards__card__group">
            <div>Total profile viewed</div>
          <div className="leads__cards__card__number-mini">500</div>
          </div>
        </div>
      </div>

      <div className="leads__title">My Leads</div>
      <LeadsTable />
    </div>
  );
}
