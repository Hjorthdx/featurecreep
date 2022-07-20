import NextHead from 'next/head';

interface Props {
    title: string;
}

function Head({ title }: Props) {
    return (
        <NextHead>
            <title>{title}</title>
            <meta name='description' content='The place where all new features are welcome' />
            <link rel='icon' href='/favicon.ico' />
        </NextHead>
    );
}

export default Head;
