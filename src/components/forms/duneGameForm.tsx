import { Formik, Form } from 'formik';
import FormSelectField from './formSelectField';
import FormTextField from './formTextField';
import { DuneGame } from 'prisma/prisma-client';

interface Props {
    game: DuneGame;
    setGame: (newGame: DuneGame) => void;
    onSubmit: () => void;
}

// TODO: Validation schema
// TODO: Import leaders from that other file and map them here
// TODO: onChange functions

// The same leader cannot be chosen in two spaces at the same time. Unless ofcourse it's position and placement.
export default function DuneCreateGameForm({ game, setGame, onSubmit }: Props) {
    function onChange(name: string, value: string): void {
        setGame({ ...game, [name]: value });
    }

    function onOptionChange(label: string, value: string): void {
        setGame({ ...game, [label]: value });
    }

    return (
        <Formik enableReinitialize={true} initialValues={game} onSubmit={onSubmit}>
            <Form>
                <div className='flex'>
                    <FormTextField name='name' label='Name' onChange={onChange} />
                    <FormTextField name='note' label='Note' onChange={onChange} />
                </div>
                {/* Positions */}
                <div className='flex'>
                    <FormSelectField name='firstPosition' label='First position' onChange={onOptionChange}>
                        {/* Import leaders from that other file and map them here */}
                        {['1', '2', '3', '4', '5'].map((option, index) => {
                            return (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            );
                        })}
                    </FormSelectField>

                    <FormSelectField name='secondPosition' label='Second position' onChange={onOptionChange}>
                        {/* Import leaders from that other file and map them here */}
                        <option key='1' value='1'>
                            1
                        </option>
                        <option key='2' value='2'>
                            2
                        </option>
                    </FormSelectField>

                    <FormSelectField name='thirdPosition' label='Third position' onChange={onOptionChange}>
                        {/* Import leaders from that other file and map them here */}
                        <option key='1' value='1'>
                            1
                        </option>
                        <option key='2' value='2'>
                            2
                        </option>
                    </FormSelectField>

                    <FormSelectField name='fourthPosition' label='Fourth position' onChange={onOptionChange}>
                        {/* Import leaders from that other file and map them here */}
                        <option key='1' value='1'>
                            1
                        </option>
                        <option key='2' value='2'>
                            2
                        </option>
                    </FormSelectField>
                </div>
                {/* Placements */}
                {/* Could I do something smart here with only showing the leaders that have been shown for the positions above? */}
                <div className='flex'>
                    <FormSelectField name='firstPlacement' label='First placement' onChange={onOptionChange}>
                        {/* Import leaders from that other file and map them here */}
                        <option key='1' value='1'>
                            1
                        </option>
                        <option key='2' value='2'>
                            2
                        </option>
                    </FormSelectField>

                    <FormSelectField name='secondPlacement' label='Second placement' onChange={onOptionChange}>
                        {/* Import leaders from that other file and map them here */}
                        <option key='1' value='1'>
                            1
                        </option>
                        <option key='2' value='2'>
                            2
                        </option>
                    </FormSelectField>

                    <FormSelectField name='thirdPlacement' label='Third placement' onChange={onOptionChange}>
                        {/* Import leaders from that other file and map them here */}
                        <option key='1' value='1'>
                            1
                        </option>
                        <option key='2' value='2'>
                            2
                        </option>
                    </FormSelectField>

                    <FormSelectField name='fourthPlacement' label='Fourth placement' onChange={onOptionChange}>
                        {/* Import leaders from that other file and map them here */}
                        <option key='1' value='1'>
                            1
                        </option>
                        <option key='2' value='2'>
                            2
                        </option>
                    </FormSelectField>
                </div>
            </Form>
        </Formik>
    );
}
