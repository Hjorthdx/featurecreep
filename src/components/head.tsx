import NextHead from 'next/head';

function Head() {
    return (
        <NextHead>
            <title>FeatureCreep</title>
            <meta name='description' content='The place where all new features are welcome' />
            <link rel='icon' href='/favicon.ico' />
        </NextHead>
    );
}

export default Head;
