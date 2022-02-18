import React from 'react';
import { Link } from 'react-router-dom';

const StudentCard = () => {
    const raw = localStorage.getItem('data');
    const student = JSON.parse(raw);

    return (
        <>
            <h1 className='display-1'>Карточка студента</h1>
            {student ? (
                <>
                    <p>Имя: {student.name} </p>
                    <p>Фамилия: {student.surname} </p>
                    <p>Год рождения: {student.burthday} </p>
                    <p>Имя: {student.portfolio} </p>
                    <Link
                        className='nav-link '
                        aria-current='page'
                        to='/registration'
                    >
                        <button className='btn btn-primary'>
                            Редактировать
                        </button>
                    </Link>
                </>
            ) : (
                <Link
                    className='nav-link '
                    aria-current='page'
                    to='/registration'
                >
                    <button className='btn btn-primary'>Добавить</button>
                </Link>
            )}
        </>
    );
};

export default StudentCard;
