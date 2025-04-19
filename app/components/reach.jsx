import Image from "next/image";

export default function Reach() {
  return (
    <div className="reach" id="contact">
      <div className="reach__inner">
        <div className="reach__inner__title">Reach out to us</div>

        <form action="">
          <label htmlFor="fullName">Full name</label>
          <div className="auth__form__input" style={{ maxWidth: "100%", marginBottom: "32px" }}>
            <input type="text" name="fullName" placeholder="e.g John Doe" />
            <Image
              alt=""
              width={24}
              height={24}
              src={"/assets/icons/user.svg"}
            />
          </div>

          <label htmlFor="email">Email address</label>

          <div className="auth__form__input" style={{ maxWidth: "100%", marginBottom: "32px" }}>
            <input type="email" name="email" placeholder="e.g John Doe" />
            <Image
              alt=""
              width={24}
              height={24}
              src={"/assets/icons/email.svg"}
            />
          </div>
          <label htmlFor="email">Message</label>

          <textarea name="" id="" placeholder="enter your message"></textarea>

          <button>Send message</button>
        </form>
      </div>{" "}
    </div>
  );
}
