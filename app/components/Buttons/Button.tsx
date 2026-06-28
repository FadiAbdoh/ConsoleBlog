import Link from "next/link";


type ButtonType = {
    text: string,
    url: string,
    padding?: number,
}

export default function Button({ text, url, padding = 15}: ButtonType) {
    return (
        <Link href={url}>
            <button 
            className={`p-[${padding}px] md:p-[15px] bg-[#2e8b57] capitalize text-white cursor-pointer rounded-[5px] max-w-max font-semibold hover:bg-[#42a373] transition-colors`}>
                {text}
            </button>
        </Link>
    )
}