import { Link } from "react-router";
import "./App.css";
import { Bounce, ToastContainer, toast } from 'react-toastify';
function App() {
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const user = { name, email };
        fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(user),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.insertedId) {
                    toast("🦄 Wow so easy!", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                    form.reset();
                }
            });
    };
    return (
        <>
            <h1>Hello MongoDB</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="">Name: </label>
                        <input
                            className="border m-2 rounded-2xl"
                            required
                            name="name"
                            type="text"
                        />
                    </div>
                    <div>
                        <label htmlFor="">Email: </label>
                        <input
                            className="border m-2 rounded-2xl"
                            required
                            name="email"
                            type="text"
                        />
                    </div>
                    <button>submit</button>
                </form>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <Link to="/users" className="border ">
                Users
            </Link>
        </>
    );
}

export default App;
