import Image from "next/image";
import SearchIcon from "./searchIcon";

export default function Search({text, setText}) {
    return (
        <div className="search">
            <SearchIcon fill="#8D8D8D" />
            <input type="text" placeholder="Search by name"
            value={text}
            onChange={(e) => setText(e.target.value)}
            />

            <Image className="search__close" alt="" width={24} height={24} src={"/assets/icons/close.svg"} />

            <div className="search__line"></div>

            <select name="" id="">
                <option value="">All</option>
            </select>
        </div>
    )
}
