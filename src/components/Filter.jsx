import { Fragment } from "react";

export const Filter = ({ users, changeByUsers }) => {

    return (<Fragment>
        <select onChange={changeByUsers}>
            <option value="" disabled>Search by...</option>
            {users.map(e => <option value={e.id} key={e.id}>{e.name}</option>)}
        </select>
    </Fragment>);

}