ALTER TABLE blog_posts ADD COLUMN notion_page_id TEXT;
ALTER TABLE blog_posts ADD COLUMN last_edited_time TEXT;
ALTER TABLE blog_posts ADD COLUMN synced_at TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS idx_blog_posts_notion_page_id
    ON blog_posts(notion_page_id)
    WHERE notion_page_id IS NOT NULL;

ALTER TABLE content_pages ADD COLUMN notion_page_id TEXT;
ALTER TABLE content_pages ADD COLUMN last_edited_time TEXT;
ALTER TABLE content_pages ADD COLUMN synced_at TEXT;

CREATE INDEX IF NOT EXISTS idx_content_pages_notion_page_id
    ON content_pages(notion_page_id);
