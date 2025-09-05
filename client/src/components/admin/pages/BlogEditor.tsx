import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import {
  Bold,
  Code,
  Eye,
  FileDown,
  Hash,
  Heading1,
  Heading2,
  Image as ImageIcon,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Minus,
  Moon,
  Quote,
  Rocket,
  Sun,
  Tags,
  Trash2,
  Type,
  Underline,
  Upload,
} from "lucide-react";
import { marked } from "marked";
import DOMPurify from "dompurify";

// ---------- Utility helpers ----------
const slugify = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const wordsPerMinute = 200;

const countWords = (text: string) => {
  return (text.match(/\b\w+\b/g) || []).length;
};

const estimateReadingTime = (text: string) => {
  const minutes = Math.max(1, Math.round(countWords(text) / wordsPerMinute));
  return `${minutes} min read`;
};

function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* empty */
    }
  }, [key, value]);
  return [value, setValue];
}

// Insert Markdown syntax around the current selection in a textarea
const wrapSelection = (
  textarea: HTMLTextAreaElement | null,
  prefix = "",
  suffix = "",
) => {
  if (!textarea) return;
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const before = textarea.value.substring(0, start);
  const selected = textarea.value.substring(start, end) || "your text";
  const after = textarea.value.substring(end);
  textarea.value = `${before}${prefix}${selected}${suffix}${after}`;
  // put cursor after suffix
  const pos = before.length + prefix.length + selected.length + suffix.length;
  textarea.setSelectionRange(pos, pos);
  textarea.dispatchEvent(new Event("input", { bubbles: true }));
  textarea.focus();
};

