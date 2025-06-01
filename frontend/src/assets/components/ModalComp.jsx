import React from "react";
import { Modal } from "antd";
import Swal from "sweetalert2";

const ModalComp = ({
        isModalOpen,
        selectedUser,
        onCancel,
        onUpdateSuccess,
}) => {
const handleUpdateSubmit = (e) => {
e.preventDefault();
const form = e.target;
const name = form.name.value;
const email = form.email.value;
const updatedUser = { name, email };

fetch(`http://localhost:3000/users/${selectedUser._id}`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
})
        .then((res) => res.json())
        .then((data) => {
        if (data.modifiedCount > 0) {
                Swal.fire(
                "Success!",
                "User updated successfully",
                "success"
                );
                onUpdateSuccess({ ...selectedUser, ...updatedUser }); // update parent state
        }
        })
        .catch((error) => {
        console.error("Update failed:", error);
        Swal.fire("Error", "Something went wrong!", "error");
        });
};

return (
<Modal
        title="Update User"
        open={isModalOpen}
        onCancel={onCancel}
        footer={null}
>
        <form onSubmit={handleUpdateSubmit}>
        <div>
                <label>Name:</label>
                <input
                className="text-black border p-2 w-full m-2 rounded-2xl"
                required
                name="name"
                type="text"
                defaultValue={selectedUser?.name}
                />
        </div>
        <div>
                <label>Email:</label>
                <input
                className="text-black border p-2 w-full m-2 rounded-2xl"
                required
                name="email"
                type="email"
                defaultValue={selectedUser?.email}
                />
        </div>
        <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
        >
                Submit
        </button>
        </form>
</Modal>
);
};

export default ModalComp;
