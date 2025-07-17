// Defines the structure for a blog post object
export interface Post {
    id: string;
    slug: string;
    title: string;
    content: string;
    published_at: string;
    excerpt: string;
    feature_image: string;
    primary_tag: { name: string };
}
