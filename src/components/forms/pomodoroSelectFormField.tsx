import * as Form from '@radix-ui/react-form';
import { PomodoroFormat } from 'prisma/prisma-client';
import { ChangeEvent } from 'react';

interface Props {
    selectedPomodoroFormatId: string
    pomodoroFormats: PomodoroFormat[];
    onOptionChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export default function PomodoroSelectFormField({ selectedPomodoroFormatId, pomodoroFormats, onOptionChange }: Props) {
    return <Form.Field className="grid mb-[10px]" name="savedPomodoroFormats">
        <Form.Label className="text-[15px] font-medium leading-[35px] text-amber-12 data-invalid:border-greenA-12 formLabel">Pre-saved formats</Form.Label>
        <Form.Control asChild>
            <select className='box-border w-full bg-amber-3 shadow-amberA-6 inline-flex rounded-[4px] p-[10px] text-[15px] leading-none text-amber-12 shadow-[0_0_0_1px] outline-none hover:shadow-amber-7 focus:shadow-amber-8' onChange={onOptionChange}>
                {pomodoroFormats.map((option: PomodoroFormat, index: number) => {
                    if (option.id === selectedPomodoroFormatId) {
                        return (
                            <option key={index} value={option.id} selected>
                                {option.name}
                            </option>
                        );
                    } else {
                        return (
                            <option key={index} value={option.id}>
                                {option.name}
                            </option>
                        );
                    }
                })}
                <option key='newPomodoroFormat' value='new'>
                    New Pomodoro Format
                </option>
            </select>
        </Form.Control>
    </Form.Field>
}