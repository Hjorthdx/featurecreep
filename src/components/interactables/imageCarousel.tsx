import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ReactPlayer from 'react-player';
import { ReactChild, ReactElement, ReactNode } from 'react';
import React from 'react';

interface Props {
    images?: string[];
    imageDescriptions?: string[];
    videos?: string[];
    videoDescriptions?: string[];
}

function YoutubeSlide({ url, isSelected }: { url: string; isSelected?: boolean }) {
    return <ReactPlayer width='100%' url={url} playing={isSelected} />;
}

// TODO: Idea (?) Perhaps should have autoplay until the first time you interact with the carousel?
// TODO: Should use Next/Image instead of img, but I think this breaks the library right now...
// TODO: Figure out a way to format the slides better (Varying height for all the elements, which makes the thumbnails not be directly below...)
export default function ImageCarousel({ images, imageDescriptions, videos, videoDescriptions }: Props) {
    // What a monstrosity I've created... Please help me...
    const customRenderThumbnail = (children: ReactChild[]): ReactChild[] => {
        const thumbnailImages = React.Children.map(children, (item: ReactNode) => {
            let img = item;

            if (React.isValidElement(item)) {
                if (item.type !== 'img') {
                    const imgElement = React.Children.toArray(item.props.children).find(
                        (child) => React.isValidElement(child) && child.type === 'img'
                    );
                    if (imgElement) {
                        img = imgElement;
                    } else {
                        const reactPlayerElement = React.Children.toArray(item.props.children)[0] as ReactElement;

                        if (reactPlayerElement) {
                            const getVideoThumb = (videoId: string) => `https://img.youtube.com/vi/${videoId}/default.jpg`;
                            const getVideoId = (url: string) =>
                                url.substring('https://www.youtube.com/watch?v='.length, url.length);
                            const videoId = getVideoId(reactPlayerElement.props.url);
                            img = (
                                <img key={item.props.url} src={getVideoThumb(videoId)} alt={reactPlayerElement.props.url} />
                            );
                        }
                    }
                }
            }

            return img;
        });

        return thumbnailImages?.filter((image) => !!image) as ReactChild[]; // Ensure a clean array of ReactChild
    };

    const customRenderItem = (item: React.ReactNode, options?: { isSelected: boolean }) => {
        if (React.isValidElement(item)) {
            const childrenArray = React.Children.toArray(item.props.children);

            if (childrenArray.length > 0) {
                const reactPlayerElement = childrenArray[0] as React.ReactElement;

                if (options) {
                    // Clone the reactPlayerElement with isSelected prop added
                    const modifiedReactPlayerElement = React.cloneElement(reactPlayerElement, {
                        isSelected: options.isSelected,
                    });

                    // Create a new array of children with the modified first child
                    const modifiedChildrenArray = [
                        modifiedReactPlayerElement,
                        ...childrenArray.slice(1), // Add the rest of the children
                    ];

                    // Clone the parent element with the modified children array
                    const modifiedParentElement = React.cloneElement(item, {}, modifiedChildrenArray);

                    return modifiedParentElement;
                }
            }
        }

        // Return the original item if no modifications are made
        return item;
    };

    return (
        <Carousel
            swipeable
            emulateTouch
            useKeyboardArrows
            autoFocus
            showStatus={false}
            showIndicators={false}
            renderThumbs={customRenderThumbnail}
            renderItem={customRenderItem}
        >
            {[
                ...(videos && videoDescriptions
                    ? videos.map((video, index) => (
                          <div key={index}>
                              <YoutubeSlide url={video} />
                              <p className='text-amber-11 italic'>{videoDescriptions[index]}</p>
                          </div>
                      ))
                    : []),
                ...(images && imageDescriptions
                    ? images.map((image, index) => (
                          <div className='max-h-4/5' key={index}>
                              <img className='h-full imageSlide' src={image} alt={`Image ${index + 1}`} />
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
