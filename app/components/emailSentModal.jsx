import Image from "next/image";
import Link from "next/link";

export default function EmailSentModal({open, setOpen}) {
  return (
    open && 
    <div className="email-sent-modal">
      <div className="email-sent-modal__inner">
        <div className="email-sent-modal__inner__close">
          <Image alt="" src={"/assets/icons/close.svg"} width={24} height={24} />
        </div>

        <div className="email-sent-modal__inner__correct">
          <Image alt="" src={"/assets/icons/correct.svg"} width={42} height={42} />
        </div>

        <div className="email-sent-modal__inner__title">
          Confirmation Code Sent!
        </div>
        <div className="email-sent-modal__inner__subtitle">
          A four (4) digit code has been sent to your registered email address
        </div>

        <Link href="/verify-forgot-password"> <button>Continue</button></Link>
      </div>
    </div>
  );
}
