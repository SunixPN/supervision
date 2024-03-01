import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import Block from "../../Home/Blog/Block/Block"
import "swiper/css"
import styles from "./Slider.module.scss"

const Slider = ({ news }) => {
    return (
        <div className={styles.slider}>
            <div className="wrapper">
                <h2 className={styles.title}>Похожие новости</h2>
                <Swiper
                modules={[Navigation]}
                navigation={{
                    prevEl: ".swiper-prev",
                    nextEl: ".swiper-next"
                }}
                spaceBetween={10}
                slidesPerView={"auto"}
                >
                    {
                        news.map(newsPaper =>  
                            <SwiperSlide key={newsPaper.newsId}>
                                <div className={styles.wrapper}>
                                    <Block news={newsPaper} />
                                </div>
                            </SwiperSlide>
                        )
                    }         
                </Swiper>
                {
                    news.length !== 1 &&
                    <div className={styles.navigation}>
                        <button className="swiper-prev swiper-button"></button>
                        <button className="swiper-next swiper-button"></button>
                    </div>
                }
            </div>
        </div>
    )
}

export default Slider