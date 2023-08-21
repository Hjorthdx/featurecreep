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
                          <div className='h-4/5' key={index}>
                              <YoutubeSlide url={video} />
                              <p className='text-amber-11 italic'>{videoDescriptions[index]}</p>
                          </div>
                      ))
                    : []),
                ...(images && imageDescriptions
                    ? images.map((image, index) => (
                          <div className='h-5/6' key={index}>
                              <img className='h-full imageSlide' src={image} alt={`Image ${index + 1}`} />
                              <p className='text-amber-11 italic'>{imageDescriptions[index]}</p>
                          </div>
                      ))
                    : []),
            ]}
        </Carousel>
    );
}