const ToolbarButton = ({
  title,
  onClick,
  children,
}: {
  title: string;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    title={title}
    onClick={onClick}
    className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm hover:shadow-sm active:scale-[.98] transition"
  >
    {children}
  </button>
);

interface Post {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
  cover: string;
  status: "draft" | "published";
}

// ---------- Main Component ----------
export default function BlogEditor() {
  const [dark, setDark] = useLocalStorage<boolean>("be-dark", false);
  const [post, setPost] = useLocalStorage<Post>("be-post", {
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    tags: [],
    cover: "",
    status: "draft", // draft | published
  });

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  // Keep the slug in sync with title unless user edited it manually once
  const [slugTouched, setSlugTouched] = useState(false);
  useEffect(() => {
    if (!slugTouched) {
      setPost((p) => ({ ...p, slug: slugify(p.title || "") }));
    }
  }, [post.title, slugTouched, setPost]);

  const html = useMemo(() => {
    const raw = marked.parse(post.content || "", { async: false });
    return DOMPurify.sanitize(raw);
  }, [post.content]);

  const wordCount = useMemo(
    () => countWords(post.content || ""),
    [post.content],
  );
  const readingTime = useMemo(
    () => estimateReadingTime(post.content || ""),
    [post.content],
  );

  const handleAddTag = useCallback(() => {
    const t = tagInput.trim();
    if (!t) return;
    if (post.tags.includes(t)) return setTagInput("");
    setPost((p) => ({ ...p, tags: [...p.tags, t] }));
    setTagInput("");
  }, [tagInput, post.tags, setPost]);

  const handleRemoveTag = useCallback(
    (tagToRemove: string) => {
      setPost((p) => ({ ...p, tags: p.tags.filter((t) => t !== tagToRemove) }));
    },
    [setPost],
  );

  const insertImageAtCursor = useCallback((dataUrl: string | ArrayBuffer | null) => {
    const alt = "image";
    const md = `![${alt}](${dataUrl})`;
    wrapSelection(textareaRef.current, "", "");
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const before = ta.value.substring(0, start);
    const after = ta.value.substring(start);
    ta.value = `${before}\n${md}\n${after}`;
    ta.dispatchEvent(new Event("input", { bubbles: true }));
  }, []);

  const handleUploadInlineImage = useCallback((file: File | undefined) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target && e.target.result) {
        insertImageAtCursor(e.target.result);
      }
    };
    reader.readAsDataURL(file);
  }, [insertImageAtCursor]);

  const handleUploadCover = useCallback((file: File | undefined) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) =>
      setPost((p) => ({ ...p, cover: e.target?.result as string }));
    reader.readAsDataURL(file);
  }, [setPost]);

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(post, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${post.slug || "post"}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportMarkdown = () => {
    const front_matter = [
      "---",
      `title: "${post.title.replace(/"/g, '\\"')}"`,
      `slug: "${post.slug}"`,
      `status: "${post.status}"`,
      post.tags.length
        ? `tags: [${post.tags.map((t) => `"${t.replace(/"/g, '\\"')}"`).join(", ")}]`
        : "tags: []",
      `excerpt: "${(post.excerpt || "").replace(/"/g, '\\"')}"`,
      post.cover ? `cover: "${post.cover}"` : null,
      "---",
      "",
    ]
      .filter(Boolean)
      .join("\n");

    const blob = new Blob([front_matter + (post.content || "")], {
      type: "text/markdown",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${post.slug || "post"}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearAll = useCallback(() => {
    if (
      !confirm(
        "Clear the editor? This will remove the current draft from localStorage.",
      )
    )
      return;
    setPost({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      tags: [],
      cover: "",
      status: "draft",
    });
  }, [setPost]);

  const publishToggle = useCallback(() => {
    setPost((p) => ({
      ...p,
      status: p.status === "published" ? "draft" : "published",
    }));
  }, [setPost]);

  const toolbar = [
    {
      icon: <Bold size={16} />,
      tip: "Bold",
      fn: () => wrapSelection(textareaRef.current, "**", "**"),
    },
    {
      icon: <Italic size={16} />,
      tip: "Italic",
      fn: () => wrapSelection(textareaRef.current, "*", "*"),
    },
    {
      icon: <Underline size={16} />,
      tip: "Underline (HTML)",
      fn: () => wrapSelection(textareaRef.current, "<u>", "</u>"),
    },
    {
      icon: <LinkIcon size={16} />,
      tip: "Link",
      fn: () => wrapSelection(textareaRef.current, "[", "](https://)"),
    },
    {
      icon: <Heading1 size={16} />,
      tip: "H1",
      fn: () => wrapSelection(textareaRef.current, "\n# ", ""),
    },
    {
      icon: <Heading2 size={16} />,
      tip: "H2",
      fn: () => wrapSelection(textareaRef.current, "\n## ", ""),
    },
    {
      icon: <List size={16} />,
      tip: "Bullet list",
      fn: () => wrapSelection(textareaRef.current, "\n- ", ""),
    },
    {
      icon: <ListOrdered size={16} />,
      tip: "Numbered list",
      fn: () => wrapSelection(textareaRef.current, "\n1. ", ""),
    },
    {
      icon: <Quote size={16} />,
      tip: "Blockquote",
      fn: () => wrapSelection(textareaRef.current, "\n> ", ""),
    },
    {
      icon: <Code size={16} />,
      tip: "Code",
      fn: () => wrapSelection(textareaRef.current, "`", "`"),
    },
    {
      icon: <Minus size={16} />,
      tip: "Divider",
      fn: () => wrapSelection(textareaRef.current, "\n\n---\n\n", ""),
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <div className="mx-auto max-w-7xl px-4 pb-20">
        {/* Header */}
        <div className="sticky top-0 z-20 -mx-4 mb-6 border-b bg-white/80 backdrop-blur dark:bg-neutral-900/70">
          <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-sm opacity-70">
              <Rocket className="" size={18} />
              <span>React Blog Editor</span>
              <span className="mx-2">•</span>
              <span className="capitalize">{post.status}</span>
              <span className="mx-2">•</span>
              <span>{readingTime}</span>
              <span className="mx-2">•</span>
              <span>{wordCount} words</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setDark(!dark)}
                className="rounded-xl border px-3 py-2 text-sm hover:shadow-sm"
                title="Toggle theme"
              >
                {dark ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              <button
                onClick={publishToggle}
                className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm hover:shadow-sm"
                title="Toggle publish"
              >
                <Eye size={16} />
                {post.status === "published" ? "Unpublish" : "Publish"}
              </button>
              <button
                onClick={exportMarkdown}
                className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm hover:shadow-sm"
                title="Export Markdown"
              >
                <FileDown size={16} /> MD
              </button>
              <button
                onClick={exportJSON}
                className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm hover:shadow-sm"
                title="Export JSON"
              >
                <FileDown size={16} /> JSON
              </button>
              <button
                onClick={clearAll}
                className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm hover:shadow-sm"
                title="Clear draft"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Title & Meta */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="md:col-span-2 space-y-3">
            <label className="text-xs uppercase tracking-wider opacity-60">
              Title
            </label>
            <div className="flex items-center gap-2 rounded-2xl border bg-white p-3 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
              <Type size={18} className="opacity-70" />
              <input
                className="w-full bg-transparent text-lg outline-none"
                placeholder="Write an irresistible title…"
                value={post.title}
                onChange={(e) => setPost({ ...post, title: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs uppercase tracking-wider opacity-60">
              Slug
            </label>
            <div className="flex items-center gap-2 rounded-2xl border bg-white p-3 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
              <Hash size={18} className="opacity-70" />
              <input
                className="w-full bg-transparent text-base outline-none"
                placeholder="auto-from-title"
                value={post.slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  setPost({ ...post, slug: slugify(e.target.value) });
                }}
              />
            </div>
          </div>
        </div>

        {/* Cover & Excerpt */}
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="md:col-span-2 space-y-3">
            <label className="text-xs uppercase tracking-wider opacity-60">
              Excerpt
            </label>
            <textarea
              className="min-h-[80px] w-full rounded-2xl border bg-white p-3 shadow-sm outline-none focus:ring-2 focus:ring-neutral-200 dark:border-neutral-800 dark:bg-neutral-900 dark:focus:ring-neutral-800"
              placeholder="One or two punchy sentences to summarize the post…"
              value={post.excerpt}
              onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider opacity-60">
              Cover Image
            </label>
            {post.cover ? (
              <div className="relative rounded-2xl border bg-white p-2 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                <img
                  src={post.cover}
                  alt="Cover"
                  className="h-40 w-full rounded-xl object-cover"
                />
                <div className="mt-2 flex gap-2">
                  <button
                    className="flex-1 rounded-xl border px-3 py-2 text-sm"
                    onClick={() => coverInputRef.current?.click()}
                  >
                    Change
                  </button>
                  <button
                    className="flex-1 rounded-xl border px-3 py-2 text-sm"
                    onClick={() => setPost({ ...post, cover: "" })}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => coverInputRef.current?.click()}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed p-6 text-sm hover:shadow-sm dark:border-neutral-800"
              >
                <ImageIcon size={18} /> Add cover image
              </button>
            )}
            <input
              ref={coverInputRef}
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => handleUploadCover(e.target.files?.[0])}
            />
          </div>
        </div>

        {/* Tags */}
        <div className="mt-6">
          <label className="text-xs uppercase tracking-wider opacity-60">
            Tags
          </label>
          <div className="mt-2 flex flex-wrap items-center gap-2 rounded-2xl border bg-white p-3 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            <Tags size={18} className="opacity-70" />
            {post.tags.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs"
              >
                {t}
                <button
                  onClick={() => handleRemoveTag(t)}
                  className="opacity-60 hover:opacity-100"
                >
                  ×
                </button>
              </span>
            ))}
            <input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" ? (e.preventDefault(), handleAddTag()) : undefined
              }
              className="ml-auto flex-1 bg-transparent outline-none"
              placeholder="Add a tag and press Enter"
            />
          </div>
        </div>

        {/* Editor */}
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              {toolbar.map((t, i) => (
                <ToolbarButton key={i} title={t.tip} onClick={t.fn}>
                  {t.icon}
                </ToolbarButton>
              ))}
              <ToolbarButton
                title="Upload inline image"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload size={16} />
              </ToolbarButton>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleUploadInlineImage(e.target.files?.[0])}
              />
              <div className="ml-auto flex items-center gap-2">
                <span className="text-xs opacity-60">{readingTime}</span>
                <span className="text-xs opacity-60">• {wordCount} words</span>
              </div>
            </div>

            <textarea
              ref={textareaRef}
              className="min-h-[420px] w-full rounded-2xl border bg-white p-4 font-mono text-sm leading-6 shadow-sm outline-none focus:ring-2 focus:ring-neutral-200 dark:border-neutral-800 dark:bg-neutral-900 dark:focus:ring-neutral-800"
              placeholder={`Write in Markdown...\n\nExamples:\n# Heading\n**bold** and *italic*\n> quote\n\n- list item\n\n\n---\n\n\n`}
              value={post.content}
              onChange={(e) => setPost({ ...post, content: e.target.value })}
            />

          </div>

          {/* Preview */}
          <div className="overflow-hidden rounded-2xl border bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            <div className="border-b p-3 text-sm opacity-60 dark:border-neutral-800">
              Live Preview
            </div>
            <article className="prose prose-neutral max-w-none p-6 dark:prose-invert">
              {post.cover && (
                <img
                  src={post.cover}
                  alt="Cover"
                  className="mb-4 w-full rounded-xl"
                />
              )}
              <h1>{post.title || "Untitled"}</h1>
              {post.excerpt && <p className="opacity-70">{post.excerpt}</p>}
              <div dangerouslySetInnerHTML={{ __html: html }} />
            </article>
          </div>
        </div>

        {/* Footer actions */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs opacity-60">
            Auto saves to localStorage as you type.
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={exportMarkdown}
              className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm hover:shadow-sm"
            >
              <FileDown size={16} /> Export .md
            </button>
            <button
              onClick={exportJSON}
              className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm hover:shadow-sm"
            >
              <FileDown size={16} /> Export .json
            </button>
          </div>
        </div>
      </div>

      {/* Tailwind Typography (optional) */}
      <style>{`
        /* Ensure typography if Tailwind plugin isn't present */
        .prose h1 { font-size: 1.875rem; line-height: 2.25rem; margin-top: 1rem; margin-bottom: .75rem; font-weight: 800; }
        .prose h2 { font-size: 1.5rem; line-height: 2rem; margin-top: 1rem; margin-bottom: .5rem; font-weight: 700; }
        .prose p { margin: .75rem 0; }
        .prose img { border-radius: .75rem; }
        .dark .prose :where(a){ color: #a3e635; }
      `}</style>
    </div>
  );
}