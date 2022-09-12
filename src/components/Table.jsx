import { Fragment } from "react";
import { Pagination } from '../components/Pagination';

export const Table = ({ posts, currentPosts, postsPerPage, paginate }) => {

    return (<Fragment>
        <div className="table-responsive">
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">User</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        posts.map(e => <tr key={e.id}>
                            <th>{e.title}</th>
                            <td>{e.body}</td>
                            <td>{e.userId}</td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>

        {/* <Pagination
            postsPerPage={postsPerPage}
            totalPosts={posts.length}
            paginate={paginate}
        /> */}
    </Fragment>);

}