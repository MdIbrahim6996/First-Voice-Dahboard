import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";


const Carousel = ({ children }: { children: React.ReactNode }) => {
    const [current, setCurrent] = useState(0);
    const total = React.Children.count(children);

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? total - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrent((prev) => (prev === total - 1 ? 0 : prev + 1));
    };

   

    return (
        <div className="relative w-full max-w-x overflow-hidden rounded-2xl shadow-lg h-[98vh]">
            <div
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {React.Children.map(children, (child) => (
                    <div className="w-full shrink-0 h-full">{child}</div>
                ))}
            </div>

            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow-2xl"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow"
            >
                <ChevronRight className="w-6 h-6" />
            </button>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {Array.from({ length: total }).map((_, index) => (
                    <div
                        key={index}
                        className={`w-3 h-3 rounded-full ${
                            index === current ? "bg-white" : "bg-white/50"
                        }`}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
