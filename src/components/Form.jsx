import { Fragment } from "react";

export const FormPage = ({ users, post, addPost, save }) => {

    return (<Fragment>
        <div className="form-group">
            <fieldset>
                <label className="form-label">Title</label>
                <input
                    className="form-control" 
                    type="text" 
                    placeholder="Write here..."
                    name="title"
                    value={post.title}
                    onChange={addPost} />
            </fieldset>
        </div>

        <div className="form-group pt-4">
            <fieldset>
                <label className="form-label">Body</label>
                <input 
                    className="form-control" 
                    type="text" 
                    placeholder="Write here..."
                    name="body"
                    value={post.body}
                    onChange={addPost} />
            </fieldset>
        </div>

        <div className="form-group">
            <label className="form-label mt-4">Users</label>
            <select className="form-select" name="userId" onChange={addPost} value={post.userId}>
                <option value={'0'}>Select a user</option>
                {users.map(e => <option value={e.id} key={e.id}>{e.name}</option>)}
            </select>
        </div>

        <div className="pt-4">
            <button type="button" className="btn btn-primary btn-block" onClick={save}>
                <i className="fa fa-save"></i> Save
            </button>
        </div>
    </Fragment>);

}