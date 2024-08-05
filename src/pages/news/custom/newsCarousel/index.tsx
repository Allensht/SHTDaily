import { Carousel } from "antd";
import '@/pages/news/custom/newsCarousel/index.less'

const NewsCarousel: React.FC = ({weiboNews}) => {
    const contentStyle: React.CSSProperties = {
        margin: 10,
        color: '#fff',
        textAlign: 'center',
        background: '#364d79',
      };
      return (
        <div className='carousel'>
            <Carousel arrows infinite={false} adaptiveHeight={true}>
                {weiboNews}
            </Carousel>
        </div>
    )
}

export default NewsCarousel