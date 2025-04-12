import ListCommunityDetails from "@/app/components/listCommunityDetails";
import ListConnectorDetails from "@/app/components/listConnectorDetails";

export default function ListCommunity (params) {
    return (
        <div className="list-community">
        <div className="list-community__title">
        List a Community
            </div>
       <ListConnectorDetails />
        </div>
    )
}