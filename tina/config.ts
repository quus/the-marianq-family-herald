import { defineConfig } from "tinacms";

const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "static",
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "static",
    },
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "포스트",
        path: "content/posts",
        format: "md",
        ui: {
          filename: {
            readonly: true,
            slugify: (values) => {
              const date = new Date(values?.date || new Date());
              const year = date.getFullYear();
              const month = String(date.getMonth() + 1).padStart(2, '0');
              const day = String(date.getDate()).padStart(2, '0');
              const slug = values?.title?.toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .trim('-') || 'untitled';
              return `${year}-${month}-${day}-${slug}`;
            },
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "제목",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "작성일",
            required: true,
            ui: {
              timeFormat: "HH:mm",
            },
          },
          {
            type: "string",
            name: "description",
            label: "설명",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "author",
            label: "작성자",
          },
          {
            type: "image",
            name: "image",
            label: "대표 이미지",
          },
          {
            type: "string",
            name: "categories",
            label: "카테고리",
            list: true,
            ui: {
              component: "tags",
            },
          },
          {
            type: "string",
            name: "tags",
            label: "태그",
            list: true,
            ui: {
              component: "tags",
            },
          },
          {
            type: "boolean",
            name: "draft",
            label: "임시글",
            description: "체크하면 사이트에 표시되지 않습니다",
          },
          {
            type: "rich-text",
            name: "body",
            label: "내용",
            isBody: true,
            templates: [
              {
                name: "youtube",
                label: "YouTube 비디오",
                fields: [
                  {
                    name: "id",
                    label: "YouTube ID",
                    type: "string",
                    required: true,
                  },
                  {
                    name: "title",
                    label: "제목",
                    type: "string",
                  },
                ],
              },
              {
                name: "codeblock",
                label: "코드 블록",
                fields: [
                  {
                    name: "language",
                    label: "언어",
                    type: "string",
                  },
                  {
                    name: "code",
                    label: "코드",
                    type: "string",
                    ui: {
                      component: "textarea",
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "page",
        label: "페이지",
        path: "content",
        format: "md",
        match: {
          include: "**/*",
          exclude: "posts/**/*",
        },
        ui: {
          filename: {
            readonly: true,
            slugify: (values) => {
              return values?.title?.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').trim('-') || 'untitled';
            },
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "제목",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "작성일",
          },
          {
            type: "string",
            name: "description",
            label: "설명",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "type",
            label: "타입",
            options: ["page", "about", "contact"],
          },
          {
            type: "rich-text",
            name: "body",
            label: "내용",
            isBody: true,
          },
        ],
      },
    ],
  },
});