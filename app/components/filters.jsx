import Image from "next/image";

export default function Filters() {
  return (
    <div className="filters">
        <div className="filters__inner">

      <div className="filters__all">
        <Image
          alt=""
          width={16}
          height={16}
          src={"/assets/icons/controls.svg"}
        />
        All filters
      </div>
      <div className="filters__item">Connectors</div>
      <div className="filters__item">Connectors</div>
      <div className="filters__item">Connectors</div>
      <div className="filters__item">Connectors</div>
      <div className="filters__item">
        Connectors
        <Image
          alt=""
          width={16}
          height={16}
          src={"/assets/icons/arrowDown.svg"}
        />
      </div>
      <div className="filters__item">
        Connectors
        <Image
          alt=""
          width={16}
          height={16}
          src={"/assets/icons/arrowDown.svg"}
        />
      </div>
      <div className="filters__item">Connectors</div>
      <div className="filters__item">Connectors</div>
      <div className="filters__item">Connectors</div>
      <div className="filters__item">Connectors</div>
        </div>
    </div>
  );
}
