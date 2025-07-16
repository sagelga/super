// Defines the structure for a blog post object
export interface BlogPost {
    id: string; // Unique identifier for the blog post
    slug: string; // URL-friendly slug for the blog post
    title: string; // Title of the blog post
    content: string; // Full content of the blog post (e.g., HTML or Markdown)
    published_at: string; // Publication date of the blog post
    excerpt: string; // A short summary or preview of the blog post
    category: string; // The category the blog post belongs to
}
