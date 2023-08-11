import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ReactPlayer from 'react-player';

interface Props {
    images?: string[];
    imageDescriptions?: string[];
    videos?: string[];
    videoDescriptions?: string[];
}

// TODO: Idea (?) Perhaps should have autoplay until the first time you interact with the carousel?
export default function ImageCarousel({ images, imageDescriptions, videos, videoDescriptions }: Props) {
    return (
        <Carousel swipeable emulateTouch useKeyboardArrows autoFocus showStatus={false} showIndicators={false}>
            {[
                ...(videos && videoDescriptions
                    ? videos.map((video, index) => (
                          <div key={index}>
                              <ReactPlayer width='100%' url={video} playing />
                              <p className='text-amber-11 italic'>{videoDescriptions[index]}</p>
                          </div>
                      ))
                    : []),
                ...(images && imageDescriptions
                    ? images.map((image, index) => (
                          <div className='max-h-4/5' key={index}>
                              <img className='h-full imageSlide' src={image} />
                              <p className='text-amber-11 italic'>{imageDescriptions[index]}</p>
                          </div>
                      ))
                    : []),
            ]}
        </Carousel>
    );
}

// Can I solve this without using state? I could not get it to work without using this hell of a ternary (1) which is just awful to look at. I could not get images && imageDescriptions && *the mapping* and then the same for videos to work as I would get an error that read: "Type 'Element[] | undefined' is not assignable to type 'ReactChild'. Type 'undefined' is not assignable to type 'ReactChild'.ts(2322)". I've tried to do (2) which does work for one item just like the previous solution but again fails when you put two of them in.
// Maybe using state is fine (3). It just feels wrong both seeing an useEffect (as I generally put them in hooks but it feels wrong making a hook that adds two lists together...) but also just like as the previous point... It's two lists... Feels like they should be able to just be put together...
// I have this solution (4) that does not use state but it is not exactly very readable either...
/* (1)
            {images && imageDescriptions ? videos && videoDescriptions ? videos.map((video, index) => {
                return <div>
                    <ReactPlayer width="100%" url={video} playing />
                    <p className='text-amber-11 italic'>{videoDescriptions[index]}</p>
                </div>
            }) && images.map((image, index) => {
                return <div>
                    <img src={image} />
                    <p className='text-amber-11 italic'>{imageDescriptions[index]}</p>
                </div>
            }) : images.map((image, index) => {
                return <div>
                    <img src={image} />
                    <p className='text-amber-11 italic'>{imageDescriptions[index]}</p>
                </div>
            }) : videos && videoDescriptions && videos.map((video, index) => {
                return <div>
                    <ReactPlayer width="100%" url={video} playing />
                    <p className='text-amber-11 italic'>{videoDescriptions[index]}</p>
                </div>
            })}
*/
/* (2)
            {videos && videoDescriptions ? videos.map((video, index) => {
                return <div>
                    <ReactPlayer width="100%" url={video} playing />
                    <p className='text-amber-11 italic'>{videoDescriptions[index]}</p>
                </div>
            }) : [].map(() => { return <></> })}
*/
/*
    const [mediaItems, setMediaItems] = useState<JSX.Element[]>([])

    useEffect(() => {
        if (videos && videoDescriptions) {
            const videoSlides = videos.map((video, index) => {
                return <div>
                    <ReactPlayer width="100%" url={video} playing />
                    <p className='text-amber-11 italic'>{videoDescriptions[index]}</p>
                </div>
            })
            setMediaItems([...mediaItems, ...videoSlides]);
        }

        if (images && imageDescriptions) {
            const imageSlides = images.map((image, index) => {
                return <div>
                    <img src={image} />
                    <p className='text-amber-11 italic'>{imageDescriptions[index]}</p>
                </div>
            })
            setMediaItems([...mediaItems, ...imageSlides]);
        }

    }, [])
*/
/* (4)
                {[
                ...(videos &&
                    videoDescriptions ?
                    videos.map((video, index) => (
                        <div key={index}>
                            <ReactPlayer width="100%" url={video} playing />
                            <p className="text-amber-11 italic">{videoDescriptions[index]}</p>
                        </div>
                    )) : []),
                ...(images &&
                    imageDescriptions ?
                    images.map((image, index) => (
                        <div key={index}>
                            <img src={image} />
                            <p className="text-amber-11 italic">{imageDescriptions[index]}</p>
                        </div>
                    )) : [])
            ]}
*/
