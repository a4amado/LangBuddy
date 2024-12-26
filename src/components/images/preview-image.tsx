import { Modal } from "antd";
import { useState } from "react";
import {} from "@uploadthing/react";

interface ImagePreviewProps {
    src: string;
    thumbnailClassName?: string; // Optional className for thumbnail
}

export const ImagePreview = ({ src, thumbnailClassName }: ImagePreviewProps) => {
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    return (
        <>
            {/* Thumbnail */}
            <img
                src={src}
                onClick={() => setIsPreviewOpen(true)}
                alt="Thumbnail"
                style={{ cursor: "pointer" }}
                className="border border-spacing-1 bg-slate-500 w-28 h-28 object-cover"
                width={60}
                height={60}
            />

            {/* Preview Modal */}
            <Modal
                open={isPreviewOpen}
                onCancel={() => setIsPreviewOpen(false)}
                footer={null}
                closable={false}
                centered
                width="auto"
                bodyStyle={{ padding: 0 }}
                maskStyle={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
            >
                <img
                    src={src}
                    style={{
                        maxWidth: "90vw",
                        maxHeight: "90vh",
                        objectFit: "contain",
                    }}
                    alt="Preview"
                />
            </Modal>
        </>
    );
};
