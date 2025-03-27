import Image from "next/image";

export default function ConnectorCard({verified}) {
  return (
    <div className="connector-card">
      <div className="connector-card__user">
        <div className="connector-card__image"></div>
        <div>
          <div className="connector-card__category">Category: Business</div>
          <div className="connector-card__title">Fola Agoro</div>
          <div className="connector-card__position">
            Senior buyer at Coca-Cola
          </div>
          <Image
            alt=""
            width={53}
            height={18}
            src={"/assets/icons/connector.svg"}
            className="connector-card__role"
          />
        </div>
      </div>

      <div className="connector-card__date-group">
        {verified ? <Image
          alt=""
          width={60}
          height={24}
          src={"/assets/icons/verified.svg"}
          className="connector-card__role"
        /> : <Image
        alt=""
        width={60}
        height={24}
        src={"/assets/icons/publicRecord.svg"}
        className="connector-card__role"
      />}

        <div className="connector-card__date">March 12</div>
      </div>
    </div>
  );
}
