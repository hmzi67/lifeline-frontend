// routes/blog.routes.ts
import { Router } from 'express';
import {
  createBlogCategory,
  getAllBlogCategories,
  getBlogCategoryById,
  updateBlogCategory,
  deleteBlogCategory,
  createBlog,
  getAllBlogs,
  getBlogById,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
  getBlogsByCategory,
  getBlogsByAuthor,
  createBlogComment,
  getBlogComments,
  updateBlogComment,
  deleteBlogComment,
  getCommentReplies
} from '../controllers/blogsController.js';

const router = Router();

// Blog Category Routes
router.post('/categories', createBlogCategory);
router.get('/categories', getAllBlogCategories);
router.get('/categories/:id', getBlogCategoryById);
router.put('/categories/:id', updateBlogCategory);
router.delete('/categories/:id', deleteBlogCategory);

// Blog Routes
router.post('/', createBlog);
router.get('/', getAllBlogs);
router.get('/:id', getBlogById);
router.get('/slug/:slug', getBlogBySlug);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlog);
router.get('/category/:categoryId', getBlogsByCategory);
router.get('/author/:authorId', getBlogsByAuthor);

// Blog Comment Routes
router.post('/:blogId/comments', createBlogComment);
router.get('/:blogId/comments', getBlogComments);
router.put('/comments/:id', updateBlogComment);
router.delete('/comments/:id', deleteBlogComment);
router.get('/comments/:id/replies', getCommentReplies);

export default router;