import NavigationDirectory from "@/app/components/navigationDirectory";
import Image from "next/image";

export default function ManageNetworkDetails() {
  return (
      <div className="list-preview">
         <div>Preview</div>
         <br />
          
                <div className="edit-network-details__banner"></div>
<br />
                <div className="list-preview__grid">
                <div>Name:</div>
<div>Startup & Entrepreneurship Hub</div>
<div>Description:</div>
<div>Connect with investors, founders & startup enthusiasts, get funding insights & networking opportunities. Helping founders, investors, and innovators connect and grow.</div>
<div>Category:</div>
<div>Business</div>
<div>Facilitator:</div>
<div>Adekoye Grace</div>
<div>Community size:</div>
<div>500</div>
<div>Location:</div>
<div>New York</div>
<div>Contact information:</div>
<div>+315</div>
</div>
<div className="list-preview__divider"></div>
<div className="list-preview__grid">
<div>Connection type:</div>
<div>Startup and Entrepreneur Networks</div>
<div>Created:</div>
<div>21 Jan 2025</div>
<div>Price tag:</div>
<div> <Image
                      src={"/assets/icons/free.svg"}
                      width={55}
                      height={34}
                      alt=""
                    /></div>
<div>Communication platform:</div>
<div className="list-preview__grid__socials"><div>Facebook</div>
<div>Twitter</div>
<div>Telegram</div></div>
<div>Engagement level:</div>
<div>Active participation</div>
<div>Post frequency:</div>
<div className="list-preview__grid__socials">
<div>7days/week</div>
</div>
</div>
<div className="list-preview__divider"></div>
<div className="list-preview__grid">

<div>Content shared:</div>
<div className="list-preview__grid__socials">
<div>Articles and blog posts</div>
<div>Discussion threads</div>
</div>
<div>Communities interest:</div>
<div>Entrepreneurship / Startups</div>
<div>Access requirements:</div>
<div>Membership fee</div>
<div>Link to community:</div>
<div>URL</div>
<div>Interaction type:</div>
<div className="list-preview__grid__socials">
<div>Growth</div>
<div>Networking</div>
</div>
<div>Special achievements:</div>
<div>24 awards</div>
<div>Additional services:</div>
<div>Exclusive content</div>
                </div>
          
          <button>List</button>
      </div>
  )
}