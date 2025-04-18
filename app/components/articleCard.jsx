import Image from "next/image";
import Link from "next/link";

export default function ArticleCard({title, subtitle}) {
    return (
      <Link href="/blog/1" className="blogs__inner__articles__card">
      <Image
                                     alt=""
                                     width={421}
                                     height={203}
                                     src={"/assets/blog3.png"}
                                   />
     <div className="blogs__inner__articles__card__title">
      {title}
     </div>
     <div className="blogs__inner__articles__card__subtitle">
      {subtitle}
     </div>
     <div className="blogs__inner__articles__card__read">
     Read
      <Image
                 alt=""
                 width={24}
                 height={24}
                 src={"/assets/icons/read.svg"}
               />
     </div>
 </Link>
    )
}