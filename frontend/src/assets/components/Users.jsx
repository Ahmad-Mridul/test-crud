import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import User from "./User";
import ModalComp from "./ModalComp";
import "../../../src/App.css";
import { RiDeleteBin5Line, RiEditBoxLine } from "react-icons/ri";
import Swal from "sweetalert2";
import { Button, Modal } from "antd";
const Users = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    useEffect(() => {
        fetch("http://localhost:3000/users")
            .then((res) => res.json())
            .then((data) => setUsers(data));
    }, []);
    const navigate = useNavigate();
    const handleDelete = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3000/users/${_id}`, {
                    method: "DELETE",
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success",
                            });
                            const remaining = users.filter(
                                (user) => user._id !== _id
                            );
                            setUsers(remaining);
                        }
                    });
            }
        });
    };
    const showUpdateModal = (_id) => {
        const userToUpdate = users.find((user) => user._id === _id);
        setSelectedUser(userToUpdate);
        setIsModalOpen(true);
    };
    const handleUpdateModal = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, update it!",
        }).then((result) => {
            if (result.isConfirmed) {
                showUpdateModal(_id);
            }
        });
    };
    
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div>
            <h1>Users:{users.length}</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>_ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <div className="flex gap-6">
                                        <button
                                            onClick={() =>
                                                handleUpdateModal(user._id)
                                            }
                                        >
                                            <RiEditBoxLine />
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(user._id)
                                            }
                                        >
                                            <RiDeleteBin5Line />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ModalComp
                isModalOpen={isModalOpen}
                selectedUser={selectedUser}
                onCancel={handleCancel}
                onUpdateSuccess={(updatedUser) => {
                    const updatedUsers = users.map((u) =>
                        u._id === updatedUser._id ? updatedUser : u
                    );
                    setUsers(updatedUsers);
                    setIsModalOpen(false);
                }}
            />
            <button onClick={() => navigate(-1)}>Back</button>
        </div>
    );
};

export default Users;
