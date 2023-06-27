import React, { useState } from 'react';
import Image from 'next/image';

export default function HomeImages() {
    const [previewIndex, setPreviewIndex] = useState(null);
    const [showPreview, setShowPreview] = useState(false);

    const handleImageClick = (index) => {
        setPreviewIndex(index);
        setShowPreview(true);
    };

    const handlePreviewClose = () => {
        setShowPreview(false);
    };

    const handleNextClick = () => {
        if (previewIndex !== null && previewIndex < 53) {
            setPreviewIndex(previewIndex + 1);
        }
    };

    const handlePrevClick = () => {
        if (previewIndex !== null && previewIndex > 11) {
            setPreviewIndex(previewIndex - 1);
        }
    };

    const images = [];

    for (let i = 11; i < 54; i++) {
        const imageSrc = `/img/villa/villa${i}.jpg`; // Replace with the actual image path

        images.push(
            <div key={i} className="relative">
                <Image
                    src={imageSrc}
                    alt={`Image ${i}`}
                    width={350} // Adjust width and height according to your needs
                    height={150}
                    className="transition-all duration-300 transform hover:scale-105 cursor-pointer"
                    onClick={() => handleImageClick(i)}
                />
            </div>
        );
    }

    const isPrevDisabled =
        previewIndex === null || previewIndex <= 11;
    const isNextDisabled =
        previewIndex === null || previewIndex >= 53;

    return (
        <div>
            <div className="flex flex-wrap gap-4">{images}</div>

            {showPreview && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
                    <div className="relative">
                        <Image
                            src={`/img/villa/villa${previewIndex}.jpg`} // Replace with the actual image path
                            alt={`Preview Image ${previewIndex}`}
                            width={800} // Adjust width and height according to your needs
                            height={600}
                        />
                        <div className="absolute top-1/2 left-2 transform -translate-y-1/2">
                            <button
                                className="text-white text-2xl bg-red-500/75 rounded-full px-2 py-1 flex items-center justify-center"
                                onClick={handlePrevClick}
                                disabled={isPrevDisabled}
                            >
                                &#8249;{' '}
                                {/* Unicode character for left arrow */}
                            </button>
                        </div>
                        <div className="absolute top-1/2 right-2 transform -translate-y-1/2">
                            <button
                                className="text-white text-2xl bg-red-500/75 rounded-full px-2 py-1 flex items-center justify-center"
                                onClick={handleNextClick}
                                disabled={isNextDisabled}
                            >
                                &#8250;{' '}
                                {/* Unicode character for right arrow */}
                            </button>
                        </div>
                        <button
                            className="absolute top-2 right-2 text-white text-xl bg-red-500/75 rounded-full py-1 px-3"
                            onClick={handlePreviewClose}
                        >
                            x
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
