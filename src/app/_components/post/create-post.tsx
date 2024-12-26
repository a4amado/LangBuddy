"use client";

import { Button, Input, Modal } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "~/trpc/react";
import { UploadDropzone } from "~/utils/uploadthing";

export default function CreatePost() {
    return (
        <div className="my-2">
            <Input.TextArea
                className="text-lg"
                autoSize={{ minRows: 2, maxRows: 2 }}
                role="button"
                placeholder="Ask Something!"
            />
        </div>
    );
}
