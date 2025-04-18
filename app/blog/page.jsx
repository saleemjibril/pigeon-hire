import Image from "next/image";
import LandingHeader from "../components/landingHeader";
import BlogCard from "../components/blogCard";
import Footer from "../components/footer";
import ArticleCard from "../components/articleCard";

export default function Blogs() {
  return (
    <div className="blogs">
      <LandingHeader />
      <div className="blogs__inner">
        <div className="blogs__inner__title-group">
          <div>Blog</div>
          <div>
            Insights, stories, and strategies to help you connect, grow, and
            thrive in today’s networked world.
          </div>
        </div>

        <div className="blogs__inner__form">
          <input type="text" placeholder="Enter your email" />
          <button>Subscribe</button>
        </div>

        <div className="blogs__inner__cards">
          <BlogCard image={"/assets/blog1.png"} />
          <BlogCard image={"/assets/blog2.png"} />
          <BlogCard image={"/assets/blog1.png"} />
          <BlogCard image={"/assets/blog2.png"} />
        </div>

        <div className="blogs__inner__article-title">
          <div>Articles</div>

          <div className="blogs__inner__article-title__navigation">
            <Image
              alt=""
              width={24}
              height={24}
              src={"/assets/icons/outlineLeftArrow.svg"}
            />
            <Image
              alt=""
              width={24}
              height={24}
              src={"/assets/icons/outlineRightArrow.svg"}
            />
          </div>
        </div>

        <div className="blogs__inner__articles">
          <ArticleCard
            title={"Mistakes Brands Make When Approaching Online Communities"}
            subtitle={
              "Before you post or pitch, read this. These common missteps can make or break your brand’s relationship with online groups."
            }
          />
          <ArticleCard
            title={
              "Pigeonhire Behind the Scenes: Building a Community-First Platform"
            }
            subtitle={
              "A transparent look at how Pigeonhire is designed with real user needs, discovery behavior, and trust at its core."
            }
          />
          <ArticleCard
            title={"Community-Led vs. Product-Led Growth: Which Wins?"}
            subtitle={
              "Discover the difference between these two growth strategies and why community-led might be the smarter choice."
            }
          />
           <ArticleCard
            title={"Mistakes Brands Make When Approaching Online Communities"}
            subtitle={
              "Before you post or pitch, read this. These common missteps can make or break your brand’s relationship with online groups."
            }
          />
          <ArticleCard
            title={
              "Pigeonhire Behind the Scenes: Building a Community-First Platform"
            }
            subtitle={
              "A transparent look at how Pigeonhire is designed with real user needs, discovery behavior, and trust at its core."
            }
          />
          <ArticleCard
            title={"Community-Led vs. Product-Led Growth: Which Wins?"}
            subtitle={
              "Discover the difference between these two growth strategies and why community-led might be the smarter choice."
            }
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
