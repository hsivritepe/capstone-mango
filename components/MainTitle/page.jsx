import Link from 'next/link';

export default function MainTitle({
    title,
    description,
    icon,
    button,
    buttonText,
    buttonLink,
}) {
    return (
        <>
            <div className="main-title p-6 flex justify-between">
                <div>
                    <h1 className="text-red-500 text-3xl font-bold">
                        {title}
                    </h1>
                    <p className="pt-5">{description}</p>
                </div>
                {button && (
                    <Link
                        href={buttonLink}
                        className="btn btn-secondary"
                    >
                        {icon} {buttonText}
                    </Link>
                )}
            </div>
        </>
    );
}
