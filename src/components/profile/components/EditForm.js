import React from 'react'


export const EditForm = () => {


   

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);
    }


    return (
        <div className="edit-user-container">
          <h3>Datos Usuario</h3>
            <hr/>
        <form id="edit-userForm" onSubmit={ handleSubmit }>
            <label htmlFor="username">
                <p className="lbl-txt">Username</p>
                <input type="text" name="username" /> 
            </label>
            <label htmlFor="email">
                <p className="lbl-txt">Email</p>
                <input type="email" name="email"  />
                </label>
            <label htmlFor="imagen">
                <input type="file" name="imagen" ></input>
            </label>
            
            <button type="submit">Cambiar</button>
        </form>
    </div>
    )
}
