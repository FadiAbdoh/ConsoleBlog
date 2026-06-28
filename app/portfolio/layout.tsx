

export default function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <h1 className='uppercase font-bold text-[35px] md:text-[45px] text-center'>Our works</h1>
            {children}
        </>
    )
}