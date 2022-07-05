interface Props {
    children: React.ReactNode;
}

function GridCell({ children }: Props) {
    return (
        <section className='h-full max-h-72 transform group border-2 border-neutral-800 rounded-2xl duration-300 hover:scale-105 hover:border-blue-600 hover:-translate-y-1 hover:shadow-2xl bg-white'>
            {children}
        </section>
    );
}

export default GridCell;
