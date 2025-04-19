import Link from "next/link";

export default function Connect() {
    return (
         <div className="landing__connect">
                <div className="landing__connect__inner">
        
                <div className="landing__connect__inner__title">
                  Pigeonhire connects people and organizations to growth leads.
                </div>
                <div className="landing__connect__inner__subtitle">
                  Join Pigeonhire today to easily access the right communities and key
                  contacts, expanding your reach and growing your network.
                </div>
                <div className="landing__connect__inner__button-group">
          <Link href="/register" prefetch={true}>Sign Up</Link>
          <Link href="/user" prefetch={true}>Browse Networks</Link>
        </div>
                </div>
              </div>
    )
}