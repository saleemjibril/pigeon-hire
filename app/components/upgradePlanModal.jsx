import Image from "next/image";
import { useState } from "react";
import UpgradeModalPay from "./upgradePlanModalPay";

export default function UpgradeModal({ open, setOpen }) {
  const [payOpen, setPayOpen] = useState(false);
  
  const handleClose = (e) => {
    if (e.target.classList.contains("upgrade-plan-modal")) {
      setOpen(false);
    }
  };

  return (
    open && (
      <div className="upgrade-plan-modal" onClick={handleClose}>
        <div className="upgrade-plan-modal__inner">
          <div className="upgrade-plan-modal__inner__title">Upgrade plan</div>

          <select name="" id="">
            <option value="">United state dollar ($)</option>
          </select>
          <div
            className="upgrade-plan-modal__inner__card"
            onClick={() => setPayOpen(true)}
          >
            <div className="upgrade-plan-modal__inner__card__title-group">
              <div>Essential plan</div>
              <div>Monthly subscription</div>
            </div>
            <div className="upgrade-plan-modal__inner__card__price-group">
              <div>$3.61</div>
              <Image
                alt=""
                width={32}
                height={32}
                src={"/assets/icons/planArrowRight.svg"}
                className="pointer"
              />
            </div>
          </div>
          <div
            className="upgrade-plan-modal__inner__card"
            onClick={() => setPayOpen(true)}
          >
            <div className="upgrade-plan-modal__inner__card__title-group">
              <div>Premier plan</div>
              <div>Yearly subscription</div>
            </div>
            <div className="upgrade-plan-modal__inner__card__price-group">
              <div>$30.32</div>
              <Image
                alt=""
                width={32}
                height={32}
                src={"/assets/icons/planArrowRight.svg"}
                className="pointer"
              />
            </div>
          </div>
          <div
            className="upgrade-plan-modal__inner__card"
            onClick={() => setPayOpen(true)}
          >
            <div className="upgrade-plan-modal__inner__card__title-group">
              <div>Pro plan</div>
              <div>6-months subscription</div>
            </div>
            <div className="upgrade-plan-modal__inner__card__price-group">
              <div>$18.41</div>
              <Image
                alt=""
                width={32}
                height={32}
                src={"/assets/icons/planArrowRight.svg"}
                className="pointer"
              />
            </div>
          </div>
        </div>

        <UpgradeModalPay open={payOpen} setOpen={setPayOpen} />
      </div>
    )
  );
}
