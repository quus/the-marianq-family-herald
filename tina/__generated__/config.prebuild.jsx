// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";
var config_default = defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "static"
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "static"
    }
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "\uD3EC\uC2A4\uD2B8",
        path: "content/posts",
        format: "md",
        ui: {
          filename: {
            readonly: true,
            slugify: (values) => {
              const date = new Date(values?.date || /* @__PURE__ */ new Date());
              const year = date.getFullYear();
              const month = String(date.getMonth() + 1).padStart(2, "0");
              const day = String(date.getDate()).padStart(2, "0");
              const slug = values?.title?.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim("-") || "untitled";
              return `${year}-${month}-${day}-${slug}`;
            }
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "\uC81C\uBAA9",
            isTitle: true,
            required: true
          },
          {
            type: "datetime",
            name: "date",
            label: "\uC791\uC131\uC77C",
            required: true,
            ui: {
              timeFormat: "HH:mm"
            }
          },
          {
            type: "string",
            name: "description",
            label: "\uC124\uBA85",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "string",
            name: "author",
            label: "\uC791\uC131\uC790"
          },
          {
            type: "image",
            name: "image",
            label: "\uB300\uD45C \uC774\uBBF8\uC9C0"
          },
          {
            type: "string",
            name: "categories",
            label: "\uCE74\uD14C\uACE0\uB9AC",
            list: true,
            ui: {
              component: "tags"
            }
          },
          {
            type: "string",
            name: "tags",
            label: "\uD0DC\uADF8",
            list: true,
            ui: {
              component: "tags"
            }
          },
          {
            type: "boolean",
            name: "draft",
            label: "\uC784\uC2DC\uAE00",
            description: "\uCCB4\uD06C\uD558\uBA74 \uC0AC\uC774\uD2B8\uC5D0 \uD45C\uC2DC\uB418\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4"
          },
          {
            type: "rich-text",
            name: "body",
            label: "\uB0B4\uC6A9",
            isBody: true,
            templates: [
              {
                name: "youtube",
                label: "YouTube \uBE44\uB514\uC624",
                fields: [
                  {
                    name: "id",
                    label: "YouTube ID",
                    type: "string",
                    required: true
                  },
                  {
                    name: "title",
                    label: "\uC81C\uBAA9",
                    type: "string"
                  }
                ]
              },
              {
                name: "codeblock",
                label: "\uCF54\uB4DC \uBE14\uB85D",
                fields: [
                  {
                    name: "language",
                    label: "\uC5B8\uC5B4",
                    type: "string"
                  },
                  {
                    name: "code",
                    label: "\uCF54\uB4DC",
                    type: "string",
                    ui: {
                      component: "textarea"
                    }
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        name: "page",
        label: "\uD398\uC774\uC9C0",
        path: "content",
        format: "md",
        match: {
          include: "**/*",
          exclude: "posts/**/*"
        },
        ui: {
          filename: {
            readonly: true,
            slugify: (values) => {
              return values?.title?.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-").trim("-") || "untitled";
            }
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "\uC81C\uBAA9",
            isTitle: true,
            required: true
          },
          {
            type: "datetime",
            name: "date",
            label: "\uC791\uC131\uC77C"
          },
          {
            type: "string",
            name: "description",
            label: "\uC124\uBA85",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "string",
            name: "type",
            label: "\uD0C0\uC785",
            options: ["page", "about", "contact"]
          },
          {
            type: "rich-text",
            name: "body",
            label: "\uB0B4\uC6A9",
            isBody: true
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
