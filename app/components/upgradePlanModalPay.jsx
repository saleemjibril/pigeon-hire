import Image from "next/image";

export default function UpgradeModalPay({ open, setOpen }) {
  // const [open, setOpen] = useState("");

  return (
    open && (
      <div className="upgrade-plan-modal">
        <div className="upgrade-plan-modal__inner">
          <div className="upgrade-plan-modal__inner__title-group">
            <div>Upgrade plan</div>

            <Image
              alt=""
              width={32}
              height={32}
              src={"/assets/icons/close.svg"}
              className="pointer"
              onClick={() => setOpen(false)}
            />
          </div>

          <div className="upgrade-plan-modal__inner__plan-card">
            <div className="upgrade-plan-modal__inner__plan-card__title-group">
              <div>Essential plan</div>
              <div>$120 / monthly</div>
            </div>
              <li>Unlimited access to the full</li>
              <li>database.</li>
              <li>
                Full database access with intelligent matchmaking and insights.
              </li>
              <li>Vetted connections.</li>
              <li>Quality ratings.</li>
              <li>Advanced search.</li>
          </div>

          <div className="upgrade-plan-modal__inner__button-group">
            <button>
              <Image
                alt=""
                width={16}
                height={16}
                src={"/assets/icons/paystack.svg"}
                className="pointer"
              />
              Paystack
            </button>
            <button>Stripe</button>
          </div>
        </div>
      </div>
    )
  );
}
