import ManageNetworkTable from "@/app/components/manageNetworkTable";
import Image from "next/image";

export default function ManageNetwork() {
  return (
    <div className="manage-network">
      <div className="manage-network__cards">
        <div className="manage-network__cards__card">
          <Image
            src={"/assets/icons/communities.svg"}
            width={36}
            height={36}
            alt=""
          />
          <div className="manage-network__cards__card__group">
            <div>Total Communities</div>
            <div className="manage-network__cards__card__number">4</div>
          </div>
        </div>
        <div className="manage-network__cards__card">
            <Image
              src={"/assets/icons/profileView.svg"}
              width={36}
              height={36}
              alt=""
            />
          <div className="manage-network__cards__card__group">
            <div>Total Profile view</div>
          <div className="manage-network__cards__card__number-mini">1200</div>
          </div>
        </div>
        <div className="manage-network__cards__card">
            <Image
              src={"/assets/icons/profileView.svg"}
              width={36}
              height={36}
              alt=""
            />
          <div className="manage-network__cards__card__group">
            <div>Total Contact click</div>
          <div className="manage-network__cards__card__number-mini">500</div>
          </div>
        </div>
      </div>

      <div className="manage-network__title">My Networks</div>
      <ManageNetworkTable />
    </div>
  );
}
