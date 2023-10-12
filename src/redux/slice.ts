import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { blog } from "../util/Util";
import { Blog } from "../types/Blog.types";
import {
  InitialStateProps,
  StatusProps,
} from "../types/InitialStateProps.types";

type BlogPayload<T> = {
  type: string;
  payload: T;
};

const blogInfo: Blog = {
  id: crypto.randomUUID(),
  title: "",
  content: "",
};

const addBlogFn = (state: InitialStateProps, action: BlogPayload<Blog>) => {
  state.blog.push(action.payload);
};

const updateBlogFn = (state: InitialStateProps, action: BlogPayload<Blog>) => {
  const newBlogList = state.blog.filter(
    (blogItem) => blogItem.id !== action.payload.id
  );
  newBlogList.push(action.payload);
  state.blog = newBlogList;
};

const removeBlogFn = (
  state: InitialStateProps,
  action: BlogPayload<string>
) => {
  const id = action.payload;
  const newBlogList = state.blog.filter((blogItem) => blogItem.id !== id);
  state.blog = newBlogList;
};

const addOrUpdateBlogInfoFn = (
  state: InitialStateProps,
  action: PayloadAction<Blog>
) => {
  state.blogInfo = action.payload;
};

const updateIsUpdateFn = (state: InitialStateProps) => {
  state.isUpdate = !state.isUpdate;
};

const addSuccessFn = (
  state: InitialStateProps,
  action: PayloadAction<StatusProps>
) => {
  state.success = action.payload;
};

const addErrorFn = (
  state: InitialStateProps,
  action: PayloadAction<StatusProps>
) => {
  state.error = action.payload;
};

const resetSuccessFn = (state: InitialStateProps) => {
  state.success = {
    status: false,
    message: "",
  };
};

const resetErrorFn = (state: InitialStateProps) => {
  state.error = {
    status: false,
    message: "",
  };
};

const initialState: InitialStateProps = {
  blog: [],
  blogInfo,
  isUpdate: false,
  success: {
    status: false,
    message: "",
  },
  error: {
    status: false,
    message: "",
  },
};

export const blogSlice = createSlice({
  name: blog,
  initialState,
  reducers: {
    addBlog: addBlogFn,
    updateBlog: updateBlogFn,
    removeBlog: removeBlogFn,
    addBlogInfo: addOrUpdateBlogInfoFn,
    updateIsUpdate: updateIsUpdateFn,
    addSuccess: addSuccessFn,
    addError: addErrorFn,
    resetSuccess: resetSuccessFn,
    resetError: resetErrorFn,
  },
});

export const {
  addBlog,
  removeBlog,
  addBlogInfo,
  updateIsUpdate,
  updateBlog,
  addSuccess,
  addError,
  resetSuccess,
  resetError,
} = blogSlice.actions;

export default blogSlice.reducer;
