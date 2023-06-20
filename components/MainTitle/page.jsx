export default function MainTitle({ title, description }) {
    return (
        <>
            <div className="main-title p-6">
                <h1 className="text-red-500 text-3xl font-bold">
                    {title}
                </h1>
                <p className="pt-5">{description}</p>
            </div>
        </>
    );
}
