import Image from "next/image";
import Link from "next/link";
import { extractMonthDay } from "../utils/formatDate";

export default function ConnectorCard({type, verified, title, subtitle, members, id, date}) {
  return (
    <Link href={type === "community" ? `/user/community/${id}` : `/user/connector/${id}`} className="connector-card">
      <div className="connector-card__user">
        <div className="connector-card__image"></div>
        <div>
          <div className="connector-card__category">Category: Business</div>
          <div className="connector-card__title">{title}</div>
          <div className="connector-card__position">
            {subtitle}
          </div>
          {members && <div className="connector-card__members">
            Members: {members}
          </div>}
          <Image
            alt=""
            width={53}
            height={18}
            src={type === "community" ? "/assets/icons/communityIndicator.svg" : "/assets/icons/connector.svg"}
            className="connector-card__role"
          />
        </div>
      </div>

      <div className="connector-card__date-group">
        {verified ? <Image
          alt=""
          width={94}
          height={24}
          src={"/assets/icons/verified.svg"}
          className="connector-card__role"
        /> : <Image
        alt=""
        width={89}
        height={24}
        src={"/assets/icons/publicRecord.svg"}
        className="connector-card__role"
      />}

        <div className="connector-card__date">{extractMonthDay(date)}</div>
      </div>
    </Link>
  );
}
