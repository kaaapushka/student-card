import React, { useState, useEffect } from 'react';
import TextField from '../components/textField';
import { validator } from '../utils/validator';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Registration = () => {
    const history = useHistory();
    const [errors, setErrors] = useState({});
    const [data, setData] = useState({
        name: '',
        surname: '',
        burthday: '',
        portfolio: '',
    });

    const raw = localStorage.getItem('data');
    const [student, setStudent] = useState(JSON.parse(raw));

    const val = raw ? student : data;

    const handleChangeData = ({ target }) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value,
        }));
    };

    const handleChangeStudent = ({ target }) => {
        setStudent((prevState) => ({
            ...prevState,
            [target.name]: target.value,
        }));
    };

    const validatorConfig = {
        name: {
            isRequired: {
                message: 'Поле имя обязательно для заполнения!',
            },
        },
        surname: {
            isRequired: {
                message: 'Поле фамилия обязательно для заполнения!',
            },
        },
        burthday: {
            isRequired: {
                message: 'Поле год рождения обязательно для заполнения!',
            },
            isCorrectDate: {
                message: 'Неверный формат даты!',
            },
            isCorrectYear: {
                message: 'Указан неверный год!',
            },
        },
        portfolio: {
            isRequired: {
                message: 'Поле портфолио обязательно для заполнения!',
            },
            isCorrectUrl: {
                message: 'Поле портфолио заполнено не корректно!',
            },
        },
    };

    useEffect(() => {
        validate();
    }, [val]);

    const validate = () => {
        const errors = validator(val, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const handleClick = () => {
        history.push('/');
        localStorage.setItem('data', JSON.stringify(val));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const isValid = validate();
        if (!isValid) return;
    };

    return (
        <>
            {raw ? (
                <div className='container mt-5'>
                    <div className='row'>
                        <div className='col-md-6 offset-md-3 shadow p-4'>
                            <h3 className='mb-4'>Редактировать</h3>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label='Имя'
                                    name='name'
                                    value={student.name}
                                    onChange={handleChangeStudent}
                                    error={errors.name}
                                />
                                <TextField
                                    label='Фамилия'
                                    name='surname'
                                    value={student.surname}
                                    onChange={handleChangeStudent}
                                    error={errors.surname}
                                />
                                <TextField
                                    label='Год рождения'
                                    name='burthday'
                                    value={student.burthday}
                                    onChange={handleChangeStudent}
                                    error={errors.burthday}
                                />
                                <TextField
                                    label='Портфолио'
                                    name='portfolio'
                                    value={student.portfolio}
                                    onChange={handleChangeStudent}
                                    error={errors.portfolio}
                                />

                                <div className='d-flex justify-content-center'>
                                    <Link
                                        className='nav-link btn btn-secondary w-100 mx-auto'
                                        aria-current='page'
                                        to='/studentCard'
                                    >
                                        <button
                                            className=' btn btn-secondary w-100 mx-auto'
                                            type='submit'
                                        >
                                            Назад
                                        </button>
                                    </Link>
                                    <button
                                        type='submit'
                                        disabled={!isValid}
                                        className='btn btn-primary w-100 mx-auto'
                                        onClick={handleClick}
                                    >
                                        Обновить
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='container mt-5'>
                    <div className='row'>
                        <div className='col-md-6 offset-md-3 shadow p-4'>
                            <h3 className='mb-4'>Создать</h3>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label='Имя'
                                    name='name'
                                    value={data.name}
                                    onChange={handleChangeData}
                                    error={errors.name}
                                />
                                <TextField
                                    label='Фамилия'
                                    name='surname'
                                    value={data.surname}
                                    onChange={handleChangeData}
                                    error={errors.surname}
                                />
                                <TextField
                                    label='Год рождения'
                                    name='burthday'
                                    value={data.burthday}
                                    onChange={handleChangeData}
                                    error={errors.burthday}
                                />
                                <TextField
                                    label='Портфолио'
                                    name='portfolio'
                                    value={data.portfolio}
                                    onChange={handleChangeData}
                                    error={errors.portfolio}
                                />

                                <button
                                    type='submit'
                                    disabled={!isValid}
                                    className='btn btn-primary w-100 mx-auto'
                                    value='Создать'
                                    onClick={handleClick}
                                >
                                    Создать
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Registration;
