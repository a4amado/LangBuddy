"use client";

import { Button, Form, Input, Modal } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PageWrapper from "~/app/_components/page-wrapper";
import { api } from "~/trpc/react";

export default function CreatePost() {
    const router = useRouter();
    const createPost = api.post.create.useMutation({
        onSuccess: (data) => {
            router.push(`/posts/${data.slug}`);
            router.refresh();
        },
    });

    const onFinish = (values: { title: string; content: string }) => {
        createPost.mutate(values);
    };

    const [open, setOpen] = useState(false)
    return (
        <>
            <div className="my-2">
                <Input.TextArea className="text-lg" autoSize={{minRows:2, maxRows:2}}  role="button" onClick={() => setOpen(!open)} placeholder="Ask Somethig!" />
            <Modal open={open}>            <div className="h-full overflow-auto bg-white p-6">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Post</h1>

                    <Form layout="vertical" onFinish={onFinish} className="space-y-6">
                        <Form.Item
                            label="Title"
                            name="title"
                            rules={[{ required: true, message: "Please input the title!" }]}
                        >
                            <Input
                                size="large"
                                placeholder="Enter post title"
                                className="rounded-lg"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Content"
                            name="content"
                            rules={[{ required: true, message: "Please input the content!" }]}
                        >
                            <Input.TextArea
                                size="large"
                                placeholder="Write your post content..."
                                className="rounded-lg"
                                rows={6}
                            />
                        </Form.Item>

                        <div className="flex justify-end space-x-4">
                            <Button
                                onClick={() => router.back()}
                                size="large"
                                className="rounded-lg"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="primary"
                                htmlType="submit"
                                size="large"
                                loading={createPost.status == "pending"}
                                className="bg-blue-600 rounded-lg"
                            >
                                Create Post
                            </Button>
                        </div>
                    </Form>
                </div>
            </div></Modal>
            </div>
        </ >
    );
}
