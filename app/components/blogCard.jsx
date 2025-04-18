import Image from "next/image";
import Link from "next/link";

export default function BlogCard({image}) {
    return (
         <Link href="/blog/1" className="blogs__inner__cards__card">
                  <div className="blogs__inner__cards__card__image">
                  <Image
                                alt=""
                                width={644}
                                height={413}
                                src={image}
                              />
                    <div className="blogs__inner__cards__card__image__caption">
                      <div className="blogs__inner__cards__card__image__caption__title">
                        <div>Ejemen Roluga</div>
                        <div>12 mins read</div>
                      </div>
                      <div className="blogs__inner__cards__card__image__caption__date">
                        14 Apr 2025
                      </div>
                    </div>
                  </div>
        
                  <div className="blogs__inner__cards__card__title">
                  Updates and Features: What’s New on Pigeonhire
                  </div>
                  <div className="blogs__inner__cards__card__subtitle">
                  We’ve been busy behind the scenes making Pigeonhire even better. In this post, we break down the latest updates, new features, and user improvements that... <span>Read More</span>
                  </div>
                </Link>
    )
}