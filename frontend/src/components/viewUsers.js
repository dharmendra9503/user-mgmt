import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ViewUsers() {

    const [users, setUsers] = useState([]);
    const [response, setResponse] = useState([]);
    const [colorState, setColorState] = useState("light");
    const [error, setError] = useState('');
    const iUrl = 'http://127.0.0.1:5000/api/user/list';
    const [nextPageClicked, setNextPageClicked] = useState(false);
    const [index, setIndex] = useState(0);

    const [pagination, setPagination] = useState({
        url: iUrl,
        totalItems: 0,
        itemsPerPage: 10,
        activePage: 1,
        totalPages: 0,
        nextPageUrl: '',
        prevPageUrl: '',
    });

    useEffect(() => {
        fetchData(pagination.url);
        setTimeout(() => {
            setError('');
            setColorState("light");
            setResponse([]);
        }, 3000);
    }, [nextPageClicked])

    const fetchData = (url) => {
        axios.get(url)
            .then(response => {
                const data = response.data.data;
                setUsers(data.rows);
                console.log(data);
                pagination['totalItems'] = data.count;
                pagination['itemsPerPage'] = data.itemsPerPage;
                pagination['activePage'] = data.currentPage;
                pagination['totalPages'] = data.totalPages;
                pagination['nextPageUrl'] = data.nextPageUrl;
                pagination['prevPageUrl'] = data.prevPageUrl;
                const value = pagination.itemsPerPage * (pagination.activePage - 1);
                setIndex(value);
                console.log(index);
                console.log(pagination);
                setNextPageClicked(false);
            })
            .catch(error => {
                console.log(error);
                setError(error);
                setColorState("danger");
            });
    }

    const deleteHandler = (userId) => {
        axios.delete(`http://127.0.0.1:5000/api/user/delete?id=${userId}`)
            .then(response => {
                setResponse(response);
                setColorState("success");
                setNextPageClicked(true);
                // const updatedUsers = users.filter(user => user.id !== userId);
                // setUsers(updatedUsers);
            })
            .catch(error => {
                setError(error);
                setColorState("danger");
            });
        setTimeout(() => {
            setResponse([]);
            setError('');
            setColorState("light");
        }, 3000);
    }

    const handlePageChange = (pageUrl) => {
        setNextPageClicked(true);
        pagination['url'] = pageUrl;
    };

    const renderPageLinks = () => {
        const pageLinks = [];

        // Render "Previous" link
        pageLinks.push(
            <li className={`page-item ${pagination.activePage === 1 ? 'disabled' : ''}`} key="prev">
                <a
                    className="page-link"
                    onClick={() => handlePageChange(pagination.prevPageUrl)}
                    aria-label="Previous"
                >
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
        );

        // Render individual page number links
        for (let page = 1; page <= pagination.totalPages; page++) {
            pageLinks.push(
                <li className={`page-item ${pagination.activePage === page ? 'active' : ''}`} key={page}>
                    <a className="page-link" onClick={() => handlePageChange(`${iUrl}?page=${page}`)}>
                        {page}
                    </a>
                </li>
            );
        }

        // Render "Next" link
        pageLinks.push(
            <li className={`page-item ${pagination.activePage === pagination.totalPages ? 'disabled' : ''}`} key="next">
                <a
                    className="page-link"
                    onClick={() => handlePageChange(pagination.nextPageUrl)}
                    aria-label="Next"
                >
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        );

        return pageLinks;
    };


    return (
        <div className='mt-5'>
            <div className={`container w-50 alert alert-${colorState} text-center`}>
                {response.status ? response.data.message : error.message}
            </div>
            <div className='container mt-2 card text-center'>
                <div className="card-header">
                    <h3>Users</h3>
                </div>
                <table className="table table-striped">
                    <thead className=' fs-4 font-monospace'>
                        <tr>
                            <th scope="col">Sr.</th>
                            <th scope="col">First name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Mobile</th>
                            <th scope="col">Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, i) =>
                            <tr key={user.id}>
                                <td>{index + i + 1}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td>{user.mobile}</td>
                                <td><button className="btn btn-primary btn-edit">Edit</button> <button className="btn btn-danger btn-delete" onClick={() => deleteHandler(user.id)}>Delete</button></td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className="card-footer text-muted">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-end">
                            {renderPageLinks()}
                        </ul>
                    </nav>
                </div>
            </div >
        </div>
    )
}