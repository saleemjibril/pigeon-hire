import NavigationDirectory from "@/app/components/navigationDirectory";

export default function EditNetworkDetails() {
  return (
    <div className="edit-network-details">
      <NavigationDirectory
        links={[
          {
            name: "Home",
            link: "/user",
          },
          {
            name: "Start entrepreneurship hub ",
            link: "/",
          },
          {
            name: "Edit",
          },
        ]}
      />

      <div className="edit-network-details__banner"></div>

      <div className="edit-network-details__banner-button">Edit</div>

      <form action="">
      <label htmlFor="">Name</label>
      <input type="text" />
      <label htmlFor="">Description</label>
      <textarea name="" id=""></textarea>
      <div className="edit-network-details__input-grid">
        <div>
          <label htmlFor="">Category</label>
          <select name="" id="">
            <option value=""></option>
          </select>
        </div>
        <div>
          <label htmlFor="">Location</label>
          <select name="" id="">
            <option value=""></option>
          </select>
        </div>
        <div>
          <label htmlFor="">Facilitator</label>
          <select name="" id="">
            <option value=""></option>
          </select>
        </div>
        <div>
          <label htmlFor="">Facilitator</label>
          <select name="" id="">
            <option value=""></option>
          </select>
        </div>
      </div>
      <label htmlFor="">Contact information</label>
      <input type="text" />
      <label htmlFor="">Connection type</label>
      <select name="" id="">
        <option value=""></option>
      </select>
      <label htmlFor="">Created</label>
      <select name="" id="">
        <option value=""></option>
      </select>
      <label htmlFor="">Price tag</label>
      <select name="" id="">
        <option value=""></option>
      </select>
      <label htmlFor="">Communication platform</label>
      <select name="" id="">
        <option value=""></option>
      </select>
      <label htmlFor="">Engagement level</label>
      <select name="" id="">
        <option value=""></option>
      </select>
      <label htmlFor="">Post frequency</label>
      <select name="" id="">
        <option value=""></option>
      </select>
      <label htmlFor="">Communities interest</label>
      <select name="" id="">
        <option value=""></option>
      </select>
      <label htmlFor="">Access requirements:</label>
      <select name="" id="">
        <option value=""></option>
      </select>
      <label htmlFor="">Link to community:</label>
      <input type="text" />
      <label htmlFor="">Interaction type:</label>
      <select name="" id="">
        <option value=""></option>
      </select>
      <label htmlFor="">Special achievements:</label>
      <textarea name="" id=""></textarea>
      <label htmlFor="">Additional services:</label>
      <textarea name="" id=""></textarea>

      <button>Save Changes</button>
      </form>
    </div>
  );
}
