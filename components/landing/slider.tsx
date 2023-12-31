'use client'
import React, { FC, useMemo, useRef } from "react";
import { Autoplay, Lazy, Navigation, Pagination } from "swiper";
import { SwiperProps } from "swiper/react";
import { Swiper } from "@/components/common/Swiper";
import Icon from "@/components/common/Icon";
import { slide  } from "@/lib/types";
import Image from "@/components/common/Image";
import Link from "@/components/common/Link";
import AspectRatio from "@/components/common/aspectRatio";
import { Maybe } from "@/lib/types/mainService";
import { isServer } from "@/lib/utils/utils-functions";


import SSRContent from "./SSRSlider"

type SliderT = {
    images: Maybe<Maybe<slide>[]>;
    width: number
    height: number
};
const Slider: FC<SliderT> = ({ images, width, height }) => {
    const swiperRef = useRef() as any;
    const swiperConfig: SwiperProps = useMemo(() => {
        return {
            modules: [Pagination, Autoplay, Lazy, Navigation],
            lazy: true,
            slidesPerView: "auto",
            autoplay: {
                delay: 6000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            pagination: {
                clickable: true,
                renderBullet: function (index, className) {
                    return "<span class=" + className + "></span>";
                },
            },
        };
    }, []);

    return (
        <div className="group relative">
            <Swiper
                SSRContent={isServer ? <SSRContent  images={images} /> : null}
                {...swiperConfig}
                className="swiper-pagination-new"
                onBeforeInit={(swiper) => {
                    swiperRef.current = swiper;
                }}>
                {images?.map((item, index) => (
                    <div className="!w-full bg-black" key={item?.image}>
                        <Link href={item?.link ?? ""} target="_blank">
                            <AspectRatio aspect={height/width}>
                                <Image
                                    src={item?.image ?? ""}
                                    alt={item?.description?? ""}
                                    title={item?.title ?? ""}
                                    layout="fill"
                                    style={{ objectFit: "cover" }}
                                    className="object-cover opacity-90"
                                    width={width}
                                    height={height}
                                    priority={index === 0}
                                />
                            </AspectRatio>
                        </Link>
                    </div>
                ))}
            </Swiper>
            {/*<div className=" absolute bottom-8 right-[1%] z-10 hidden  items-end gap-2 duration-75 lg:flex lg:opacity-0 lg:group-hover:opacity-100">*/}
            {/*    <Icon*/}
            {/*        name="play"*/}
            {/*        color="fill-white"*/}
            {/*        size=" w-[60px] h-[60px]"*/}
            {/*        onClick={() => swiperRef.current?.slidePrev()}*/}
            {/*    />*/}
            {/*    <Icon*/}
            {/*        name="play"*/}
            {/*        color="fill-white"*/}
            {/*        className={"rotate-180"}*/}
            {/*        size=" w-[60px] h-[60px]"*/}
            {/*        onClick={() => swiperRef.current?.slideNext()}*/}
            {/*    />*/}
            {/*</div>*/}
        </div>
    );
};
export default Slider;