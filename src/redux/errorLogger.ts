import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const errorLogger: Middleware = (api: MiddlewareAPI) => next => action => {
	if (isRejectedWithValue(action)) {
		toast.error(action.payload.data.error);
	}

	return next(action);
};

export default errorLogger;
