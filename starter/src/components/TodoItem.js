import React from 'react';
import { useDispatch } from 'react-redux';
import {toggleCompleteAsync, deleteToDoAsync} from '../redux/todoSlice';

const TodoItem = ({ id, title, completed }) => {
	const dispatch = useDispatch();
	const handleCompleteClick = () => {
		dispatch(toggleCompleteAsync({
			id: id, 
			completed: !completed
		}))
	};
	const handleDeletedClick = () => {
		dispatch(deleteToDoAsync({ id:id }));
	};
	return (
		<li className={`list-group-item ${completed && 'list-group-item-success'}`}>
			<div className='d-flex justify-content-between'>
				<span className='d-flex align-items-center'>
					<input 
					type='checkbox' 
					className='mr-3' 
					onChange={handleCompleteClick}
					checked={completed}></input>
					{title}
				</span>
				<button onClick={handleDeletedClick} className='btn btn-danger'>Delete</button>
			</div>
		</li>
	);
};

export default TodoItem;
