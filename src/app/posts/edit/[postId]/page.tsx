"use client";

import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { useEffect } from "react";
import PageWrapper from "~/app/_components/page-wrapper";

export default function EditPost({ params }: { params: { postId: string } }) {
    const router = useRouter();
    const [form] = Form.useForm();

    const { data: post, isLoading } = api.post.view.useQuery({ postId: params.postId });

    const editPost = api.post.edit.useMutation({
        onSuccess: () => {
            router.push("/home");
            router.refresh();
        },
    });

    useEffect(() => {
        if (post) {
            form.setFieldsValue({
                title: post.title,
                content: post.content,
            });
        }
    }, [post, form]);

    const onFinish = (values: { title: string; content: string }) => {
        editPost.mutate({
            postId: params.postId,
            ...values,
        });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white p-6 flex items-center justify-center">
                <div>Loading...</div>
            </div>
        );
    }

    return (
        <PageWrapper>
            <div className="min-h-full overflow-y-auto bg-white p-6">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Post</h1>

                    <Form form={form} layout="vertical" onFinish={onFinish} className="space-y-6">
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
                                loading={editPost.status == "pending"}
                                className="bg-blue-600 rounded-lg"
                            >
                                Save Changes
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </PageWrapper>
    );
}
