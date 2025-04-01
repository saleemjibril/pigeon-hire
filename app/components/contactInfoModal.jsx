import Image from "next/image";

export default function ContactInfoModal({open, setOpen}) {
  return (
    open && 
    <div className="contact-info-modal">
      <div className="contact-info-modal__inner">
        <div className="contact-info-modal__inner__title-group">
          <div>Contact Information</div>

          <Image
            alt=""
            width={24}
            height={24}
            src={"/assets/icons/close.svg"}
            onClick={() => setOpen(false)}
            className="pointer"
          />
        </div>

        <div className="contact-info-modal__inner__grid">
          <div>Email</div>
          <div>Folaagoro@gmail.com</div>
          <div>Phone number</div>
          <div>+351 20578902</div>
          <div>LinkedIn:</div>
          <div>URL</div>
          <div>Instagram:</div>
          <div>URL</div>
          <div>X:</div>
          <div>URL</div>
          <div>WhatsApp:</div>
          <div>URL</div>
          <div>Other:</div>
          <div>URL</div>
        </div>
      </div>
    </div>
  );
}
