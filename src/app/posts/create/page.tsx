"use client";

import { Button, Form, Input, Progress } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "~/trpc/react";
import { UploadButton, UploadDropzone } from "~/utils/uploadthing";
import MDEditor from "@uiw/react-md-editor";
import PageWrapper from "~/app/_components/page-wrapper";
import { ImagePreview } from "~/components/images/preview-image";
import { ImagePlus, Plus } from "lucide-react";
import { LoadingSpinner } from "~/components/ui/loading";

export default function Page$CreatePost() {
    const router = useRouter();

    const createPost = api.post.create.useMutation({
        onSuccess: (data) => {
            router.push(`/posts/${data.slug}`);
            router.refresh();
        },
    });

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [images, setImages] = useState<string[]>([]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !content) return;
        createPost.mutate({ title, content, images: images });
    };
    const [loading, setLoading] = useState(false);
    return (
        <PageWrapper>
            <div className="h-full overflow-auto bg-white p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Post</h1>

                <div className="max-w-screen-2xl mx-auto h-full">
                    <Form layout="vertical">
                        {/* Title Input */}
                        <Form.Item
                            label="Title"
                            required
                            rules={[{ required: true, message: "Please input a title" }]}
                        >
                            <Input
                                placeholder="Enter post title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Item>

                        {/* Content Input */}
                        <Form.Item label="Content" required rules={[{ max: 5000, min: 10 }]}>
                            <Input.TextArea
                                placeholder="Write your post content here..."
                                autoSize={{
                                    minRows: 5,
                                    maxRows: 50,
                                }}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </Form.Item>

                        {/* Image Upload Section */}
                        <div className="flex mb-6">
                            <UploadDropzone
                                className=" w-24 h-24 aspect-square "
                                content={{
                                    button: ({ ready }) => <></>,
                                    allowedContent: () => <></>,
                                    label: () => <ImagePlus />,
                                    uploadIcon: () => <></>,
                                }}
                                disabled={loading}
                                onUploadBegin={() => setLoading(true)}
                                onClientUploadComplete={(res) => {
                                    setLoading(false);
                                    //@ts-ignore
                                    setImages([res[0]?.url, ...images]);
                                }}
                                config={{ mode: "auto" }}
                                endpoint={"imageUploader"}
                            />

                            {/* Image Preview Grid */}
                            <div className="overflow-x-auto h-full  flex w-full">
                                {images.map((img, index) => (
                                    <ImagePreview
                                        key={index}
                                        src={img}
                                        thumbnailClassName="w-14 h-14 object-cover rounded-lg"
                                    />
                                ))}
                            </div>
                        </div>
                        {/* Submit Button */}
                        <Form.Item>
                            <Button
                                type="primary"
                                onClick={handleSubmit}
                                loading={createPost.status == "pending"}
                                disabled={!title || !content}
                            >
                                Create Post
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </PageWrapper>
    );
}
