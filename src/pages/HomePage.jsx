import React, { Fragment, useEffect } from "react";
import { FormPage } from "../components/Form";
import { Table } from "../components/Table";
import { Filter } from '../components/Filter';
import { getAll } from '../services/UserServices';
import { getAll as getAllPosts, create } from '../services/PostServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const HomePage = () => {

    const [users, setUsers] = React.useState([]);
    const [posts, setPosts] = React.useState([]);
    const [postsBack, setPostsBack] = React.useState([]);
    const [post, setPost] = React.useState({ title: "", body: "", userId: 0 });

    const [currentPage, setCurrentPage] = React.useState(1);
    const [postsPerPage] = React.useState(15);
    const [currentPostsUpdate, setCurrentPostsUpdate] = React.useState([]);
    const [paginate, setPaginate] = React.useState(null);

    useEffect(() => {
        getPosts();
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            const response = await getAll();
            if (response.status !== 200) throw new Error('Error in the api');

            setUsers(response.data);
        } catch (error) {

        }
    };

    const getPosts = async () => {
        try {
            const response = await getAllPosts();
            if (response.status !== 200) throw new Error('Error in the api');

            setPosts(response.data.filter(e => e.userId === 1));
            setPostsBack(response.data);

            // Get current posts
            const indexOfLastPost = currentPage * postsPerPage;
            const indexOfFirstPost = indexOfLastPost - postsPerPage;
            const _currentPosts = response.data.slice(indexOfFirstPost, indexOfLastPost);
            setCurrentPostsUpdate(_currentPosts);

            // Change page
            const _paginate = pageNumber => setCurrentPage(pageNumber);
            setPaginate(_paginate);
        } catch (error) {
            toast(error);
        }
    }

    const addPost = (e) => {
        setPost({
            ...post,
            [e.target.name]: e.target.value
        });
    }

    const save = async () => {
        try {
            if (post.title.length === 0 || post.body.length === 0 || post.userId == 0) {
                toast.warning("Please, complete fields!", { className: 'toast-success-container toast-success-container-after' });
                return;
            }

            const response = await create(post);
            if (response.status !== 201) throw new Error('Error in the api');

            toast.success("Post created successfully!", { className: 'toast-success-container toast-success-container-after' });            getPosts();
            clean();
        } catch (error) {
            toast(error);
        }
    }

    const clean = () => {
        setPost({ title: "", body: "", userId: 0 });
    }

    const changeByUsers = (event) => {
        const _currentPosts = postsBack.filter(e => e.userId == event.target.value);
        setCurrentPostsUpdate(_currentPosts);
        setPosts(_currentPosts);
    }
    
    return (<Fragment>
        <ToastContainer />
        <div className="container pt-4">

            <div className="alert alert-dismissible alert-success">
                <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
                <h4 className="mb-0">WELCOME CRUD POSTS</h4>
            </div>

            <div className="row">
                <div className="col-lg-4">
                    <FormPage
                        users={users}
                        post={post}
                        addPost={addPost}
                        save={save}
                    />
                </div>
                <div className="col-lg-8">

                    <Filter 
                        users={users}
                        changeByUsers={changeByUsers}
                    />

                    <Table
                        posts={posts}
                        currentPosts={currentPostsUpdate}
                        postsPerPage={postsPerPage}
                        totalPosts={posts.length}
                        paginate={paginate}
                    />
                </div>
            </div>
        </div>
    </Fragment>);
}