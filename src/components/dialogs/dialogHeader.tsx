import * as Dialog from '@radix-ui/react-dialog';
import * as Separator from '@radix-ui/react-separator';
import { Cross2Icon } from '@radix-ui/react-icons';

interface Props {
    title: string;
    text: string;
}

export default function DialogHeader({ title, text }: Props) {
    return (
        <>
            <Dialog.Title className="text-amber-12 m-0 text-[24px] font-medium">
                {title}
            </Dialog.Title>
            <Separator.Root className="bg-amber-12 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px my-[15px]" />

            <Dialog.Description className="text-amber-11 mt-[10px] mb-5 text-[15px] leading-normal italic">
                {text}
            </Dialog.Description>

            <Dialog.Close asChild>
                <button
                    className="text-amber-11 hover:bg-amber-4 focus:shadow-amber-7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                    aria-label="Close"
                >
                    <Cross2Icon />
                </button>
            </Dialog.Close>
        </>
    )
}