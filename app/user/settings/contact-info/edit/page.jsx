import Image from "next/image";

export default function SettingsContact() {
  return (
    <div className="settings-contact">
        <div className="settings-contact__inner">

        <form action="">
            <label htmlFor="">Name</label>
            <select name="" id="">
                <option value="">select requirement</option>
            </select>
            <label htmlFor="">Email Address</label>
            <input type="email" placeholder="enter email" />
            <label htmlFor="">Phone Number</label>
            <input type="email" placeholder="enter phone number" />
            <label htmlFor="">Contact Address</label>
            <input type="email" placeholder="enter address" />
            <label htmlFor="">Country</label>
            <select name="" id="">
                <option value="">select country</option>
            </select>
            <label htmlFor="">State</label>
            <select name="" id="">
                <option value="">enter state</option>
            </select>
        </form>
        </div>

            <div className="settings-contact__button-group">
                <button>Cancel</button>
                <button>Save changes</button>
            </div>
    </div>
  );
}
