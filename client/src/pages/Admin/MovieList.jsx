import React, { useEffect } from 'react';
import { getAllMovies } from '../../calls/movieCalls';
import { useState } from 'react';
import { Table, Button } from 'antd';
import AddMovieForm from './AddMovieForm';
import {
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons';
function MovieList() {
    //get all movies
    const [movies, setMovies] = useState([]);
    const [isModalOpen, setisModalOpen] = useState(false);
    const [formType, setFormType] = useState('add');
    const [selectedMovie, setSelectedMovie] = useState(null);
    const moviesList = async () => {
        try {
            const response = await getAllMovies();
            setMovies(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        moviesList()
    }, []);

    const tableHeadings = [
        {
            title: 'Poster',
            dataIndex: 'posterPath',
            render: (text, data) => {
                return (<img width='75' height='120' src={data.posterPath} />)
            }
        },
        {
            title: 'Title',
            dataIndex: 'title'
        },
        {
            title: 'Description',
            dataIndex: 'description'
        },
        {
            title: 'Language',
            dataIndex: 'language'
        },
        {
            title: 'Genre',
            dataIndex: 'genre'
        },
        {
            title: 'Release Date',
            dataIndex: 'releaseDate',
            render: (text, data) => {
                const date = new Date(data.releaseDate);
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear();
                return `${day}-${month}-${year}`;
            }
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            render: (text) => {
                return `${text} min`
            }
        },
        {
            title: 'Ratings',
            dataIndex: 'ratings'
        },
        {
            title: 'Action',
            render: (text, data) => {
                return <div>
                    <Button onClick={() => {
                        setisModalOpen(true);
                        setFormType('edit'),
                        setSelectedMovie(data)
                    }}>
                    <EditOutlined />
                    </Button>
                    <Button><DeleteOutlined /></Button>
                </div>
            }
        }
    ]
    return (
        <div >
            <div className='d-flex justify-content-end'>
                <Button onClick={() => {
                    setisModalOpen(true);
                    setSelectedMovie(null)
                }}>Add Movie</Button>
            </div>
            <Table dataSource={movies} columns={tableHeadings} />
            {isModalOpen && <AddMovieForm isModalOpen={isModalOpen} setIsModalOpen={setisModalOpen} 
            formType={formType} 
            selectedMovie={selectedMovie}
            setSelectedMovie={setSelectedMovie}/>}
        </div>


    )
}

export default MovieList