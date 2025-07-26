"use client"
import Image from "next/image";
import { getSubscriptionPlans } from "../apis/subscription";
import { useEffect } from "react";
import { useSelector } from "react-redux";



export default function PricingInner() {
    const {token} = useSelector((state) => state.auth);

    const handlGetPlans = async () => {
        const response = await getSubscriptionPlans(token);
    
        console.log("getSubscriptionPlans", response);
        // setIsFavorite(response?.data?.isFavorite);
    }
    
    useEffect(() => {
        handlGetPlans();
    }, [])
    return (
        <>
            <select name="" id="">
                <option value="">United state dollar ($)</option>
            </select>
            <div className="pricing__inner__cards">
                <div className="pricing__inner__cards__card">
                    <div className="pricing__inner__cards__card__title">Essential plan</div>
                    <div className="pricing__inner__cards__card__title-group">
                        <div>$3.61</div>
                        <div>Monthly subscription</div>
                    </div>

                    <div className="pricing__inner__cards__card__subtitle">
                        Perfect for users needing flexibility or those testing the
                        platform's capabilities
                    </div>

                    <button>Choose plan</button>

                    <div className="pricing__inner__cards__card__features-title">Features</div>

                    <div className="pricing__inner__cards__card__features-grid">
                        <Image
                            alt=""
                            width={24}
                            height={24}
                            src={"/assets/icons/tick.svg"}
                        />
                        <div>Unlimited access to the full database.</div>
                        <Image
                            alt=""
                            width={24}
                            height={24}
                            src={"/assets/icons/tick.svg"}
                        />
                        <div>
                            Full database access with intelligent matchmaking and insights
                        </div>
                        <Image
                            alt=""
                            width={24}
                            height={24}
                            src={"/assets/icons/tick.svg"}
                        />
                        <div>Vetted connections</div>
                        <Image
                            alt=""
                            width={24}
                            height={24}
                            src={"/assets/icons/tick.svg"}
                        />
                        <div>Quality ratings</div>
                        <Image
                            alt=""
                            width={24}
                            height={24}
                            src={"/assets/icons/tick.svg"}
                        />
                        <div>Advanced search</div>
                    </div>
                </div>
                <div className="pricing__inner__cards__card">
                    <div className="pricing__inner__cards__card__title">
                        <div>Premier plan</div>

                        <Image
                            alt=""
                            width={64}
                            height={24}
                            src={"/assets/icons/popular.svg"}
                        />
                    </div>
                    <div className="pricing__inner__cards__card__title-group">
                        <div>$30.32</div>
                        <div>Yearly subscription</div>
                    </div>

                    <div className="pricing__inner__cards__card__subtitle">
                        Designed for committed users,
                        this plan offers substantial
                        savings for a medium-term
                        strategy.
                    </div>

                    <button>Choose plan</button>

                    <div className="pricing__inner__cards__card__features-title">Features</div>

                    <div className="pricing__inner__cards__card__features-grid">
                        <Image
                            alt=""
                            width={24}
                            height={24}
                            src={"/assets/icons/tick.svg"}
                        />
                        <div>Save 15% per month</div>
                        <Image
                            alt=""
                            width={24}
                            height={24}
                            src={"/assets/icons/tick.svg"}
                        />
                        <div>
                            Unlimited access to the full database.
                        </div>
                        <Image
                            alt=""
                            width={24}
                            height={24}
                            src={"/assets/icons/tick.svg"}
                        />
                        <div>Full database access with intelligent matchmaking and insights</div>
                        <Image
                            alt=""
                            width={24}
                            height={24}
                            src={"/assets/icons/tick.svg"}
                        />
                        <div>Vetted connections</div>
                        <Image
                            alt=""
                            width={24}
                            height={24}
                            src={"/assets/icons/tick.svg"}
                        />
                        <div>Quality ratings</div>
                        <Image
                            alt=""
                            width={24}
                            height={24}
                            src={"/assets/icons/tick.svg"}
                        />
                        <div>Advanced search</div>
                    </div>
                </div>
                <div className="pricing__inner__cards__card">
                    <div className="pricing__inner__cards__card__title">Pro plan</div>
                    <div className="pricing__inner__cards__card__title-group">
                        <div>$18.41</div>
                        <div>6-months subscription</div>
                    </div>

                    <div className="pricing__inner__cards__card__subtitle">
                        Designed for committed users, offering significant
                        savings over 6 months
                    </div>

                    <button>Choose plan</button>

                    <div className="pricing__inner__cards__card__features-title">Features</div>

                    <div className="pricing__inner__cards__card__features-grid">
                        <Image
                            alt=""
                            width={24}
                            height={24}
                            src={"/assets/icons/tick.svg"}
                        />
                        <div>Save 30% per month</div>
                        <Image
                            alt=""
                            width={24}
                            height={24}
                            src={"/assets/icons/tick.svg"}
                        />
                        <div>
                            Unlimited access to the full
                            database.
                        </div>
                        <Image
                            alt=""
                            width={24}
                            height={24}
                            src={"/assets/icons/tick.svg"}
                        />
                        <div>Full database access with intelligent matchmaking and insights</div>
                        <Image
                            alt=""
                            width={24}
                            height={24}
                            src={"/assets/icons/tick.svg"}
                        />
                        <div>Vetted connections</div>
                        <Image
                            alt=""
                            width={24}
                            height={24}
                            src={"/assets/icons/tick.svg"}
                        />
                        <div>Quality ratings</div>
                        <Image
                            alt=""
                            width={24}
                            height={24}
                            src={"/assets/icons/tick.svg"}
                        />
                        <div>Advanced search</div>
                    </div>
                </div>
            </div>
        </>
    )
}