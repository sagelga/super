CREATE TABLE IF NOT EXISTS authors (
    key       TEXT PRIMARY KEY,
    name      TEXT NOT NULL,
    title     TEXT,
    url       TEXT,
    image_url TEXT
);

CREATE TABLE IF NOT EXISTS blog_posts (
    slug         TEXT PRIMARY KEY,
    title        TEXT NOT NULL,
    description  TEXT NOT NULL DEFAULT '',
    date         TEXT NOT NULL,
    authors      TEXT NOT NULL DEFAULT '[]',
    tags         TEXT NOT NULL DEFAULT '[]',
    image        TEXT,
    reading_time TEXT NOT NULL,
    source       TEXT NOT NULL,
    word_count   INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_date ON blog_posts(date DESC);

CREATE TABLE IF NOT EXISTS content_pages (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    section     TEXT NOT NULL,
    slug_key    TEXT NOT NULL,
    slug_path   TEXT NOT NULL,
    title       TEXT NOT NULL DEFAULT '',
    sidebar_label TEXT,
    description TEXT,
    source      TEXT NOT NULL,
    is_readme   INTEGER NOT NULL DEFAULT 0,
    UNIQUE(section, slug_key)
);

CREATE INDEX IF NOT EXISTS idx_content_pages_section ON content_pages(section);
CREATE INDEX IF NOT EXISTS idx_content_pages_section_slug ON content_pages(section, slug_key);

CREATE TABLE IF NOT EXISTS sidebar_trees (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    section   TEXT NOT NULL,
    sub_path  TEXT NOT NULL DEFAULT '',
    tree_json TEXT NOT NULL,
    UNIQUE(section, sub_path)
);

CREATE TABLE IF NOT EXISTS gallery_items (
    id       INTEGER PRIMARY KEY,
    seed     TEXT NOT NULL,
    category TEXT NOT NULL,
    title    TEXT NOT NULL,
    width    INTEGER NOT NULL,
    height   INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS doc_projects (
    slug        TEXT PRIMARY KEY,
    title       TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    page_count  INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS learn_topics (
    slug       TEXT PRIMARY KEY,
    title      TEXT NOT NULL,
    page_count INTEGER NOT NULL DEFAULT 0
);
