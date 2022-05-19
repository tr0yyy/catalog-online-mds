import React, { useState } from "react";
import { useNavigate } from "react-router";
import InputRange from 'react-input-range';

export default function Create() {
    const [form, setForm] = useState({
        name: "",
        clasa: "",
        data: "",
        nota: 1,
    });

    const navigate = useNavigate();

    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    async function onSubmit(e) {
        e.preventDefault();

        const newPerson = { ...form };

        await fetch("http://localhost:5000/record/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPerson),
        })
            .catch(error => {
                window.alert(error);
                return;
            });

        setForm({ name: "", clasa: "", data: "", nota: ""});
        navigate("/");
    }

    return (
        <div>
            <h3>Adauga nota pentru elev</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="nume">Nume</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={form.name}
                        onChange={(e) => updateForm({ name: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="clasa">Clasa</label>
                    <input
                        type="text"
                        className="form-control"
                        id="clasa"
                        value={form.data}
                        onChange={(e) => updateForm({ clasa: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="data-notei">Data notei</label>
                    <input
                        type="date"
                        className="form-control"
                        id="data-notei"
                        value={form.position}
                        onChange={(e) => updateForm({ date: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="nota">Nota</label>
                    <input
                        type="range"
                        min="1" max="10"
                        value={form.nota}
                        step="1"
                        onChange={(e)=>updateForm({nota: e.target.value})}
                    />
                    <label htmlFor="valoareaNotei">{form.nota}</label>
                </div>
                <div className="form-group">
                    <input
                        type="submit"
                        value="Adauga nota"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );
}