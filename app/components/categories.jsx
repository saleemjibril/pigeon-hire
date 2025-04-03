import Link from "next/link";

export default function Categories() {
    return (
        <div className="categories">
            <div className="categories__title">Explore by categories</div>
            <div className="categories__cards">
                <Link href={"/user/category"}>Arts & Culture</Link>
                <Link href={"/user/category"}>Social & Community</Link>
                <Link href={"/user/category"}>Creative & Expressive</Link>
                <Link href={"/user/category"}>Health & Wellness</Link>
                <Link href={"/user/category"}>Technology & Science</Link>
                <Link href={"/user/category"}>Lifestyles & Hobbies</Link>
                <Link href={"/user/category"}>Business Technology</Link>
                <Link href={"/user/category"}>Business & Finance</Link>
                <Link href={"/user/category"}>Entertainment & Leisure</Link>
                <Link href={"/user/category"}>Environment & Sustainability</Link>
                <Link href={"/user/category"}>Special Interest</Link>
                <Link href={"/user/category"}>Education & Learning</Link>
            </div>
        </div>
    )
}